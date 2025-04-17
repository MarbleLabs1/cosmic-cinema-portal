
import { ArrowLeft, Download, Clock, Star, Heart, Share2, Play, ExternalLink, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { VideoPlayer } from "@/components/player/VideoPlayer";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { toast } from "sonner";
import { usePlayerSettings } from "@/hooks/usePlayerSettings";

const MovieDetails = () => {
  const { id } = useParams();
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const { defaultPlayer } = usePlayerSettings();
  
  // Mock movie data - in a real app this would come from an API
  const movie = {
    id,
    title: "Cosmic Journey",
    year: 2023,
    runtime: "2h 15m",
    rating: 4.7,
    synopsis: "A mind-bending journey through space and time, exploring the depths of cosmic consciousness and the boundaries of human perception. When a team of astronauts ventures into a newly discovered wormhole, they find themselves in a dimension where reality and imagination blend together.",
    director: "Stella Novak",
    cast: ["Alex Starr", "Maria Luna", "David Cosmos", "Elena Nova"],
    genres: ["Sci-Fi", "Adventure", "Drama"],
    poster: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=600&h=900&fit=crop",
    backdrop: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1200&h=400&fit=crop",
    downloadStatus: {
      isDownloading: true,
      progress: 68,
      speed: "3.2 MB/s",
      eta: "15 minutes"
    },
    // Added fields for video sources
    videoSource: "/sample-video.mp4", // This would be a real file path in production
    isDownloaded: true,
    filePath: "/movies/Cosmic Journey (2023)/Cosmic.Journey.2023.1080p.mkv"
  };
  
  const openPlayer = () => {
    setIsPlayerOpen(true);
  };
  
  const closePlayer = () => {
    setIsPlayerOpen(false);
  };
  
  const playInVLC = () => {
    // In a real implementation, this would use Electron's shell.openExternal
    // or a custom protocol handler to open VLC with the file
    const vlcUrl = `vlc://${movie.filePath}`;
    window.open(vlcUrl, '_blank');
    toast.success(`Opening ${movie.title} in VLC player`);
  };
  
  const playInDefaultPlayer = () => {
    if (defaultPlayer === 'builtin') {
      openPlayer();
    } else if (defaultPlayer === 'vlc') {
      playInVLC();
    } else if (defaultPlayer === 'jellyfin') {
      // In a real implementation, this would redirect to the Jellyfin web UI
      toast.success(`Opening ${movie.title} in Jellyfin`);
    } else {
      openPlayer();
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex gap-2 items-center mb-4">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/movies">
            <ArrowLeft className="h-5 w-5 text-cosmic-pink" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold tracking-tight">
          <span className="text-cosmic-pink">{movie.title}</span>
        </h1>
      </div>
      
      <div className="relative h-60 md:h-80 w-full rounded-lg overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${movie.backdrop})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cosmic via-cosmic/80 to-transparent" />
        
        <div className="absolute bottom-0 inset-x-0 p-6 flex items-end">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-32 h-48 rounded-lg overflow-hidden shadow-lg cosmic-card flex-shrink-0">
              <img 
                src={movie.poster} 
                alt={movie.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-orbitron text-lg">{movie.year}</span>
                  <span className="text-muted-foreground">•</span>
                  <span>{movie.runtime}</span>
                </div>
                
                <div className="flex flex-wrap gap-2 my-2">
                  {movie.genres.map((genre) => (
                    <Badge key={genre} variant="outline" className="border-cosmic-pink/30 bg-cosmic-pink/5">
                      {genre}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center gap-1 my-2">
                  <Star className="h-4 w-4 fill-cosmic-pink text-cosmic-pink" />
                  <span className="font-medium">{movie.rating}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <Button 
                  className="cosmic-gradient"
                  onClick={playInDefaultPlayer}
                >
                  <Play className="mr-2 h-4 w-4" />
                  Watch Now
                </Button>
                
                <Button 
                  variant="outline" 
                  className="border-cosmic-pink/30 hover:bg-cosmic-pink/10"
                  onClick={playInVLC}
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Open in VLC
                </Button>
                
                <Button variant="outline" className="border-cosmic-pink/30 hover:bg-cosmic-pink/10"
                  onClick={() => setIsInWatchlist(!isInWatchlist)}>
                  <Heart className={`mr-2 h-4 w-4 ${isInWatchlist ? 'fill-cosmic-pink text-cosmic-pink' : ''}`} />
                  {isInWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
                </Button>
                <Button variant="outline" className="border-cosmic-pink/30 hover:bg-cosmic-pink/10">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="cosmic-card p-6">
            <h2 className="text-xl font-bold mb-3">Synopsis</h2>
            <p className="text-muted-foreground">{movie.synopsis}</p>
          </div>
          
          <div className="cosmic-card p-6">
            <h2 className="text-xl font-bold mb-3">Cast & Crew</h2>
            <div className="mb-4">
              <h3 className="text-sm font-medium text-muted-foreground">Director</h3>
              <p>{movie.director}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Cast</h3>
              <div className="flex flex-wrap gap-2 mt-1">
                {movie.cast.map((actor) => (
                  <Badge key={actor} className="bg-cosmic-pink/10 border-none text-cosmic-accent">
                    {actor}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="cosmic-card p-6">
            <h2 className="text-xl font-bold mb-3">Download</h2>
            {movie.downloadStatus.isDownloading ? (
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Downloading...</span>
                  <span>{movie.downloadStatus.progress}%</span>
                </div>
                <Progress value={movie.downloadStatus.progress} className="h-2 bg-cosmic-pink/10" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{movie.downloadStatus.speed}</span>
                  <span>ETA: {movie.downloadStatus.eta}</span>
                </div>
                <Button variant="outline" className="w-full border-cosmic-pink/30 hover:bg-cosmic-pink/10">
                  Pause
                </Button>
              </div>
            ) : movie.isDownloaded ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-cosmic-pink/10 rounded-md">
                  <div className="flex items-center gap-2">
                    <Monitor className="h-4 w-4 text-cosmic-pink" />
                    <div>
                      <p className="text-sm font-medium">Ready to Watch</p>
                      <p className="text-xs text-muted-foreground">{movie.filePath.split('/').pop()}</p>
                    </div>
                  </div>
                </div>
                <Button className="cosmic-gradient w-full" onClick={playInDefaultPlayer}>
                  <Play className="mr-2 h-4 w-4" />
                  Play
                </Button>
              </div>
            ) : (
              <Button className="cosmic-gradient w-full">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            )}
          </div>
          
          <div className="cosmic-card p-6">
            <h2 className="text-xl font-bold mb-3">Watch History</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-cosmic-pink" />
                <div>
                  <p className="text-sm">Last watched</p>
                  <p className="text-xs text-muted-foreground">Never</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Dialog open={isPlayerOpen} onOpenChange={setIsPlayerOpen}>
        <DialogContent className="max-w-6xl h-[80vh] p-0 bg-cosmic border border-cosmic-pink/20">
          {isPlayerOpen && (
            <div className="w-full h-full">
              <VideoPlayer 
                src={movie.videoSource} 
                poster={movie.backdrop} 
                title={movie.title}
                onClose={closePlayer}
                autoPlay
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MovieDetails;
