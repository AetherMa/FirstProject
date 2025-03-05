
import Header from "@/components/Header";
import UploadModal from "@/components/UploadModal";

const Upload = () => {
  return (
    <div className="min-h-screen pb-20 md:pb-0 md:pt-16">
      <Header />
      <main>
        <UploadModal />
      </main>
    </div>
  );
};

export default Upload;
