// ═══════════════════════════════════════════════
//  SIMULATED DATABASE (LocalStorage with Structure)
// ═══════════════════════════════════════════════

// This simulates a real database with proper structure
// In production, you would replace this with Firebase/Supabase/MongoDB

const DB = {
  // Initialize database structure
  init() {
    if (!localStorage.getItem('tq_db_version')) {
      localStorage.setItem('tq_db_version', '1.0');
      localStorage.setItem('tq_users', JSON.stringify([]));
      localStorage.setItem('tq_leaderboard', JSON.stringify([]));
      localStorage.setItem('tq_sessions', JSON.stringify([]));
    }
  },

  // Users table operations
  users: {
    getAll() {
      try {
        return JSON.parse(localStorage.getItem('tq_users')) || [];
      } catch (e) {
        console.error('Error reading users:', e);
        return [];
      }
    },
    
    findByEmail(email) {
      const users = this.getAll();
      return users.find(u => u.email.toLowerCase() === email.toLowerCase());
    },
    
    create(userData) {
      const users = this.getAll();
      const newUser = {
        id: 'user_' + Date.now() + '_' + Math.random().toString(36).substr(1, 9),
        name: userData.name,
        strand: userData.strand,
        email: userData.email.toLowerCase(),
        createdAt: new Date().toISOString(),
        gamesPlayed: 0,
        totalScore: 0,
        highScore: 0
      };
      users.push(newUser);
      localStorage.setItem('tq_users', JSON.stringify(users));
      return newUser;
    },
    
    update(email, updates) {
      const users = this.getAll();
      const index = users.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
      if (index !== -1) {
        users[index] = { ...users[index], ...updates };
        localStorage.setItem('tq_users', JSON.stringify(users));
        return users[index];
      }
      return null;
    }
  },

  // Leaderboard table operations
  leaderboard: {
    getAll() {
      try {
        return JSON.parse(localStorage.getItem('tq_leaderboard')) || [];
      } catch (e) {
        console.error('Error reading leaderboard:', e);
        return [];
      }
    },
    
    getTop(limit = 10) {
      const scores = this.getAll();
      scores.sort((a, b) => b.score - a.score);
      return scores.slice(0, limit);
    },
    
    add(scoreData) {
      const scores = this.getAll();
      const newScore = {
        id: 'score_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
        userId: scoreData.userId,
        name: scoreData.name,
        strand: scoreData.strand,
        email: scoreData.email,
        score: scoreData.score,
        lines: scoreData.lines,
        level: scoreData.level,
        difficulty: scoreData.difficulty,
        timestamp: new Date().toISOString(),
        date: new Date().toLocaleDateString()
      };
      scores.push(newScore);
      
      // Keep only top 100 scores
      scores.sort((a, b) => b.score - a.score);
      if (scores.length > 100) {
        scores.length = 100;
      }
      
      localStorage.setItem('tq_leaderboard', JSON.stringify(scores));
      return newScore;
    }
  },

  // Session management
  session: {
    set(user) {
      localStorage.setItem('tq_current_session', JSON.stringify({
        email: user.email,
        loginTime: new Date().toISOString()
      }));
    },
    
    get() {
      try {
        const session = localStorage.getItem('tq_current_session');
        return session ? JSON.parse(session) : null;
      } catch (e) {
        return null;
      }
    },
    
    clear() {
      localStorage.removeItem('tq_current_session');
    }
  }
};

// Initialize database on load
DB.init();