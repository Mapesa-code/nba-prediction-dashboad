import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Activity, BarChart3 } from 'lucide-react';
import TwitterBot from './TwitterBot';

interface GameData {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  date: string;
  prediction?: number;
}

const NBADashboard: React.FC = () => {
  const [games] = useState<GameData[]>([
    { homeTeam: 'Lakers', awayTeam: 'Warriors', homeScore: 112, awayScore: 108, date: '2024-01-31', prediction: 0.65 },
    { homeTeam: 'Celtics', awayTeam: 'Heat', homeScore: 95, awayScore: 102, date: '2024-01-31', prediction: 0.45 },
    { homeTeam: 'Bulls', awayTeam: 'Nets', homeScore: 118, awayScore: 115, date: '2024-02-01', prediction: 0.72 }
  ]);

  const [sentiment] = useState({
    overall: 'positive',
    score: 0.35,
    positive: 45,
    negative: 25,
    neutral: 30
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Games Analyzed</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{games.length}</div>
            <p className="text-xs text-muted-foreground">NBA games tracked</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sentiment Score</CardTitle>
            {sentiment.score > 0 ? 
              <TrendingUp className="h-4 w-4 text-green-600" /> : 
              <TrendingDown className="h-4 w-4 text-red-600" />
            }
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sentiment.score.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Overall {sentiment.overall}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prediction Accuracy</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">Model accuracy</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Games</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {games.map((game, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">
                      {game.homeTeam} vs {game.awayTeam}
                    </div>
                    <div className="text-sm text-muted-foreground">{game.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">
                      {game.homeScore} - {game.awayScore}
                    </div>
                    {game.prediction && (
                      <Badge variant={game.prediction > 0.5 ? "default" : "secondary"}>
                        {(game.prediction * 100).toFixed(0)}% confidence
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Social Media Sentiment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Positive</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{width: `${sentiment.positive}%`}}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{sentiment.positive}%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Negative</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-red-600 h-2 rounded-full" 
                      style={{width: `${sentiment.negative}%`}}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{sentiment.negative}%</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Neutral</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gray-600 h-2 rounded-full" 
                      style={{width: `${sentiment.neutral}%`}}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{sentiment.neutral}%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <TwitterBot games={games} sentiment={sentiment} />
    </div>
  );
};

export default NBADashboard;
