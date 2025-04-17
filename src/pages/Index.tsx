import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to dashboard
    navigate("/");
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 font-orbitron">
          <span className="text-cosmic-pink">Mobie</span>Theater
        </h1>
        <p className="text-xl text-muted-foreground">Loading your cosmic experience...</p>
      </div>
    </div>
  );
};

export default Index;
