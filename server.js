import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Mock NBA API endpoints
app.get('/api/games', (req, res) => {
  const mockGames = [
    { 
      homeTeam: 'Lakers', 
      awayTeam: 'Warriors', 
      homeScore: 112, 
      awayScore: 108, 
      date: '2024-01-31', 
      prediction: 0.65 
    },
    { 
      homeTeam: 'Celtics', 
      awayTeam: 'Heat', 
      homeScore: 95, 
      awayScore: 102, 
      date: '2024-01-31', 
      prediction: 0.45 
    },
    { 
      homeTeam: 'Bulls', 
      awayTeam: 'Nets', 
      homeScore: 118, 
      awayScore: 115, 
      date: '2024-02-01', 
      prediction: 0.72 
    }
  ];
  
  res.json(mockGames);
});

app.get('/api/sentiment', (req, res) => {
  const mockSentiment = {
    overall: 'positive',
    score: 0.35,
    positive: 45,
    negative: 25,
    neutral: 30
  };
  
  res.json(mockSentiment);
});

// Twitter bot endpoint
app.post('/api/tweet', (req, res) => {
  const { message } = req.body;
  
  // Mock Twitter API response
  console.log('Tweet would be posted:', message);
  
  res.json({ 
    success: true, 
    message: 'Tweet posted successfully (mock)',
    tweet_id: 'mock_' + Date.now()
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    service: 'NBA Analytics API'
  });
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🏀 NBA Analytics server running on port ${PORT}`);
  console.log(`📊 Dashboard: http://localhost:${PORT}`);
  console.log(`🔗 API endpoints: http://localhost:${PORT}/api/`);
});

export default app;
