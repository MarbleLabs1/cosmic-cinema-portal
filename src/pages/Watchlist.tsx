
import { useState } from "react";
import { Search, Filter, Grid, List, Heart, Clock, X, PlayCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const WatchlistItem = ({ id, title, year, poster, added }: any) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Card 
      className="cosmic-card overflow-hidden transition-all duration-300 hover:shadow-cosmic-pink/30"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardContent className="p-0">
        <div className="flex">
          <Link to={`/movies/${id}`} className="w-16 h-24 overflow-hidden flex-shrink-0 bg-cosmic-pink/10">
            <div 
              className="h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${poster})` }}
            />
          </Link>
          
          <div className="flex-1 p-3 flex flex-col">
            <div className="flex justify-between">
              <Link to={`/movies/${id}`} className="hover:text-cosmic-pink">
                <h3 className="font-medium truncate">{title}</h3>
              </Link>
              {isHovered ? (
                <Button variant="ghost" size="icon" className="h-6 w-6 text-cosmic-pink hover:text-cosmic-pink-dark hover:bg-cosmic-pink/10">
                  <X className="h-3 w-3" />
                </Button>
              ) : null}
            </div>
            
            <p className="text-xs text-muted-foreground">{year}</p>
            
            <div className="flex justify-between items-center mt-auto">
              <p className="text-xs text-muted-foreground">Added {added}</p>
              
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-6 w-6 text-cosmic-pink hover:text-cosmic-pink-dark hover:bg-cosmic-pink/10">
                  <PlayCircle className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Watchlist = () => {
  const [view, setView] = useState<"grid" | "list">("list");
  
  // Mock data for watchlist
  const watchlist = [
    {
      id: 1,
      title: "Cosmic Journey",
      year: 2023,
      poster: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=300&h=450&fit=crop",
      added: "2 days ago"
    },
    {
      id: 2,
      title: "Stellar Odyssey",
      year: 2022,
      poster: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=300&h=450&fit=crop",
      added: "1 week ago"
    },
    {
      id: 3,
      title: "Neon Nova",
      year: 2021,
      poster: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300&h=450&fit=crop",
      added: "3 weeks ago"
    },
    {
      id: 4,
      title: "Pink Nebula",
      year: 2024,
      poster: "https://images.unsplash.com/photo-1581321825660-e7b4ea58a61c?w=300&h=450&fit=crop",
      added: "1 month ago"
    },
    {
      id: 5,
      title: "Stardust Dreams",
      year: 2022,
      poster: "https://images.unsplash.com/photo-1464802686167-b939a6910659?w=300&h=450&fit=crop",
      added: "2 months ago"
    },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Heart className="h-8 w-8 text-cosmic-pink" />
          <span>My <span className="text-cosmic-pink">Watchlist</span></span>
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
            placeholder="Search your watchlist..."
            className="pl-8 bg-cosmic/50 border-cosmic-pink/20 focus-visible:ring-cosmic-pink"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
        <Button variant="outline" className="gap-2">
          <Clock className="h-4 w-4" />
          Sort
        </Button>
      </div>
      
      <div className="space-y-2">
        {watchlist.length === 0 ? (
          <div className="cosmic-card p-8 text-center">
            <Heart className="h-16 w-16 mx-auto mb-4 text-cosmic-pink/30" />
            <h2 className="text-xl font-medium mb-2">Your watchlist is empty</h2>
            <p className="text-muted-foreground mb-4">Add movies and shows you want to watch later</p>
            <Button className="cosmic-gradient">
              Discover Movies
            </Button>
          </div>
        ) : (
          <div className={view === "grid" 
            ? "grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            : "space-y-2"
          }>
            {watchlist.map((item) => (
              <WatchlistItem key={item.id} {...item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Watchlist;
