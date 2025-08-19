import React from 'react';
import NBADashboard from './NBADashboard';

const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-primary">NBA Analytics Dashboard</h1>
          <p className="text-muted-foreground">Real-time NBA game predictions and social media sentiment</p>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <NBADashboard />
      </main>
      
      <footer className="border-t mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-muted-foreground">
          <p>&copy; 2024 NBA Analytics. Powered by machine learning and social media analysis.</p>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
