
import { useState } from "react";
import { Search, Filter, Star, TrendingUp, Clock, Award, ThumbsUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const MoviePoster = ({ id, title, year, rating, poster }: any) => {
  return (
    <Link to={`/movies/${id}`} className="group">
      <div className="cosmic-card overflow-hidden transition-all duration-300 group-hover:shadow-cosmic-pink/30 group-hover:scale-[1.02]">
        <div className="relative aspect-[2/3] overflow-hidden bg-cosmic-pink/5">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${poster})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cosmic opacity-70" />
          
          <div className="absolute top-2 right-2 bg-cosmic-pink/80 px-1.5 py-0.5 rounded flex items-center">
            <Star className="h-3 w-3 fill-white text-white" />
            <span className="text-white text-xs ml-0.5">{rating}</span>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <h3 className="text-sm font-semibold truncate">{title}</h3>
            <p className="text-xs text-cosmic-pink">{year}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

const Discover = () => {
  // Mock data for trending movies
  const trending = [
    {
      id: 1,
      title: "Cosmic Journey",
      year: 2023,
      rating: 4.7,
      poster: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=300&h=450&fit=crop"
    },
    {
      id: 2,
      title: "Stellar Odyssey",
      year: 2022,
      rating: 4.5,
      poster: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=300&h=450&fit=crop"
    },
    {
      id: 3,
      title: "Neon Nova",
      year: 2021,
      rating: 4.8,
      poster: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=300&h=450&fit=crop"
    },
    {
      id: 4,
      title: "Pink Nebula",
      year: 2024,
      rating: 4.3,
      poster: "https://images.unsplash.com/photo-1581321825660-e7b4ea58a61c?w=300&h=450&fit=crop"
    },
  ];
  
  // Mock data for new movies
  const newReleases = [
    {
      id: 5,
      title: "Stardust Dreams",
      year: 2022,
      rating: 4.2,
      poster: "https://images.unsplash.com/photo-1464802686167-b939a6910659?w=300&h=450&fit=crop"
    },
    {
      id: 6,
      title: "Astral Echoes",
      year: 2023,
      rating: 4.6,
      poster: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=300&h=450&fit=crop"
    },
    {
      id: 7,
      title: "Cosmic Shadows",
      year: 2021,
      rating: 4.4,
      poster: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?w=300&h=450&fit=crop"
    },
    {
      id: 8,
      title: "Stellar Dance",
      year: 2024,
      rating: 4.9,
      poster: "https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?w=300&h=450&fit=crop"
    },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          <span className="text-cosmic-pink">Discover</span> New Movies
        </h1>
      </div>
      
      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for movies..."
            className="pl-8 bg-cosmic/50 border-cosmic-pink/20 focus-visible:ring-cosmic-pink"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>
      
      <Tabs defaultValue="trending" className="w-full">
        <TabsList className="bg-cosmic-pink/5 border border-cosmic-pink/20">
          <TabsTrigger 
            value="trending" 
            className="data-[state=active]:bg-cosmic-pink data-[state=active]:text-white gap-1"
          >
            <TrendingUp className="h-4 w-4" />
            Trending
          </TabsTrigger>
          <TabsTrigger 
            value="new" 
            className="data-[state=active]:bg-cosmic-pink data-[state=active]:text-white gap-1"
          >
            <Clock className="h-4 w-4" />
            New Releases
          </TabsTrigger>
          <TabsTrigger 
            value="top" 
            className="data-[state=active]:bg-cosmic-pink data-[state=active]:text-white gap-1"
          >
            <Award className="h-4 w-4" />
            Top Rated
          </TabsTrigger>
          <TabsTrigger 
            value="recommended" 
            className="data-[state=active]:bg-cosmic-pink data-[state=active]:text-white gap-1"
          >
            <ThumbsUp className="h-4 w-4" />
            For You
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="trending" className="mt-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {trending.map((movie) => (
              <MoviePoster key={movie.id} {...movie} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="new" className="mt-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {newReleases.map((movie) => (
              <MoviePoster key={movie.id} {...movie} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="top" className="mt-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[...trending, ...newReleases]
              .sort((a, b) => b.rating - a.rating)
              .slice(0, 5)
              .map((movie) => (
                <MoviePoster key={movie.id} {...movie} />
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="recommended" className="mt-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[...trending, ...newReleases]
              .sort(() => 0.5 - Math.random())
              .slice(0, 5)
              .map((movie) => (
                <MoviePoster key={movie.id} {...movie} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="cosmic-card p-6">
        <h2 className="text-xl font-bold mb-4">Genres</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {["Action", "Adventure", "Animation", "Comedy", "Crime", "Documentary", "Drama", "Fantasy"].map((genre) => (
            <Card key={genre} className="cosmic-card overflow-hidden">
              <CardContent className="p-0">
                <button className="w-full h-full p-4 text-center hover:bg-cosmic-pink/10 transition-colors">
                  <p className="font-medium">{genre}</p>
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Discover;
