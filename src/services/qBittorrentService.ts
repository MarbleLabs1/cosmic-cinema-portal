
import { toast } from "sonner";

// This would store the qBittorrent connection details
interface QBittorrentConfig {
  host: string;
  port: number;
  username: string;
  password: string;
}

// Types for torrent data from qBittorrent API
interface Torrent {
  hash: string;
  name: string;
  size: number;
  progress: number;
  dlspeed: number; // bytes per second
  eta: number; // seconds
  state: string;
  save_path: string;
  content_path: string;
  category: string;
}

class QBittorrentService {
  private config: QBittorrentConfig;
  private isLoggedIn: boolean = false;
  
  constructor() {
    // Load config from localStorage or use defaults
    const savedConfig = localStorage.getItem('qbittorrentConfig');
    
    this.config = savedConfig 
      ? JSON.parse(savedConfig) 
      : {
          host: 'http://localhost',
          port: 8080,
          username: 'admin',
          password: 'adminadmin'
        };
  }
  
  // Save config to localStorage
  saveConfig(config: QBittorrentConfig): void {
    this.config = config;
    localStorage.setItem('qbittorrentConfig', JSON.stringify(config));
  }
  
  // Get the current config
  getConfig(): QBittorrentConfig {
    return { ...this.config };
  }
  
  // Build the API URL
  private getApiUrl(endpoint: string): string {
    return `${this.config.host}:${this.config.port}/api/v2/${endpoint}`;
  }
  
  // Login to qBittorrent Web API
  async login(): Promise<boolean> {
    try {
      const formData = new FormData();
      formData.append('username', this.config.username);
      formData.append('password', this.config.password);
      
      const response = await fetch(this.getApiUrl('auth/login'), {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });
      
      if (response.ok) {
        this.isLoggedIn = true;
        return true;
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('qBittorrent login error:', error);
      this.isLoggedIn = false;
      return false;
    }
  }
  
  // Test the connection
  async testConnection(): Promise<boolean> {
    try {
      const success = await this.login();
      if (success) {
        toast.success("Successfully connected to qBittorrent");
      } else {
        toast.error("Failed to connect to qBittorrent");
      }
      return success;
    } catch (error) {
      console.error('Connection test error:', error);
      toast.error("Error connecting to qBittorrent");
      return false;
    }
  }
  
  // Get list of torrents
  async getTorrents(): Promise<Torrent[]> {
    try {
      if (!this.isLoggedIn) {
        const loginSuccess = await this.login();
        if (!loginSuccess) {
          throw new Error('Not logged in');
        }
      }
      
      const response = await fetch(this.getApiUrl('torrents/info'), {
        credentials: 'include',
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch torrents');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching torrents:', error);
      return [];
    }
  }
  
  // Get torrent files
  async getTorrentFiles(hash: string): Promise<any[]> {
    try {
      if (!this.isLoggedIn) {
        const loginSuccess = await this.login();
        if (!loginSuccess) {
          throw new Error('Not logged in');
        }
      }
      
      const response = await fetch(
        this.getApiUrl(`torrents/files?hash=${hash}`), 
        { credentials: 'include' }
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch torrent files');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching torrent files:', error);
      return [];
    }
  }
  
  // Auto-discover media files in qBittorrent downloads
  async discoverMedia(): Promise<{movies: string[], tvShows: string[]}> {
    const torrents = await this.getTorrents();
    const completedTorrents = torrents.filter(t => 
      t.progress === 1 && 
      ['completed', 'seeding'].includes(t.state)
    );
    
    const movies: string[] = [];
    const tvShows: string[] = [];
    
    // In a real implementation, this would analyze the file paths and metadata
    // to determine if they are movies or TV shows
    for (const torrent of completedTorrents) {
      const files = await this.getTorrentFiles(torrent.hash);
      
      // Simple detection by file extension and path for demo purposes
      const videoFiles = files.filter((file: any) => {
        const name = file.name.toLowerCase();
        return name.endsWith('.mp4') || 
               name.endsWith('.mkv') || 
               name.endsWith('.avi');
      });
      
      if (videoFiles.length > 0) {
        if (torrent.name.includes('S0') || torrent.name.includes('Season')) {
          tvShows.push(torrent.name);
        } else {
          movies.push(torrent.name);
        }
      }
    }
    
    return { movies, tvShows };
  }
  
  // Add a new torrent
  async addTorrent(torrentUrl: string, category: string = 'movies'): Promise<boolean> {
    try {
      if (!this.isLoggedIn) {
        const loginSuccess = await this.login();
        if (!loginSuccess) {
          throw new Error('Not logged in');
        }
      }
      
      const formData = new FormData();
      formData.append('urls', torrentUrl);
      formData.append('category', category);
      
      const response = await fetch(this.getApiUrl('torrents/add'), {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });
      
      if (response.ok) {
        toast.success("Torrent added successfully");
        return true;
      } else {
        throw new Error('Failed to add torrent');
      }
    } catch (error) {
      console.error('Error adding torrent:', error);
      toast.error("Failed to add torrent");
      return false;
    }
  }
}

// Create a singleton instance
const qBittorrentService = new QBittorrentService();

export default qBittorrentService;
