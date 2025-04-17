
import { useState } from "react";
import { 
  Save, 
  RefreshCw, 
  Trash, 
  Server, 
  Database, 
  Shield, 
  MonitorSmartphone, 
  Download,
  FolderOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const SettingsCard = ({ title, description, children, footer }: any) => {
  return (
    <Card className="cosmic-card">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      {footer && (
        <CardFooter>
          {footer}
        </CardFooter>
      )}
    </Card>
  );
};

const Settings = () => {
  const [isAutomaticDownloadsEnabled, setIsAutomaticDownloadsEnabled] = useState(true);
  const [isLibraryMonitoringEnabled, setIsLibraryMonitoringEnabled] = useState(true);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          <span className="text-cosmic-pink">MobieTheater</span> Settings
        </h1>
        <Button className="cosmic-gradient">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>
      
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="bg-cosmic-pink/5 border border-cosmic-pink/20 w-full justify-start">
          <TabsTrigger 
            value="general" 
            className="data-[state=active]:bg-cosmic-pink data-[state=active]:text-white"
          >
            General
          </TabsTrigger>
          <TabsTrigger 
            value="server" 
            className="data-[state=active]:bg-cosmic-pink data-[state=active]:text-white"
          >
            qBittorrent
          </TabsTrigger>
          <TabsTrigger 
            value="library" 
            className="data-[state=active]:bg-cosmic-pink data-[state=active]:text-white"
          >
            Library
          </TabsTrigger>
          <TabsTrigger 
            value="advanced" 
            className="data-[state=active]:bg-cosmic-pink data-[state=active]:text-white"
          >
            Advanced
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="mt-6 space-y-6">
          <SettingsCard
            title="Application Settings"
            description="Configure general application behavior"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="automatic-downloads">Automatic Downloads</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically download new content when added
                  </p>
                </div>
                <Switch
                  id="automatic-downloads"
                  checked={isAutomaticDownloadsEnabled}
                  onCheckedChange={setIsAutomaticDownloadsEnabled}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="library-monitoring">Library Monitoring</Label>
                  <p className="text-sm text-muted-foreground">
                    Monitor library folders for changes
                  </p>
                </div>
                <Switch
                  id="library-monitoring"
                  checked={isLibraryMonitoringEnabled}
                  onCheckedChange={setIsLibraryMonitoringEnabled}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notifications">Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Show notifications for downloads and updates
                  </p>
                </div>
                <Switch
                  id="notifications"
                  checked={isNotificationsEnabled}
                  onCheckedChange={setIsNotificationsEnabled}
                />
              </div>
            </div>
          </SettingsCard>
          
          <SettingsCard
            title="User Interface"
            description="Customize the appearance of MobieTheater"
            footer={
              <Button variant="outline">Reset to Default</Button>
            }
          >
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="items-per-page">Items Per Page</Label>
                  <Input
                    id="items-per-page"
                    type="number"
                    defaultValue="24"
                    className="bg-cosmic/50 border-cosmic-pink/20 focus-visible:ring-cosmic-pink"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="default-view">Default View</Label>
                  <select 
                    id="default-view"
                    className="flex h-9 w-full rounded-md border border-cosmic-pink/20 bg-cosmic/50 px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cosmic-pink file:border-0 file:bg-transparent file:text-sm file:font-medium"
                  >
                    <option value="grid">Grid</option>
                    <option value="list">List</option>
                  </select>
                </div>
              </div>
            </div>
          </SettingsCard>
        </TabsContent>
        
        <TabsContent value="server" className="mt-6 space-y-6">
          <SettingsCard
            title="qBittorrent Connection"
            description="Configure connection to qBittorrent"
            footer={
              <div className="flex gap-2">
                <Button variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Test Connection
                </Button>
                <Button className="cosmic-gradient">Save Connection</Button>
              </div>
            }
          >
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="qbt-host">Host</Label>
                  <Input
                    id="qbt-host"
                    defaultValue="http://localhost"
                    className="bg-cosmic/50 border-cosmic-pink/20 focus-visible:ring-cosmic-pink"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="qbt-port">Port</Label>
                  <Input
                    id="qbt-port"
                    defaultValue="8080"
                    className="bg-cosmic/50 border-cosmic-pink/20 focus-visible:ring-cosmic-pink"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="qbt-username">Username</Label>
                  <Input
                    id="qbt-username"
                    defaultValue="admin"
                    className="bg-cosmic/50 border-cosmic-pink/20 focus-visible:ring-cosmic-pink"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="qbt-password">Password</Label>
                  <Input
                    id="qbt-password"
                    type="password"
                    defaultValue="password"
                    className="bg-cosmic/50 border-cosmic-pink/20 focus-visible:ring-cosmic-pink"
                  />
                </div>
              </div>
            </div>
          </SettingsCard>
          
          <SettingsCard
            title="Download Settings"
            description="Configure download behavior"
          >
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="default-save-path">Default Save Path</Label>
                  <div className="flex gap-2">
                    <Input
                      id="default-save-path"
                      defaultValue="/downloads/movies"
                      className="bg-cosmic/50 border-cosmic-pink/20 focus-visible:ring-cosmic-pink"
                    />
                    <Button variant="outline" size="icon">
                      <FolderOpen className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="download-speed-limit">Download Speed Limit (KB/s)</Label>
                  <Input
                    id="download-speed-limit"
                    type="number"
                    defaultValue="0"
                    className="bg-cosmic/50 border-cosmic-pink/20 focus-visible:ring-cosmic-pink"
                  />
                  <p className="text-xs text-muted-foreground">0 = unlimited</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="upload-speed-limit">Upload Speed Limit (KB/s)</Label>
                  <Input
                    id="upload-speed-limit"
                    type="number"
                    defaultValue="0"
                    className="bg-cosmic/50 border-cosmic-pink/20 focus-visible:ring-cosmic-pink"
                  />
                  <p className="text-xs text-muted-foreground">0 = unlimited</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="max-active-downloads">Max Active Downloads</Label>
                  <Input
                    id="max-active-downloads"
                    type="number"
                    defaultValue="5"
                    className="bg-cosmic/50 border-cosmic-pink/20 focus-visible:ring-cosmic-pink"
                  />
                </div>
              </div>
            </div>
          </SettingsCard>
        </TabsContent>
        
        <TabsContent value="library" className="mt-6 space-y-6">
          <SettingsCard
            title="Library Paths"
            description="Configure library locations"
            footer={
              <Button className="cosmic-gradient">
                <FolderOpen className="h-4 w-4 mr-2" />
                Add Library Path
              </Button>
            }
          >
            <div className="space-y-4">
              <div className="rounded-md border border-cosmic-pink/20">
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium">Movies</p>
                    <p className="text-sm text-muted-foreground">/movies</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm" className="text-destructive">Remove</Button>
                  </div>
                </div>
                <div className="border-t border-cosmic-pink/20 p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium">TV Shows</p>
                    <p className="text-sm text-muted-foreground">/tv</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm" className="text-destructive">Remove</Button>
                  </div>
                </div>
                <div className="border-t border-cosmic-pink/20 p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium">Documentaries</p>
                    <p className="text-sm text-muted-foreground">/documentaries</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm" className="text-destructive">Remove</Button>
                  </div>
                </div>
              </div>
            </div>
          </SettingsCard>
          
          <SettingsCard
            title="Library Scan"
            description="Scan your libraries for new content"
            footer={
              <div className="flex gap-2">
                <Button className="bg-cosmic-pink hover:bg-cosmic-pink-dark text-white">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Scan Library Now
                </Button>
              </div>
            }
          >
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="scan-interval">Auto-Scan Interval (minutes)</Label>
                  <Input
                    id="scan-interval"
                    type="number"
                    defaultValue="60"
                    className="bg-cosmic/50 border-cosmic-pink/20 focus-visible:ring-cosmic-pink"
                  />
                  <p className="text-xs text-muted-foreground">0 = disabled</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="last-scan">Last Scan</Label>
                  <Input
                    id="last-scan"
                    defaultValue="Today, 14:32"
                    disabled
                    className="bg-cosmic/50 border-cosmic-pink/20 opacity-70"
                  />
                </div>
              </div>
            </div>
          </SettingsCard>
        </TabsContent>
        
        <TabsContent value="advanced" className="mt-6 space-y-6">
          <SettingsCard
            title="Database Management"
            description="Manage your MobieTheater database"
            footer={
              <div className="flex gap-2">
                <Button variant="outline">
                  <Database className="h-4 w-4 mr-2" />
                  Backup Database
                </Button>
                <Button variant="destructive">
                  <Trash className="h-4 w-4 mr-2" />
                  Reset Database
                </Button>
              </div>
            }
          >
            <div className="space-y-4">
              <div className="rounded-md border border-cosmic-pink/20 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Database Size</p>
                    <p className="text-sm text-muted-foreground">120 MB</p>
                  </div>
                  <Button variant="outline" size="sm">Optimize</Button>
                </div>
              </div>
            </div>
          </SettingsCard>
          
          <SettingsCard
            title="System Information"
            description="View system information"
          >
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Version</p>
                  <p>MobieTheater v1.0.0</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Environment</p>
                  <p>Production</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Server Uptime</p>
                  <p>3 days, 5 hours</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">OS</p>
                  <p>Linux 5.15.0</p>
                </div>
              </div>
            </div>
          </SettingsCard>
          
          <SettingsCard
            title="Danger Zone"
            description="These actions can't be undone"
            footer={
              <div className="flex gap-2">
                <Button variant="destructive">
                  <Trash className="h-4 w-4 mr-2" />
                  Reset All Settings
                </Button>
                <Button variant="destructive">
                  <Trash className="h-4 w-4 mr-2" />
                  Delete All Data
                </Button>
              </div>
            }
          >
            <div className="rounded-md border border-destructive/50 bg-destructive/10 p-4">
              <p className="text-sm text-muted-foreground">
                These actions will permanently delete your data and cannot be undone. Please be certain.
              </p>
            </div>
          </SettingsCard>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
