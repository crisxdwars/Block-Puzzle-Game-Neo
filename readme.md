# BLOCK PUZZLE GAME
## File Structure

```
Block Puzzle Game/
├── Login.html              # Login/Signup page
├── Login-style.css         # Login page styles
├── Login-script.js         # Login page JavaScript
├── Home-index.html         # Home page (after login)
├── Home-style.css          # Home page styles
├── Home-script.js          # Home page JavaScript
├── Game-index.html         # Game page
├── Game-style.css          # Game page styles
├── Game-script.js          # Game logic and mechanics
├── Database.js             # Database simulation (localStorage)
└── README.md               # This file
```

## Database Structure (database.js)

The database is simulated using localStorage with the following structure:

### Users Table
```javascript
{
  id: string,           // Unique user ID
  name: string,         // Full name
  strand: string,       // Strand/Section
  email: string,        // Gmail address
  createdAt: string,    // ISO timestamp
  gamesPlayed: number,  // Total games played
  totalScore: number,   // Sum of all scores
  highScore: number     // Best score
}
```

### Leaderboard Table
```javascript
{
  id: string,          // Unique score ID
  userId: string,      // Reference to user
  name: string,        // Player name
  strand: string,      // Player's strand
  email: string,       // Player's email
  score: number,       // Final score
  lines: number,       // Lines cleared
  level: number,       // Level reached
  difficulty: string,  // Last difficulty (easy/medium/hard)
  timestamp: string,   // ISO timestamp
  date: string         // Local date string
}
```

### Session Management
```javascript
{
  email: string,       // Current user's email
  loginTime: string    // Login timestamp
}
```

## Database Operations

### Users
- `DB.users.getAll()` - Get all users
- `DB.users.findByEmail(email)` - Find user by email
- `DB.users.create(userData)` - Create new user
- `DB.users.update(email, updates)` - Update user data

### Leaderboard
- `DB.leaderboard.getAll()` - Get all scores
- `DB.leaderboard.getTop(limit)` - Get top N scores
- `DB.leaderboard.add(scoreData)` - Add new score

### Session
- `DB.session.set(user)` - Set current session
- `DB.session.get()` - Get current session
- `DB.session.clear()` - Clear session (logout)

## How to Use

1. **Setup**: Place all files in the same directory
2. **Start**: Open `Login.html` in a web browser
3. **Create Account**: Use the signup tab with a Gmail address
4. **Play**: Navigate through the menu to start playing

## Converting to Real Database

To convert from localStorage to a real database (Firebase, Supabase, MongoDB):

1. Replace `Database.js` with your database SDK
2. Implement the same API structure (DB.users, DB.leaderboard, DB.session)
3. Replace localStorage calls with actual database queries
4. Add proper error handling and validation
5. Implement authentication (Firebase Auth, Supabase Auth, etc.)

### Example Firebase Structure

```javascript
// Firebase implementation example
const DB = {
  users: {
    async create(userData) {
      const docRef = await addDoc(collection(db, 'users'), userData);
      return { id: docRef.id, ...userData };
    },
    async findByEmail(email) {
      const q = query(collection(db, 'users'), where('email', '==', email));
      const snapshot = await getDocs(q);
      return snapshot.docs[0]?.data();
    }
  }
  // ... etc
}
```

## Features

### Authentication
- Email-based login/signup
- Gmail validation
- Session persistence
- Auto-login on return visit

### Game Mechanics
- Classic gameplay
- Progressive difficulty quiz system
- Timer-based questions
- Score tracking and leaderboard
- Ghost piece preview
- Hard drop scoring

### Quiz System
- Three difficulty levels (Easy, Medium, Hard)
- Progressive difficulty based on correct answers
- Time limits per difficulty
- Immediate feedback
- Game over on wrong answer or timeout

## Styling

All CSS uses CSS custom properties (variables) for easy theming:

```css
:root {
  --bg-deep: #0a0a1a;
  --neon-cyan: #00f0ff;
  --neon-pink: #ff2d95;
  /* ... etc */
}
```

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires localStorage support
- Requires ES6+ JavaScript support
- Responsive design for mobile and desktop

## Future Enhancements

1. Add email verification
2. Implement password authentication
3. Add social login (Google OAuth)
4. Real-time leaderboard updates
5. User profiles and statistics
6. Multiplayer mode
7. Power-ups and special blocks
8. Achievement system
9. Custom quiz categories
10. Mobile touch controls