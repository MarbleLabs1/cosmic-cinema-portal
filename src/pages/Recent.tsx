
import { useState } from "react";
import { Calendar, Search, Filter, Play, List, Grid, Film, Download, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ActivityItem = ({ id, title, type, timestamp, poster, details }: any) => {
  const getTypeIcon = () => {
    switch (type) {
      case "added":
        return <Film className="h-4 w-4 text-green-500" />;
      case "downloaded":
        return <Download className="h-4 w-4 text-cosmic-pink" />;
      case "watched":
        return <Play className="h-4 w-4 text-yellow-500" />;
      default:
        return <Info className="h-4 w-4 text-gray-500" />;
    }
  };
  
  const getTypeBadge = () => {
    switch (type) {
      case "added":
        return <Badge className="bg-green-500/20 text-green-500 border-green-500/30">Added</Badge>;
      case "downloaded":
        return <Badge className="bg-cosmic-pink/20 text-cosmic-pink border-cosmic-pink/30">Downloaded</Badge>;
      case "watched":
        return <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500/30">Watched</Badge>;
      default:
        return <Badge>Activity</Badge>;
    }
  };
  
  return (
    <Card className="cosmic-card overflow-hidden">
      <CardContent className="p-4">
        <div className="flex gap-4">
          <Link to={`/movies/${id}`} className="h-16 w-12 rounded overflow-hidden flex-shrink-0 bg-cosmic-pink/10">
            {poster ? (
              <div 
                className="h-full w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${poster})` }}
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center">
                <Film className="text-cosmic-pink" />
              </div>
            )}
          </Link>
          
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <Link to={`/movies/${id}`} className="hover:text-cosmic-pink">
                <h3 className="font-medium truncate">{title}</h3>
              </Link>
              {getTypeBadge()}
            </div>
            
            <div className="flex justify-between items-center mt-2">
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{timestamp}</span>
              </div>
              
              <div className="flex gap-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        {getTypeIcon()}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{details}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <Link to={`/movies/${id}`}>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-cosmic-pink hover:text-cosmic-pink-dark hover:bg-cosmic-pink/10">
                    <Info className="h-3 w-3" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Recent = () => {
  const [view, setView] = useState<"grid" | "list">("list");
  
  // Mock data for activity
  const activities = [
    { 
      id: 1, 
      title: "Cosmic Journey", 
      type: "downloaded", 
      timestamp: "Today, 14:32",
      poster: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=300&h=450&fit=crop",
      details: "Downloaded in 1080p quality"
    },
    { 
      id: 2, 
      title: "Stellar Odyssey", 
      type: "watched", 
      timestamp: "Yesterday, 20:15",
      poster: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=300&h=450&fit=crop",
      details: "Watched 1 hour and 25 minutes"
    },
    { 
      id: 3, 
      title: "Neon Nova", 
      type: "added", 
      timestamp: "2 days ago",
      poster: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300&h=450&fit=crop",
      details: "Added to library from request"
    },
    { 
      id: 4, 
      title: "Pink Nebula", 
      type: "downloaded", 
      timestamp: "3 days ago",
      poster: "https://images.unsplash.com/photo-1581321825660-e7b4ea58a61c?w=300&h=450&fit=crop",
      details: "Downloaded in 4K quality"
    },
    { 
      id: 5, 
      title: "Stardust Dreams", 
      type: "watched", 
      timestamp: "5 days ago",
      poster: "https://images.unsplash.com/photo-1464802686167-b939a6910659?w=300&h=450&fit=crop",
      details: "Watched entire movie"
    },
    { 
      id: 6, 
      title: "Astral Echoes", 
      type: "added", 
      timestamp: "1 week ago",
      poster: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=300&h=450&fit=crop",
      details: "Added to library manually"
    },
    { 
      id: 7, 
      title: "Cosmic Shadows", 
      type: "downloaded", 
      timestamp: "1 week ago",
      poster: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=300&h=450&fit=crop",
      details: "Downloaded in 720p quality"
    },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          <span className="text-cosmic-pink">Recent</span> Activity
        </h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setView("list")}
            className={view === "list" ? "bg-cosmic-pink text-white" : ""}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setView("grid")}
            className={view === "grid" ? "bg-cosmic-pink text-white" : ""}
          >
            <Grid className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search activity..."
            className="pl-8 bg-cosmic/50 border-cosmic-pink/20 focus-visible:ring-cosmic-pink"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>
      
      <div className={view === "grid" 
        ? "grid grid-cols-1 md:grid-cols-2 gap-4"
        : "space-y-2"
      }>
        {activities.map((activity) => (
          <ActivityItem key={activity.id} {...activity} />
        ))}
      </div>
      
      <div className="text-center pt-4">
        <Button variant="outline" className="border-cosmic-pink/30 hover:bg-cosmic-pink/10">
          Load More Activity
        </Button>
      </div>
    </div>
  );
};

export default Recent;
