
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, MessageCircle, Share } from "lucide-react";
import { Post as PostType } from "@/types";
import { formatRelativeTime } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface PostProps {
  post: PostType;
}

export function Post({ post }: PostProps) {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imageRef.current && imageRef.current.complete) {
      setImageLoaded(true);
    }
  }, []);

  const handleLike = () => {
    if (liked) {
      setLikesCount((prev) => prev - 1);
    } else {
      setLikesCount((prev) => prev + 1);
      toast("Post liked!", {
        description: "You've liked this post",
        position: "bottom-center"
      });
    }
    setLiked(!liked);
  };

  const handleShare = () => {
    toast("Share feature", {
      description: "This feature is coming soon",
      position: "bottom-center"
    });
  };

  return (
    <article className="rounded-lg overflow-hidden border mb-6 animate-fade-up">
      {/* Post header */}
      <div className="p-4 flex items-center justify-between">
        <div 
          className="flex items-center gap-3 cursor-pointer" 
          onClick={() => navigate(`/profile/${post.user.username}`)}
        >
          <div className="h-10 w-10 rounded-full overflow-hidden">
            <img 
              src={post.user.avatarUrl} 
              alt={post.user.displayName} 
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-medium text-sm">{post.user.displayName}</h3>
            <p className="text-xs text-muted-foreground">@{post.user.username}</p>
          </div>
        </div>
        <span className="text-xs text-muted-foreground">
          {formatRelativeTime(new Date(post.createdAt))}
        </span>
      </div>
      
      {/* Post image */}
      <div 
        className={cn(
          "relative aspect-square w-full overflow-hidden",
          !imageLoaded && "img-loading"
        )}
      >
        <img
          ref={imageRef}
          src={post.imageUrl}
          alt={post.caption || "Post image"}
          className={cn(
            "h-full w-full object-cover transition-opacity duration-500",
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setImageLoaded(true)}
        />
      </div>
      
      {/* Actions */}
      <div className="p-4 flex items-center gap-4">
        <button 
          onClick={handleLike}
          className="flex items-center gap-1 text-sm transition-transform active:scale-95"
        >
          <Heart className={cn(
            "h-6 w-6",
            liked ? "fill-red-500 text-red-500" : "text-muted-foreground"
          )} />
          <span className="text-muted-foreground">{likesCount}</span>
        </button>
        
        <button 
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-1 text-sm transition-transform active:scale-95"
        >
          <MessageCircle className="h-6 w-6 text-muted-foreground" />
          <span className="text-muted-foreground">{post.comments.length}</span>
        </button>
        
        <button 
          onClick={handleShare}
          className="ml-auto flex items-center gap-1 text-sm transition-transform active:scale-95"
        >
          <Share className="h-6 w-6 text-muted-foreground" />
        </button>
      </div>
      
      {/* Caption */}
      {post.caption && (
        <div className="px-4 pb-2">
          <p className="text-sm text-balance">
            <span className="font-semibold mr-2">{post.user.displayName}</span>
            {post.caption}
          </p>
        </div>
      )}
      
      {/* Comments */}
      {showComments && post.comments.length > 0 && (
        <div className="border-t p-4 space-y-3">
          <h4 className="text-sm font-semibold">Comments</h4>
          
          {post.comments.map((comment) => (
            <div key={comment.id} className="flex items-start gap-3">
              <div 
                className="h-8 w-8 rounded-full overflow-hidden flex-shrink-0 cursor-pointer"
                onClick={() => navigate(`/profile/${comment.user.username}`)}
              >
                <img 
                  src={comment.user.avatarUrl} 
                  alt={comment.user.displayName}
                  className="h-full w-full object-cover" 
                />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center">
                  <h5 className="text-sm font-medium">{comment.user.displayName}</h5>
                  <span className="text-xs text-muted-foreground ml-2">
                    {formatRelativeTime(new Date(comment.createdAt))}
                  </span>
                </div>
                <p className="text-sm">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Add comment (placeholder) */}
      {showComments && (
        <div className="border-t p-4 flex items-center gap-3">
          <div className="h-8 w-8 rounded-full overflow-hidden flex-shrink-0">
            <img 
              src={post.user.avatarUrl} 
              alt={post.user.displayName}
              className="h-full w-full object-cover" 
            />
          </div>
          <input 
            type="text" 
            placeholder="Add a comment..." 
            className="flex-1 bg-transparent text-sm border-none focus:outline-none"
          />
          <button className="text-primary text-sm font-semibold">Post</button>
        </div>
      )}
    </article>
  );
}

export default Post;
