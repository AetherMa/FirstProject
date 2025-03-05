
import { useState, useEffect } from "react";
import Post from "./Post";
import { posts as mockPosts } from "@/lib/data";
import { Post as PostType } from "@/types";

export function PostList() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data from an API
    const timer = setTimeout(() => {
      setPosts(mockPosts);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 py-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-lg border animate-pulse">
            <div className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-muted"></div>
              <div className="space-y-2">
                <div className="h-4 w-24 bg-muted rounded"></div>
                <div className="h-3 w-16 bg-muted rounded"></div>
              </div>
            </div>
            <div className="aspect-square w-full bg-muted"></div>
            <div className="p-4">
              <div className="h-4 w-full bg-muted rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4 py-4">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
}

export default PostList;
