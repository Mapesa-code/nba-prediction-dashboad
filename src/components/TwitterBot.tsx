import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Twitter, Send, RefreshCw } from 'lucide-react';
import { generateTweetMessage } from '@/lib/nbaApi';

interface TwitterBotProps {
  games: any[];
  sentiment: any;
}

const TwitterBot: React.FC<TwitterBotProps> = ({ games, sentiment }) => {
  const [tweetMessage, setTweetMessage] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [lastTweet, setLastTweet] = useState<string | null>(null);

  const generateAutoTweet = () => {
    const message = generateTweetMessage(games, sentiment);
    setTweetMessage(message);
  };

  const postTweet = async () => {
    if (!tweetMessage.trim()) return;
    
    setIsPosting(true);
    try {
      const response = await fetch('/api/tweet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: tweetMessage }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setLastTweet(tweetMessage);
        setTweetMessage('');
        console.log('Tweet posted successfully');
      }
    } catch (error) {
      console.error('Error posting tweet:', error);
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Twitter className="h-5 w-5 text-blue-500" />
          Twitter Bot
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button 
            onClick={generateAutoTweet}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Generate Tweet
          </Button>
          <Badge variant="secondary">
            {tweetMessage.length}/280 characters
          </Badge>
        </div>
        
        <Textarea
          placeholder="Compose your NBA analytics tweet..."
          value={tweetMessage}
          onChange={(e) => setTweetMessage(e.target.value)}
          className="min-h-[120px]"
          maxLength={280}
        />
        
        <Button 
          onClick={postTweet}
          disabled={!tweetMessage.trim() || isPosting}
          className="w-full flex items-center gap-2"
        >
          <Send className="h-4 w-4" />
          {isPosting ? 'Posting...' : 'Post Tweet'}
        </Button>
        
        {lastTweet && (
          <div className="p-3 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">Last posted tweet:</p>
            <p className="text-sm">{lastTweet}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TwitterBot;
