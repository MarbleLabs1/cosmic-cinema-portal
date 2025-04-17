
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, Pause, Play, X, Filter, Film } from "lucide-react";

const DownloadItem = ({ movie, progress, speed, eta, status }: any) => {
  return (
    <Card className="cosmic-card">
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="h-16 w-12 rounded overflow-hidden flex-shrink-0">
            <div className="h-full w-full bg-cosmic-pink/10 flex items-center justify-center">
              <Film className="text-cosmic-pink" />
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start">
              <h3 className="font-medium truncate">{movie}</h3>
              <div className="flex gap-1">
                {status === "downloading" ? (
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Pause className="h-3 w-3" />
                  </Button>
                ) : (
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Play className="h-3 w-3" />
                  </Button>
                )}
                <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive">
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
            
            <Progress value={progress} className="h-2 mt-2 bg-cosmic-pink/10" />
            
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>{progress}%</span>
              <span className="flex gap-3">
                <span>{speed}</span>
                <span>ETA: {eta}</span>
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const Downloads = () => {
  // Mock data for downloads
  const downloads = [
    { id: 1, movie: "Cosmic Journey", progress: 68, speed: "3.2 MB/s", eta: "15 minutes", status: "downloading" },
    { id: 2, movie: "Stellar Odyssey", progress: 42, speed: "2.5 MB/s", eta: "30 minutes", status: "downloading" },
    { id: 3, movie: "Neon Nova", progress: 89, speed: "4.1 MB/s", eta: "5 minutes", status: "downloading" },
  ];
  
  const completed = [
    { id: 4, movie: "Pink Nebula", progress: 100, size: "2.3 GB", date: "Yesterday", status: "completed" },
    { id: 5, movie: "Stardust Dreams", progress: 100, size: "1.8 GB", date: "3 days ago", status: "completed" },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          <span className="text-cosmic-pink">Downloads</span> Manager
        </h1>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button className="cosmic-gradient">
            <Download className="h-4 w-4 mr-2" />
            Add Download
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="bg-cosmic-pink/5 border border-cosmic-pink/20">
          <TabsTrigger value="active" className="data-[state=active]:bg-cosmic-pink data-[state=active]:text-white">
            Active ({downloads.length})
          </TabsTrigger>
          <TabsTrigger value="completed" className="data-[state=active]:bg-cosmic-pink data-[state=active]:text-white">
            Completed ({completed.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="active" className="mt-4 space-y-4">
          {downloads.map((download) => (
            <DownloadItem key={download.id} {...download} />
          ))}
        </TabsContent>
        
        <TabsContent value="completed" className="mt-4 space-y-4">
          {completed.map((download) => (
            <Card key={download.id} className="cosmic-card">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="h-16 w-12 rounded overflow-hidden flex-shrink-0">
                    <div className="h-full w-full bg-cosmic-pink/10 flex items-center justify-center">
                      <Film className="text-cosmic-pink" />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium truncate">{download.movie}</h3>
                      <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive">
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                    
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>{download.size}</span>
                      <span>Completed {download.date}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
      
      <div className="cosmic-card p-4">
        <h2 className="text-lg font-medium mb-3">qBittorrent Status</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3 bg-cosmic-pink/5 rounded-lg">
            <p className="text-sm text-muted-foreground">Download Speed</p>
            <p className="text-lg font-medium">9.8 MB/s</p>
          </div>
          <div className="p-3 bg-cosmic-pink/5 rounded-lg">
            <p className="text-sm text-muted-foreground">Upload Speed</p>
            <p className="text-lg font-medium">2.3 MB/s</p>
          </div>
          <div className="p-3 bg-cosmic-pink/5 rounded-lg">
            <p className="text-sm text-muted-foreground">Active Torrents</p>
            <p className="text-lg font-medium">{downloads.length}</p>
          </div>
          <div className="p-3 bg-cosmic-pink/5 rounded-lg">
            <p className="text-sm text-muted-foreground">Status</p>
            <p className="text-lg font-medium text-cosmic-pink">Running</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Downloads;
