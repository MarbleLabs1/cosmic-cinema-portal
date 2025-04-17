import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="relative">
          <div className="text-9xl font-orbitron font-bold text-cosmic-pink opacity-20">404</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-5xl font-orbitron font-bold">
              <span className="text-cosmic-pink">Lost</span> in Space
            </div>
          </div>
        </div>
        
        <p className="text-xl text-muted-foreground mb-6">
          The cosmic coordinates you're looking for don't exist
        </p>
        
        <Button className="cosmic-gradient" asChild>
          <Link to="/">
            <Home className="mr-2 h-4 w-4" />
            Return to Dashboard
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
