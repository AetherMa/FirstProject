
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { Comment as CommentType } from "@/types";
import { formatRelativeTime } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { currentUser } from "@/lib/data";
import { toast } from "sonner";

interface CommentSectionProps {
  comments: CommentType[];
  postId: string;
}

export function CommentSection({ comments, postId }: CommentSectionProps) {
  const navigate = useNavigate();
  const [commentText, setCommentText] = useState("");
  const [localComments, setLocalComments] = useState<CommentType[]>(comments);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!commentText.trim()) return;
    
    // Create a new comment
    const newComment: CommentType = {
      id: `new-${Date.now()}`,
      content: commentText,
      createdAt: new Date().toISOString(),
      user: currentUser,
      likes: 0
    };
    
    setLocalComments([newComment, ...localComments]);
    setCommentText("");
    
    toast("Comment added", {
      description: "Your comment has been added",
      position: "bottom-center"
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        {localComments.length === 0 ? (
          <p className="text-center text-muted-foreground text-sm py-4">No comments yet. Be the first to comment!</p>
        ) : (
          localComments.map((comment) => (
            <div key={comment.id} className="flex gap-3 animate-fade-up">
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
              
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <h5 
                    className="text-sm font-medium cursor-pointer hover:underline"
                    onClick={() => navigate(`/profile/${comment.user.username}`)}
                  >
                    {comment.user.displayName}
                  </h5>
                  <span className="text-xs text-muted-foreground">
                    {formatRelativeTime(new Date(comment.createdAt))}
                  </span>
                </div>
                <p className="text-sm">{comment.content}</p>
                <div className="flex items-center gap-2">
                  <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                    <Heart className="h-3 w-3 inline mr-1" />
                    {comment.likes} likes
                  </button>
                  <button className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                    Reply
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      
      <form onSubmit={handleSubmitComment} className="flex items-center gap-3 pt-2">
        <div className="h-8 w-8 rounded-full overflow-hidden flex-shrink-0">
          <img 
            src={currentUser.avatarUrl} 
            alt={currentUser.displayName}
            className="h-full w-full object-cover" 
          />
        </div>
        <input 
          type="text" 
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment..." 
          className="flex-1 bg-transparent text-sm border-none focus:outline-none"
        />
        <button 
          type="submit"
          disabled={!commentText.trim()}
          className="text-primary text-sm font-semibold disabled:opacity-50"
        >
          Post
        </button>
      </form>
    </div>
  );
}

export default CommentSection;
