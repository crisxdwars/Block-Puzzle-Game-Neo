<?php

require_once 'config.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];
$db = getDBConnection();

/**
 * Get all users (admin only)
 */
if ($method === 'GET') {
    $action = $_GET['action'] ?? '';
    
    if ($action === 'findByEmail') {
        $email = $_GET['email'] ?? '';
        if (empty($email)) {
            jsonResponse(['error' => 'Email is required'], 400);
        }
        
        $stmt = $db->prepare('SELECT id, name, strand, email, created_at, games_played, total_score, high_score FROM users WHERE LOWER(email) = LOWER(?)');
        $stmt->execute([$email]);
        $user = $stmt->fetch();
        
        if ($user) {
            jsonResponse($user);
        } else {
            jsonResponse(['error' => 'User not found'], 404);
        }
    } elseif ($action === 'getAll') {
        $stmt = $db->query('SELECT id, name, strand, email, created_at, games_played, total_score, high_score FROM users ORDER BY created_at DESC');
        jsonResponse($stmt->fetchAll());
    } elseif ($action === 'current') {
        // Get current user from session/token
        $sessionToken = $_GET['session_token'] ?? '';
        if (empty($sessionToken)) {
            jsonResponse(['error' => 'Session token required'], 401);
        }
        
        $stmt = $db->prepare('
            SELECT u.id, u.name, u.strand, u.email, u.created_at, u.games_played, u.total_score, u.high_score 
            FROM users u
            INNER JOIN sessions s ON u.id = s.user_id
            WHERE s.session_token = ? AND s.expires_at > NOW()
        ');
        $stmt->execute([$sessionToken]);
        $user = $stmt->fetch();
        
        if ($user) {
            jsonResponse($user);
        } else {
            jsonResponse(['error' => 'Invalid or expired session'], 401);
        }
    } else {
        jsonResponse(['error' => 'Invalid action. Use: findByEmail, getAll, or current'], 400);
    }
}

/**
 * Create new user (signup)
 */
if ($method === 'POST') {
    $action = $_GET['action'] ?? '';
    
    if ($action === 'create') {
        $data = getJSONInput();
        
        // Validate required fields
        $required = ['name', 'strand', 'email'];
        foreach ($required as $field) {
            if (empty($data[$field])) {
                jsonResponse(['error' => "Missing required field: $field"], 400);
            }
        }
        
        // Validate email format
        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            jsonResponse(['error' => 'Invalid email format'], 400);
        }
        
        // Check if email already exists
        $stmt = $db->prepare('SELECT id FROM users WHERE LOWER(email) = LOWER(?)');
        $stmt->execute([$data['email']]);
        if ($stmt->fetch()) {
            jsonResponse(['error' => 'Email already registered'], 409);
        }
        
        // Insert new user
        $stmt = $db->prepare('
            INSERT INTO users (name, strand, email, created_at, games_played, total_score, high_score)
            VALUES (?, ?, ?, NOW(), 0, 0, 0)
        ');
        $stmt->execute([$data['name'], $data['strand'], $data['email']]);
        $userId = $db->lastInsertId();
        
        // Generate session token
        $sessionToken = bin2hex(random_bytes(32));
        $stmt = $db->prepare('
            INSERT INTO sessions (user_id, session_token, created_at, expires_at)
            VALUES (?, ?, NOW(), DATE_ADD(NOW(), INTERVAL 7 DAY))
        ');
        $stmt->execute([$userId, $sessionToken]);
        
        // Return user data with session token
        $stmt = $db->prepare('SELECT id, name, strand, email, created_at, games_played, total_score, high_score FROM users WHERE id = ?');
        $stmt->execute([$userId]);
        $user = $stmt->fetch();
        $user['session_token'] = $sessionToken;
        
        jsonResponse(['user' => $user, 'message' => 'User created successfully']);
    } elseif ($action === 'login') {
        $data = getJSONInput();
        $email = $data['email'] ?? '';
        
        if (empty($email)) {
            jsonResponse(['error' => 'Email is required'], 400);
        }
        
        $stmt = $db->prepare('SELECT id, name, strand, email, created_at, games_played, total_score, high_score FROM users WHERE LOWER(email) = LOWER(?)');
        $stmt->execute([$email]);
        $user = $stmt->fetch();
        
        if (!$user) {
            jsonResponse(['error' => 'Account not found. Please sign up first.'], 404);
        }
        
        // Generate session token
        $sessionToken = bin2hex(random_bytes(32));
        $stmt = $db->prepare('
            INSERT INTO sessions (user_id, session_token, created_at, expires_at)
            VALUES (?, ?, NOW(), DATE_ADD(NOW(), INTERVAL 7 DAY))
        ');
        $stmt->execute([$user['id'], $sessionToken]);
        
        $user['session_token'] = $sessionToken;
        jsonResponse(['user' => $user, 'message' => 'Login successful']);
    } else {
        jsonResponse(['error' => 'Invalid action. Use: create or login'], 400);
    }
}

/**
 * Update user data
 */
if ($method === 'PUT') {
    $data = getJSONInput();
    $email = $data['email'] ?? '';
    $sessionToken = $data['session_token'] ?? '';
    
    if (empty($email) || empty($sessionToken)) {
        jsonResponse(['error' => 'Email and session token required'], 400);
    }
    
    // Verify session
    $stmt = $db->prepare('
        SELECT user_id FROM sessions 
        WHERE session_token = ? AND expires_at > NOW()
    ');
    $stmt->execute([$sessionToken]);
    if (!$stmt->fetch()) {
        jsonResponse(['error' => 'Invalid or expired session'], 401);
    }
    
    // Update user
    $allowedFields = ['name', 'strand', 'games_played', 'total_score', 'high_score'];
    $updates = [];
    $values = [];
    
    foreach ($data as $key => $value) {
        if (in_array($key, $allowedFields)) {
            $updates[] = "$key = ?";
            $values[] = $value;
        }
    }
    
    if (empty($updates)) {
        jsonResponse(['error' => 'No valid fields to update'], 400);
    }
    
    $values[] = $email;
    $sql = 'UPDATE users SET ' . implode(', ', $updates) . ' WHERE LOWER(email) = LOWER(?)';
    $stmt = $db->prepare($sql);
    $stmt->execute($values);
    
    // Return updated user
    $stmt = $db->prepare('SELECT id, name, strand, email, created_at, games_played, total_score, high_score FROM users WHERE LOWER(email) = LOWER(?)');
    $stmt->execute([$email]);
    $user = $stmt->fetch();
    
    jsonResponse(['user' => $user, 'message' => 'User updated successfully']);
}

/**
 * Logout
 */
if ($method === 'DELETE') {
    $sessionToken = $_GET['session_token'] ?? '';
    
    if (empty($sessionToken)) {
        jsonResponse(['error' => 'Session token required'], 400);
    }
    
    $stmt = $db->prepare('DELETE FROM sessions WHERE session_token = ?');
    $stmt->execute([$sessionToken]);
    
    jsonResponse(['message' => 'Logged out successfully']);
}
