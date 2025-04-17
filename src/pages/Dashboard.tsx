
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Film, Download, ListPlus, Clock, Star, Activity } from "lucide-react";

const DashboardCard = ({ title, value, description, icon, className }: any) => {
  const Icon = icon;
  return (
    <Card className="cosmic-card overflow-hidden">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Icon className="h-5 w-5 text-cosmic-pink" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className={`text-3xl font-bold ${className}`}>{value}</div>
      </CardContent>
    </Card>
  );
};

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          <span className="text-cosmic-pink">Mobie</span>Theater
        </h1>
        <div className="relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cosmic-pink to-cosmic-pink-light rounded-lg blur opacity-70"></div>
          <button className="relative py-2 px-4 bg-background border border-cosmic-pink/50 rounded-lg font-orbitron">
            Add Movie
          </button>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <DashboardCard 
          title="Movies" 
          value="124" 
          description="Total in your library" 
          icon={Film}
          className="text-cosmic-pink"
        />
        <DashboardCard 
          title="Downloads" 
          value="3" 
          description="Currently in progress" 
          icon={Download}
          className="text-cosmic-pink-light"
        />
        <DashboardCard 
          title="Requests" 
          value="7" 
          description="Pending in your queue" 
          icon={ListPlus}
          className="text-cosmic-accent"
        />
      </div>
      
      <h2 className="text-2xl font-bold mt-8 mb-4">Currently Downloading</h2>
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="cosmic-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="h-16 w-12 bg-cosmic-pink/10 rounded flex items-center justify-center">
                  <Film className="text-cosmic-pink" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium truncate">Cosmic Journey {i}</h3>
                  <div className="w-full bg-cosmic-pink/10 rounded-full h-2 mt-2">
                    <div className="cosmic-gradient h-2 rounded-full" style={{ width: `${i * 25}%` }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>{i * 25}%</span>
                    <span>{i * 10} MB/s</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Recently Added</h2>
          {[1, 2, 3].map((i) => (
            <Card key={i} className="cosmic-card">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 bg-cosmic-pink/10 rounded flex items-center justify-center">
                    <Clock className="text-cosmic-pink" />
                  </div>
                  <div>
                    <h4 className="font-medium">Stellar Odyssey {i}</h4>
                    <p className="text-sm text-muted-foreground">Added {i} day{i > 1 ? 's' : ''} ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Top Rated</h2>
          {[1, 2, 3].map((i) => (
            <Card key={i} className="cosmic-card">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 bg-cosmic-pink/10 rounded flex items-center justify-center">
                    <Star className="text-cosmic-pink" />
                  </div>
                  <div>
                    <h4 className="font-medium">Cosmic Encounter {i}</h4>
                    <div className="flex mt-1">
                      {Array(5).fill(null).map((_, j) => (
                        <Star key={j} className={`h-3 w-3 ${j < (5 - i + 1) ? 'text-cosmic-pink' : 'text-cosmic-pink/20'}`} fill={j < (5 - i + 1) ? 'currentColor' : 'none'} />
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
