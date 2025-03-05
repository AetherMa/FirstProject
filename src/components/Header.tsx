
import { useNavigate, useLocation } from "react-router-dom";
import { Home, User, PlusSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { currentUser } from "@/lib/data";

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed bottom-0 left-0 right-0 z-50 md:top-0 md:bottom-auto border-t md:border-b md:border-t-0 glass">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="md:flex-1 hidden md:block">
          <div className="font-semibold text-xl">PixShare</div>
        </div>
        
        <nav className="flex items-center justify-around w-full md:w-auto md:gap-6">
          <button
            onClick={() => navigate("/")}
            className={cn(
              "flex flex-col items-center justify-center md:flex-row md:gap-2 transition-colors",
              isActive("/") 
                ? "text-primary" 
                : "text-muted-foreground hover:text-primary"
            )}
          >
            <Home className="h-6 w-6 md:h-5 md:w-5" />
            <span className="text-xs md:text-sm">Home</span>
          </button>
          
          <button
            onClick={() => navigate("/upload")}
            className={cn(
              "flex flex-col items-center justify-center md:flex-row md:gap-2 transition-colors",
              isActive("/upload") 
                ? "text-primary" 
                : "text-muted-foreground hover:text-primary"
            )}
          >
            <PlusSquare className="h-6 w-6 md:h-5 md:w-5" />
            <span className="text-xs md:text-sm">Upload</span>
          </button>
          
          <button
            onClick={() => navigate(`/profile/${currentUser.username}`)}
            className={cn(
              "flex flex-col items-center justify-center md:flex-row md:gap-2 transition-colors",
              isActive(`/profile/${currentUser.username}`) 
                ? "text-primary" 
                : "text-muted-foreground hover:text-primary"
            )}
          >
            <User className="h-6 w-6 md:h-5 md:w-5" />
            <span className="text-xs md:text-sm">Profile</span>
          </button>
        </nav>
        
        <div className="md:flex-1 flex justify-end hidden md:block">
          <button 
            onClick={() => navigate(`/profile/${currentUser.username}`)}
            className="relative h-8 w-8 overflow-hidden rounded-full ring-2 ring-offset-2 ring-offset-background ring-primary/20"
          >
            <img 
              src={currentUser.avatarUrl} 
              alt={currentUser.displayName} 
              className="h-full w-full object-cover"
            />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
