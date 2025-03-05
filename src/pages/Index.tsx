
import Header from "@/components/Header";
import PostList from "@/components/PostList";

const Index = () => {
  return (
    <div className="min-h-screen pb-20 md:pb-0 md:pt-16">
      <Header />
      <main className="container max-w-xl mx-auto px-4">
        <PostList />
      </main>
    </div>
  );
};

export default Index;
