# NBA Analytics Dashboard

A React-based web application that provides NBA game predictions and social media sentiment analysis. Built for deployment as a Twitter bot on Render.

## Features

- 🏀 NBA game data analysis and predictions
- 📊 Social media sentiment tracking
- 🤖 Machine learning-based game outcome predictions
- 📱 Responsive dashboard interface
- 🐦 Twitter bot integration ready

## Quick Start

### Local Development

1. Clone the repository:
```bash
git clone <your-repo-url>
cd nba-analytics-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

5. Start production server:
```bash
npm start
```

### Deployment on Render

1. Push your code to GitHub
2. Connect your GitHub repository to Render
3. Use these build settings:
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
   - **Node Version**: 18+

## API Endpoints

- `GET /api/games` - Fetch NBA game data
- `GET /api/sentiment` - Get social media sentiment
- `POST /api/tweet` - Post tweet (Twitter bot)
- `GET /api/health` - Health check

## Project Structure

```
src/
├── components/
│   ├── NBADashboard.tsx    # Main dashboard component
│   ├── AppLayout.tsx       # App layout wrapper
│   └── ui/                 # Reusable UI components
├── lib/
│   ├── nbaApi.ts          # NBA API utilities
│   └── utils.ts           # Helper functions
└── pages/
    ├── Index.tsx          # Home page
    └── NotFound.tsx       # 404 page
```

## Environment Variables

For production deployment, set these environment variables in Render:

```
NODE_ENV=production
PORT=3000
```

For Twitter bot functionality, add:
```
TWITTER_API_KEY=your_api_key
TWITTER_API_SECRET=your_api_secret
TWITTER_ACCESS_TOKEN=your_access_token
TWITTER_ACCESS_TOKEN_SECRET=your_access_token_secret
```

## Technologies Used

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express
- **UI Components**: Radix UI, Lucide React
- **Build Tool**: Vite
- **Deployment**: Render

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details.
