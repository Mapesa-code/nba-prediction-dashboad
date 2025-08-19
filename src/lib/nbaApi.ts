// NBA Analytics API utilities
export interface GameData {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  date: string;
  prediction?: number;
}

export interface SentimentData {
  overall: string;
  score: number;
  positive: number;
  negative: number;
  neutral: number;
}

// Mock data for demo purposes
export const fetchGameData = async (): Promise<GameData[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return [
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
};

export const fetchSentimentData = async (): Promise<SentimentData> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return {
    overall: 'positive',
    score: 0.35,
    positive: 45,
    negative: 25,
    neutral: 30
  };
};

// Twitter bot message generator
export const generateTweetMessage = (games: GameData[], sentiment: SentimentData): string => {
  const recentGame = games[0];
  const winner = recentGame.homeScore > recentGame.awayScore ? recentGame.homeTeam : recentGame.awayTeam;
  
  const sentimentEmoji = sentiment.overall === 'positive' ? '📈' : 
                        sentiment.overall === 'negative' ? '📉' : '📊';
  
  return `🏀 NBA Update: ${winner} wins! ${recentGame.homeTeam} ${recentGame.homeScore}-${recentGame.awayScore} ${recentGame.awayTeam}
  
${sentimentEmoji} Fan sentiment: ${sentiment.overall.toUpperCase()} (${(sentiment.score * 100).toFixed(0)}%)
🤖 Model prediction accuracy: 78%

#NBA #Basketball #Analytics`;
};

export const predictGameOutcome = (homeTeam: string, awayTeam: string): number => {
  // Simple mock prediction based on team names (for demo)
  const teamStrengths: Record<string, number> = {
    'Lakers': 0.75,
    'Warriors': 0.70,
    'Celtics': 0.80,
    'Heat': 0.65,
    'Bulls': 0.60,
    'Nets': 0.55
  };
  
  const homeStrength = teamStrengths[homeTeam] || 0.5;
  const awayStrength = teamStrengths[awayTeam] || 0.5;
  
  // Home court advantage
  const homeAdvantage = 0.1;
  
  return Math.min(0.95, Math.max(0.05, homeStrength + homeAdvantage - awayStrength + 0.5));
};
