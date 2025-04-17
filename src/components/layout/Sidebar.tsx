
import { cn } from "@/lib/utils";
import { 
  FilmIcon, 
  HomeIcon, 
  DownloadIcon, 
  SearchIcon, 
  SettingsIcon, 
  MenuIcon, 
  XIcon,
  HeartIcon,
  ListIcon,
  ClockIcon
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const menuItems = [
    { path: "/", label: "Dashboard", icon: HomeIcon },
    { path: "/movies", label: "Movies", icon: FilmIcon },
    { path: "/downloads", label: "Downloads", icon: DownloadIcon },
    { path: "/discover", label: "Discover", icon: SearchIcon },
    { path: "/watchlist", label: "Watchlist", icon: HeartIcon },
    { path: "/requests", label: "Requests", icon: ListIcon },
    { path: "/recent", label: "Recent", icon: ClockIcon },
    { path: "/settings", label: "Settings", icon: SettingsIcon },
  ];
  
  return (
    <div className={cn(
      "h-screen transition-all duration-300 border-r border-cosmic-pink/10 bg-sidebar shadow-lg",
      collapsed ? "w-16" : "w-60"
    )}>
      <div className="flex flex-col h-full overflow-hidden">
        <div className="flex items-center p-4 h-16 border-b border-cosmic-pink/10">
          {!collapsed && (
            <h1 className="text-lg font-orbitron font-bold text-cosmic-pink truncate">
              MobieTheater
            </h1>
          )}
          <button 
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 ml-auto rounded-md hover:bg-cosmic-pink/10 text-cosmic-pink"
          >
            {collapsed ? <MenuIcon size={18} /> : <XIcon size={18} />}
          </button>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center h-10 px-3 py-2 rounded-md transition-colors",
                    isActive(item.path)
                      ? "bg-cosmic-pink text-white shadow-md shadow-cosmic-pink/20"
                      : "text-foreground hover:bg-cosmic-pink/10"
                  )}
                >
                  <item.icon size={20} className={cn(
                    "flex-shrink-0",
                    isActive(item.path) ? "" : "text-cosmic-pink"
                  )} />
                  {!collapsed && (
                    <span className="ml-3 truncate">{item.label}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-cosmic-pink/10">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-cosmic-pink flex items-center justify-center text-white">
              <span className="font-medium text-sm">MT</span>
            </div>
            {!collapsed && (
              <div className="ml-3">
                <p className="text-sm font-medium">MobieTheater</p>
                <p className="text-xs text-muted-foreground">v1.0.0</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
