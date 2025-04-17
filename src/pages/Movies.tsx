
import { useState } from "react";
import { Search, Filter, Grid, List } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const MovieCard = ({ id, title, year, poster }: any) => {
  return (
    <Link to={`/movies/${id}`} className="group">
      <div className="cosmic-card overflow-hidden transition-all duration-300 group-hover:shadow-cosmic-pink/30 group-hover:scale-[1.02]">
        <div className="relative aspect-[2/3] overflow-hidden bg-cosmic-pink/5">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${poster})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cosmic opacity-70" />
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <h3 className="text-sm font-semibold truncate">{title}</h3>
            <p className="text-xs text-cosmic-pink">{year}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

const Movies = () => {
  const [view, setView] = useState<"grid" | "list">("grid");
  
  // Mock data for movie cards
  const movies = [
    {
      id: 1,
      title: "Cosmic Journey",
      year: 2023,
      poster: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=300&h=450&fit=crop"
    },
    {
      id: 2,
      title: "Stellar Odyssey",
      year: 2022,
      poster: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=300&h=450&fit=crop"
    },
    {
      id: 3,
      title: "Neon Nova",
      year: 2021,
      poster: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300&h=450&fit=crop"
    },
    {
      id: 4,
      title: "Pink Nebula",
      year: 2024,
      poster: "https://images.unsplash.com/photo-1581321825660-e7b4ea58a61c?w=300&h=450&fit=crop"
    },
    {
      id: 5,
      title: "Stardust Dreams",
      year: 2022,
      poster: "https://images.unsplash.com/photo-1464802686167-b939a6910659?w=300&h=450&fit=crop"
    },
    {
      id: 6,
      title: "Astral Echoes",
      year: 2023,
      poster: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=300&h=450&fit=crop"
    },
    {
      id: 7,
      title: "Cosmic Shadows",
      year: 2021,
      poster: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=300&h=450&fit=crop"
    },
    {
      id: 8,
      title: "Stellar Dance",
      year: 2024,
      poster: "https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?w=300&h=450&fit=crop"
    },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          <span className="text-cosmic-pink">Movies</span> Library
        </h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setView("grid")}
            className={view === "grid" ? "bg-cosmic-pink text-white" : ""}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setView("list")}
            className={view === "list" ? "bg-cosmic-pink text-white" : ""}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search movies..."
            className="pl-8 bg-cosmic/50 border-cosmic-pink/20 focus-visible:ring-cosmic-pink"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>
      
      <div className={view === "grid" 
        ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        : "space-y-4"
      }>
        {movies.map((movie) => (
          <MovieCard key={movie.id} {...movie} />
        ))}
      </div>
    </div>
  );
};

export default Movies;
