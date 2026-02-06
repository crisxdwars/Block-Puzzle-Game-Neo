// ═══════════════════════════════════════════════
//  GAME SCRIPT
// ═══════════════════════════════════════════════

let currentUser = null;

// ═══════════════════════════════════════════════
//  QUIZ DATA
// ═══════════════════════════════════════════════
const QUESTIONS = {
  easy: [
    {q:"What is 2 + 2?",opts:["3","4","5","6"],ans:1},
    {q:"What color do you get mixing red and blue?",opts:["Green","Orange","Purple","Yellow"],ans:2},
    {q:"How many days in a week?",opts:["5","6","7","8"],ans:2},
    {q:"What is the largest planet in our solar system?",opts:["Saturn","Neptune","Earth","Jupiter"],ans:3},
    {q:"What is the chemical symbol for water?",opts:["WO","H2O","HO2","W2O"],ans:1},
    {q:"How many legs does a spider have?",opts:["6","8","10","4"],ans:1},
    {q:"Which animal is known as the 'King of the Jungle'?",opts:["Tiger","Bear","Lion","Elephant"],ans:2},
    {q:"What is the smallest continent?",opts:["Africa","Europe","Australia","Asia"],ans:2},
    {q:"How many months have 30 days?",opts:["3","4","5","6"],ans:3},
    {q:"What is the boiling point of water in °C?",opts:["50","75","90","100"],ans:3},
  ],
  medium: [
    {q:"What is the square root of 144?",opts:["10","11","12","13"],ans:2},
    {q:"Which element has the atomic number 1?",opts:["Helium","Oxygen","Hydrogen","Carbon"],ans:2},
    {q:"What is the longest river in the world?",opts:["Amazon","Nile","Yangtze","Congo"],ans:1},
    {q:"In what year did World War II end?",opts:["1943","1944","1945","1946"],ans:2},
    {q:"What is the powerhouse of the cell?",opts:["Nucleus","Ribosome","Mitochondria","Golgi body"],ans:2},
    {q:"Which gas makes up most of Earth's atmosphere?",opts:["Oxygen","Carbon Dioxide","Nitrogen","Hydrogen"],ans:2},
    {q:"What is the speed of light (approx.) in km/s?",opts:["150,000","200,000","300,000","400,000"],ans:2},
    {q:"Who painted the Mona Lisa?",opts:["Michelangelo","Da Vinci","Raphael","Donatello"],ans:1},
    {q:"What is the chemical symbol for gold?",opts:["Go","Gd","Au","Ag"],ans:2},
    {q:"How many bones does the adult human body have?",opts:["196","206","216","226"],ans:1},
  ],
  hard: [
    {q:"What is the derivative of ln(x)?",opts:["x","1/x","ln(x)","0"],ans:1},
    {q:"Which subatomic particle has no charge?",opts:["Proton","Electron","Quark","Neutron"],ans:3},
    {q:"What is the half-life of Carbon-14 (approx)?",opts:["1,500 yrs","3,500 yrs","5,730 yrs","8,000 yrs"],ans:2},
    {q:"In what language was the original Bible written?",opts:["Latin","Greek","Aramaic","Hebrew & Aramaic"],ans:3},
    {q:"What is the molar mass of CO₂ (g/mol)?",opts:["28","32","40","44"],ans:3},
    {q:"Which treaty ended WWI?",opts:["Treaty of Paris","Treaty of Versailles","Treaty of Vienna","Treaty of Ghent"],ans:1},
    {q:"What is Avogadro's number (approx)?",opts:["6.02×10²¹","6.02×10²²","6.02×10²³","6.02×10²⁴"],ans:2},
    {q:"Which organ produces insulin?",opts:["Liver","Kidney","Pancreas","Stomach"],ans:2},
    {q:"What is the longest bone in the human body?",opts:["Tibia","Humerus","Fibula","Femur"],ans:3},
    {q:"In quantum mechanics, what does 'H' represent in Schrödinger's equation?",opts:["Heat","Hamiltonian","Humidity","Harmonic"],ans:1},
  ]
};

// ═══════════════════════════════════════════════
//  BLOCK PUZZLE ENGINE
// ═══════════════════════════════════════════════
const COLS = 10, ROWS = 20;
const SHAPES = [
  [[1,1,1,1]],
  [[1,0,0],[1,1,1]],
  [[0,0,1],[1,1,1]],
  [[1,1],[1,1]],
  [[0,1,1],[1,1,0]],
  [[1,0],[1,1],[0,1]],
  [[0,1,0],[1,1,1]]
];
const COLORS = [
  'var(--neon-cyan)',
  'var(--neon-blue)',
  'var(--neon-orange)',
  'var(--neon-yellow)',
  'var(--neon-green)',
  'var(--neon-purple)',
  'var(--neon-pink)'
];

let board, current, next, score, lines, level, gameLoop, gameOver, quizActive, gameStarted = false;
let questionsAnswered = 0;
let timerInterval = null;
const CIRCUMFERENCE = 2 * Math.PI * 18;

function initBoard() {
  board = Array.from({length: ROWS}, () => Array(COLS).fill(0));
}

function randomPiece() {
  const i = Math.floor(Math.random() * SHAPES.length);
  return {
    shape: SHAPES[i],
    color: COLORS[i],
    x: Math.floor(COLS / 2) - Math.floor(SHAPES[i][0].length / 2),
    y: 0
  };
}

function rotate(shape) {
  const R = shape.length, C = shape[0].length;
  const rot = Array.from({length: C}, () => Array(R).fill(0));
  for (let r = 0; r < R; r++)
    for (let c = 0; c < C; c++)
      rot[c][R - 1 - r] = shape[r][c];
  return rot;
}

function collides(shape, ox, oy) {
  for (let r = 0; r < shape.length; r++)
    for (let c = 0; c < shape[r].length; c++)
      if (shape[r][c]) {
        const nx = ox + c, ny = oy + r;
        if (nx < 0 || nx >= COLS || ny >= ROWS) return true;
        if (ny >= 0 && board[ny][nx]) return true;
      }
  return false;
}

function lockPiece() {
  const s = current.shape, ox = current.x, oy = current.y;
  for (let r = 0; r < s.length; r++)
    for (let c = 0; c < s[r].length; c++)
      if (s[r][c]) {
        const ny = oy + r;
        if (ny < 0) {
          triggerGameOver("You filled the board!");
          return;
        }
        board[ny][ox + c] = current.color;
      }
  clearLines();
  current = next;
  next = randomPiece();
  renderNext();
  if (collides(current.shape, current.x, current.y))
    triggerGameOver("No more space!");
}

function clearLines() {
  let cleared = 0;
  for (let r = ROWS - 1; r >= 0; r--) {
    if (board[r].every(c => c !== 0)) {
      board.splice(r, 1);
      board.unshift(Array(COLS).fill(0));
      cleared++;
      r++;
    }
  }
  if (cleared > 0) {
    document.getElementById('board-wrap').classList.add('flash');
    setTimeout(() => document.getElementById('board-wrap').classList.remove('flash'), 300);
    const pts = [0, 100, 300, 500, 800][cleared] * level;
    score += pts;
    lines += cleared;
    questionsAnswered++;
    showScorePop("+" + pts);
    updateUI();
    pauseGame();
    showQuiz();
  }
}

function showScorePop(txt) {
  const p = document.createElement('div');
  p.className = 'score-pop';
  p.textContent = txt;
  document.getElementById('board-wrap').appendChild(p);
  setTimeout(() => p.remove(), 1000);
}

function getDifficultyLabel() {
  if (questionsAnswered < 3) return 'easy';
  if (questionsAnswered < 6) return 'medium';
  return 'hard';
}

function getTimerDuration() {
  const d = getDifficultyLabel();
  return d === 'easy' ? 10 : d === 'medium' ? 15 : 25;
}

function updateDiffBadge() {
  const d = getDifficultyLabel(), b = document.getElementById('diff-badge');
  b.textContent = d.toUpperCase();
  b.className = 'diff-badge' + (d === 'medium' ? ' medium' : d === 'hard' ? ' hard' : '');
}

function showQuiz() {
  quizActive = true;
  const diff = getDifficultyLabel(), pool = QUESTIONS[diff], q = pool[Math.floor(Math.random() * pool.length)];
  const badge = document.getElementById('quiz-diff-badge');
  badge.textContent = diff.toUpperCase();
  badge.className = 'diff-badge quiz-diff-badge' + (diff === 'medium' ? ' medium' : diff === 'hard' ? ' hard' : '');
  document.getElementById('quiz-question').textContent = q.q;
  const container = document.getElementById('quiz-options');
  container.innerHTML = '';
  q.opts.forEach((opt, i) => {
    const btn = document.createElement('div');
    btn.className = 'quiz-option';
    btn.textContent = opt;
    btn.onclick = () => handleAnswer(i, q.ans, btn);
    container.appendChild(btn);
  });
  document.getElementById('quiz-result').className = 'quiz-result';
  document.getElementById('quiz-result').textContent = '';
  document.getElementById('quiz-overlay').classList.remove('hidden');
  startQuizTimer(getTimerDuration());
}

let quizTimerSec = 0;

function startQuizTimer(dur) {
  quizTimerSec = dur;
  updateTimerRing(dur, dur);
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    quizTimerSec--;
    updateTimerRing(quizTimerSec, dur);
    if (quizTimerSec <= 0) {
      clearInterval(timerInterval);
      timerInterval = null;
      disableOptions();
      document.getElementById('quiz-result').textContent = "TIME'S UP!";
      document.getElementById('quiz-result').className = 'quiz-result show wrong-result';
      setTimeout(() => {
        closeQuiz();
        triggerGameOver("You ran out of time!");
      }, 900);
    }
  }, 1000);
}

function updateTimerRing(rem, total) {
  const pct = rem / total, offset = CIRCUMFERENCE * (1 - pct);
  const fg = document.getElementById('timer-ring-fg');
  fg.style.strokeDashoffset = offset;
  document.getElementById('timer-ring-text').textContent = rem;
  fg.className = 'timer-ring-fg';
  if (pct <= .25) fg.classList.add('danger');
  else if (pct <= .5) fg.classList.add('warning');
}

function handleAnswer(chosen, correct, btn) {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  disableOptions();
  document.querySelectorAll('.quiz-option')[correct].classList.add('correct');
  const result = document.getElementById('quiz-result');
  if (chosen === correct) {
    btn.classList.add('correct');
    result.textContent = '✓ CORRECT!';
    result.className = 'quiz-result show';
    score += 50;
    updateUI();
    setTimeout(() => {
      closeQuiz();
      resumeGame();
    }, 800);
  } else {
    btn.classList.add('wrong');
    result.textContent = '✗ WRONG!';
    result.className = 'quiz-result show wrong-result';
    setTimeout(() => {
      closeQuiz();
      triggerGameOver("You answered incorrectly!");
    }, 900);
  }
}

function disableOptions() {
  document.querySelectorAll('.quiz-option').forEach(o => o.classList.add('disabled'));
}

function closeQuiz() {
  document.getElementById('quiz-overlay').classList.add('hidden');
  quizActive = false;
}

window.startGame = function() {
  initBoard();
  score = 0;
  lines = 0;
  level = 1;
  questionsAnswered = 0;
  gameOver = false;
  quizActive = false;
  gameStarted = true;
  current = randomPiece();
  next = randomPiece();
  renderNext();
  updateUI();
  updateDiffBadge();
  document.getElementById('start-overlay').classList.add('hidden');
  document.getElementById('gameover-overlay').classList.add('hidden');
  closeQuiz();
  resumeGame();
};

function pauseGame() {
  if (gameLoop) {
    clearInterval(gameLoop);
    gameLoop = null;
  }
}

function resumeGame() {
  pauseGame();
  const speed = Math.max(50, 500 - (level - 1) * 40);
  gameLoop = setInterval(() => {
    if (quizActive) return;
    moveDown();
  }, speed);
}

async function triggerGameOver(reason) {
  gameOver = true;
  gameStarted = false;
  pauseGame();
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  closeQuiz();
  
  // Save score to database
  await saveScoreToDatabase();
  
  document.getElementById('go-reason').textContent = reason;
  document.getElementById('go-score').textContent = score;
  document.getElementById('go-lines').textContent = lines;
  document.getElementById('gameover-overlay').classList.remove('hidden');
}

function moveDown() {
  if (gameOver || quizActive) return;
  if (!collides(current.shape, current.x, current.y + 1))
    current.y++;
  else
    lockPiece();
  render();
}

document.addEventListener('keydown', e => {
  if (gameOver || quizActive || !gameStarted) return;
  if (e.key === 'ArrowLeft') {
    if (!collides(current.shape, current.x - 1, current.y)) current.x--;
  } else if (e.key === 'ArrowRight') {
    if (!collides(current.shape, current.x + 1, current.y)) current.x++;
  } else if (e.key === 'ArrowUp') {
    const rot = rotate(current.shape);
    if (!collides(rot, current.x, current.y)) current.shape = rot;
    else if (!collides(rot, current.x - 1, current.y)) {
      current.shape = rot;
      current.x--;
    } else if (!collides(rot, current.x + 1, current.y)) {
      current.shape = rot;
      current.x++;
    }
  } else if (e.key === 'ArrowDown') {
    if (!collides(current.shape, current.x, current.y + 1))
      current.y++;
    else
      lockPiece();
  } else if (e.key === ' ') {
    e.preventDefault();
    hardDrop();
    return;
  } else return;
  e.preventDefault();
  render();
});

function hardDrop() {
  let d = 0;
  while (!collides(current.shape, current.x, current.y + 1 + d)) d++;
  score += d * 2;
  current.y += d;
  lockPiece();
  render();
}

function render() {
  const boardEl = document.getElementById('game-board');
  const snap = board.map(r => [...r]);
  let ghostY = current.y;
  while (!collides(current.shape, current.x, ghostY + 1)) ghostY++;
  for (let r = 0; r < current.shape.length; r++)
    for (let c = 0; c < current.shape[r].length; c++)
      if (current.shape[r][c]) {
        const ny = ghostY + r, nx = current.x + c;
        if (ny >= 0 && ny < ROWS && nx >= 0 && nx < COLS && !snap[ny][nx])
          snap[ny][nx] = 'ghost';
      }
  for (let r = 0; r < current.shape.length; r++)
    for (let c = 0; c < current.shape[r].length; c++)
      if (current.shape[r][c]) {
        const ny = current.y + r, nx = current.x + c;
        if (ny >= 0 && ny < ROWS) snap[ny][nx] = current.color;
      }
  boardEl.innerHTML = '';
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      const v = snap[r][c];
      if (v && v !== 'ghost') {
        cell.classList.add('filled');
        cell.style.background = v;
        cell.style.boxShadow = `0 0 6px ${v}66,inset 0 1px 0 rgba(255,255,255,.15)`;
      } else if (v === 'ghost') {
        cell.style.background = 'rgba(0,240,255,.08)';
        cell.style.border = '1px solid rgba(0,240,255,.2)';
      }
      boardEl.appendChild(cell);
    }
}

function renderNext() {
  const el = document.getElementById('next-board');
  el.innerHTML = '';
  const s = next.shape;
  for (let r = 0; r < 4; r++)
    for (let c = 0; c < 4; c++) {
      const cell = document.createElement('div');
      cell.className = 'next-cell';
      if (r < s.length && c < s[0].length && s[r][c]) {
        cell.classList.add('filled');
        cell.style.background = next.color;
        cell.style.boxShadow = `0 0 5px ${next.color}55`;
      }
      el.appendChild(cell);
    }
}

function updateUI() {
  document.getElementById('score').textContent = score;
  document.getElementById('lines').textContent = lines;
  level = Math.floor(lines / 10) + 1;
  document.getElementById('level').textContent = level;
  updateDiffBadge();
}

// ═══════════════════════════════════════════════
//  SAVE SCORE TO DATABASE
// ═══════════════════════════════════════════════
async function saveScoreToDatabase() {
  if (!currentUser) return;
  
  const scoreData = {
    user_id: currentUser.id,
    name: currentUser.name,
    strand: currentUser.strand,
    score: score,
    lines: lines,
    level: level,
    difficulty: getDifficultyLabel()
  };
  
  try {
    // Save to leaderboard (keeps only highest score per user)
    const result = await DB.leaderboard.add(scoreData);
    console.log('Score saved:', result);
    
    // Update current user stats from response
    if (currentUser.high_score < score) {
      currentUser.high_score = score;
    }
    currentUser.games_played = (currentUser.games_played || 0) + 1;
    currentUser.total_score = (currentUser.total_score || 0) + score;
  } catch (error) {
    console.error('Failed to save score:', error);
  }
}

// ═══════════════════════════════════════════════
//  NAVIGATION
// ═══════════════════════════════════════════════
window.goToHome = function() {
  if (confirm('Are you sure you want to exit the game?')) {
    pauseGame();
    window.location.href = 'index.html';
  }
};

// ═══════════════════════════════════════════════
//  INITIALIZE ON PAGE LOAD
// ═══════════════════════════════════════════════
window.addEventListener('DOMContentLoaded', async () => {
  // Check authentication
  const session = DB.session.get();
  if (!session) {
    window.location.href = 'Login.html';
    return;
  }
  
  const user = await DB.users.getCurrentUser();
  if (!user) {
    DB.session.clear();
    window.location.href = 'Login.html';
    return;
  }
  
  currentUser = user;
  
  // Hide loading overlay
  document.getElementById('loading-overlay').classList.add('hidden');
  
  // Initialize game
  initBoard();
  current = randomPiece();
  next = randomPiece();
  document.getElementById('timer-ring-fg').style.strokeDasharray = CIRCUMFERENCE;
  document.getElementById('timer-ring-fg').style.strokeDashoffset = 0;
  
  // Show start overlay
  document.getElementById('start-overlay').classList.remove('hidden');
});