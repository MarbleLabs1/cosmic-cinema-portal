
import { 
  Play, 
  Monitor, 
  ExternalLink, 
  RefreshCw, 
  Settings as SettingsIcon, 
  FolderOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { usePlayerSettings } from "@/hooks/usePlayerSettings";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { useState } from "react";

const PlayerSettings = () => {
  const { 
    defaultPlayer, 
    autoPlay, 
    rememberPlaybackPosition, 
    subtitlesEnabled,
    setDefaultPlayer,
    setAutoPlay,
    setRememberPlaybackPosition,
    setSubtitlesEnabled
  } = usePlayerSettings();
  
  const [isVlcDetected, setIsVlcDetected] = useState(true);
  const [isJellyfinDetected, setIsJellyfinDetected] = useState(false);
  
  const detectMediaPlayers = () => {
    // In a real app, this would use the Electron API to detect installed players
    // or make API calls to check for running instances of Jellyfin/Plex servers
    toast.success("Scanning for media players...");
    
    // Simulating detection
    setTimeout(() => {
      setIsVlcDetected(true);
      setIsJellyfinDetected(Math.random() > 0.5);
      toast.success("Scan complete! Found VLC Player.");
    }, 1500);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          <span className="text-cosmic-pink">Player</span> Settings
        </h1>
        <Button className="cosmic-gradient">
          <SettingsIcon className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card className="cosmic-card">
            <CardHeader>
              <CardTitle>Default Player</CardTitle>
              <CardDescription>Choose how you want to play your media</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup 
                defaultValue={defaultPlayer} 
                onValueChange={(value) => setDefaultPlayer(value as any)}
                className="space-y-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="builtin" id="builtin" />
                  <Label htmlFor="builtin" className="flex items-center gap-2">
                    <Play className="h-4 w-4 text-cosmic-pink" />
                    Built-in Player
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="vlc" id="vlc" disabled={!isVlcDetected} />
                  <Label 
                    htmlFor="vlc" 
                    className={`flex items-center gap-2 ${!isVlcDetected ? 'opacity-50' : ''}`}
                  >
                    <ExternalLink className="h-4 w-4 text-cosmic-pink" />
                    VLC Media Player {!isVlcDetected && "(Not detected)"}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="jellyfin" id="jellyfin" disabled={!isJellyfinDetected} />
                  <Label 
                    htmlFor="jellyfin" 
                    className={`flex items-center gap-2 ${!isJellyfinDetected ? 'opacity-50' : ''}`}
                  >
                    <Monitor className="h-4 w-4 text-cosmic-pink" />
                    Jellyfin {!isJellyfinDetected && "(Not detected)"}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="system" id="system" />
                  <Label htmlFor="system" className="flex items-center gap-2">
                    <SettingsIcon className="h-4 w-4 text-cosmic-pink" />
                    System Default
                  </Label>
                </div>
              </RadioGroup>
              
              <Button 
                variant="outline" 
                className="mt-4 border-cosmic-pink/30 hover:bg-cosmic-pink/10"
                onClick={detectMediaPlayers}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Detect Media Players
              </Button>
            </CardContent>
          </Card>
          
          <Card className="cosmic-card">
            <CardHeader>
              <CardTitle>Playback Settings</CardTitle>
              <CardDescription>Configure how videos play</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="autoplay">Auto-Play</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically start playback when opening a video
                    </p>
                  </div>
                  <Switch
                    id="autoplay"
                    checked={autoPlay}
                    onCheckedChange={setAutoPlay}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="rememberPosition">Remember Playback Position</Label>
                    <p className="text-sm text-muted-foreground">
                      Continue watching from where you left off
                    </p>
                  </div>
                  <Switch
                    id="rememberPosition"
                    checked={rememberPlaybackPosition}
                    onCheckedChange={setRememberPlaybackPosition}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="subtitles">Enable Subtitles</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically load subtitles when available
                    </p>
                  </div>
                  <Switch
                    id="subtitles"
                    checked={subtitlesEnabled}
                    onCheckedChange={setSubtitlesEnabled}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card className="cosmic-card">
            <CardHeader>
              <CardTitle>Media Locations</CardTitle>
              <CardDescription>Manage where MobieTheater looks for media</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border border-cosmic-pink/20 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Movies</p>
                    <p className="text-sm text-muted-foreground">/movies</p>
                  </div>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
              </div>
              
              <div className="rounded-md border border-cosmic-pink/20 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">TV Shows</p>
                    <p className="text-sm text-muted-foreground">/tv</p>
                  </div>
                  <Button variant="outline" size="sm">Edit</Button>
                </div>
              </div>
              
              <Button className="w-full border-cosmic-pink/30 hover:bg-cosmic-pink/10">
                <FolderOpen className="h-4 w-4 mr-2" />
                Add Media Location
              </Button>
            </CardContent>
          </Card>
          
          <Card className="cosmic-card">
            <CardHeader>
              <CardTitle>Auto-Discovery</CardTitle>
              <CardDescription>Connect MobieTheater with qBittorrent</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="autoDetect">Auto-Detect Downloads</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically find new media from qBittorrent
                  </p>
                </div>
                <Switch
                  id="autoDetect"
                  defaultChecked={true}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="organizeFiles">Organize Files</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically arrange downloads into proper folders
                  </p>
                </div>
                <Switch
                  id="organizeFiles"
                  defaultChecked={true}
                />
              </div>
              
              <Button className="w-full cosmic-gradient mt-2">
                <RefreshCw className="h-4 w-4 mr-2" />
                Scan Library Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PlayerSettings;
