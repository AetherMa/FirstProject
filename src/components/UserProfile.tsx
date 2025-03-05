
import { useState, useEffect } from "react";
import { users, posts as allPosts } from "@/lib/data";
import { Post as PostType, User } from "@/types";
import { useParams, useNavigate } from "react-router-dom";
import { Grid, List, Settings, ArrowLeft } from "lucide-react";
import Post from "./Post";
import { toast } from "sonner";

export function UserProfile() {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    // Simulate API call to fetch user profile and posts
    const timer = setTimeout(() => {
      const foundUser = users.find(u => u.username === username);
      
      if (foundUser) {
        setUser(foundUser);
        const userPosts = allPosts.filter(post => post.user.id === foundUser.id);
        setPosts(userPosts);
      }
      
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [username]);
  
  const handleFollowToggle = () => {
    setFollowing(!following);
    
    toast(following ? "Unfollowed" : "Following", {
      description: following ? `You unfollowed @${user?.username}` : `You are now following @${user?.username}`,
      position: "bottom-center"
    });
  };
  
  if (loading) {
    return (
      <div className="container max-w-4xl mx-auto p-4 pt-24 md:pt-28 animate-pulse">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="h-24 w-24 md:h-32 md:w-32 rounded-full bg-muted"></div>
          <div className="flex-1 space-y-4 text-center md:text-left">
            <div className="h-8 w-48 bg-muted rounded mx-auto md:mx-0"></div>
            <div className="h-4 w-72 bg-muted rounded mx-auto md:mx-0"></div>
            <div className="flex justify-center md:justify-start gap-4">
              <div className="h-4 w-24 bg-muted rounded"></div>
              <div className="h-4 w-24 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return (
      <div className="container max-w-4xl mx-auto p-4 pt-24 md:pt-28 text-center">
        <h1 className="text-2xl font-bold mb-4">User not found</h1>
        <p className="text-muted-foreground mb-6">This user does not exist or may have been removed.</p>
        <button
          onClick={() => navigate("/")}
          className="rounded-full bg-primary px-6 py-2 text-primary-foreground"
        >
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="container max-w-4xl mx-auto p-4 pt-24 md:pt-28 animate-fade-in">
      {/* Mobile back button */}
      <button 
        onClick={() => navigate(-1)} 
        className="mb-4 flex items-center text-sm md:hidden"
      >
        <ArrowLeft className="h-4 w-4 mr-1" /> Back
      </button>
      
      {/* Profile header */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-10">
        <div className="h-24 w-24 md:h-32 md:w-32 rounded-full overflow-hidden">
          <img 
            src={user.avatarUrl} 
            alt={user.displayName}
            className="h-full w-full object-cover" 
          />
        </div>
        
        <div className="flex-1 space-y-4 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <h1 className="text-2xl font-bold">{user.displayName}</h1>
            <div className="flex justify-center md:justify-start gap-2">
              <button 
                onClick={handleFollowToggle}
                className={`px-4 py-1 text-sm font-medium rounded-full transition-colors ${
                  following 
                    ? "bg-muted text-foreground" 
                    : "bg-primary text-primary-foreground"
                }`}
              >
                {following ? "Following" : "Follow"}
              </button>
              
              <button className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
                <Settings className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <p className="text-muted-foreground">@{user.username}</p>
          
          {user.bio && <p>{user.bio}</p>}
          
          <div className="flex justify-center md:justify-start gap-6 text-sm">
            <div>
              <span className="font-semibold">{posts.length}</span> posts
            </div>
            <div>
              <span className="font-semibold">{user.followers}</span> followers
            </div>
            <div>
              <span className="font-semibold">{user.following}</span> following
            </div>
          </div>
        </div>
      </div>
      
      {/* Posts navigation */}
      <div className="border-t mb-6">
        <div className="flex justify-center md:justify-start gap-4 -mt-px">
          <button 
            onClick={() => setViewMode("grid")}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
              viewMode === "grid" 
                ? "border-t-2 border-foreground text-foreground" 
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Grid className="h-4 w-4" />
            <span>Posts</span>
          </button>
          
          <button
            onClick={() => setViewMode("list")}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors ${
              viewMode === "list" 
                ? "border-t-2 border-foreground text-foreground" 
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <List className="h-4 w-4" />
            <span>Feed</span>
          </button>
        </div>
      </div>
      
      {/* Posts */}
      {posts.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold mb-2">No Posts Yet</h2>
          <p className="text-muted-foreground mb-6">
            When {user.displayName} shares photos, you'll see them here.
          </p>
          {username === users[0].username && (
            <button
              onClick={() => navigate("/upload")}
              className="rounded-full bg-primary px-6 py-2 text-primary-foreground"
            >
              Share your first photo
            </button>
          )}
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-3 gap-1 md:gap-4">
          {posts.map((post) => (
            <div 
              key={post.id} 
              className="aspect-square overflow-hidden relative group"
              onClick={() => setViewMode("list")}
            >
              <img 
                src={post.imageUrl} 
                alt={post.caption || "Post"} 
                className="h-full w-full object-cover cursor-pointer transition-transform group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="flex items-center gap-3 text-white">
                  <div className="flex items-center gap-1">
                    <Heart className="h-4 w-4 fill-white" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    <span>{post.comments.length}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}

export default UserProfile;
