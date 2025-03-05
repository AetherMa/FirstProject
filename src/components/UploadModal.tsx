
import { useState, useRef } from "react";
import { Upload, X, Image } from "lucide-react";
import { cn } from "@/lib/utils";
import { currentUser } from "@/lib/data";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export function UploadModal() {
  const navigate = useNavigate();
  const [dragActive, setDragActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files[0]);
    }
  };

  const handleFiles = (file: File) => {
    // Check if file is an image
    if (!file.type.match("image.*")) {
      toast.error("Please select an image file");
      return;
    }
    
    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }
    
    // Create and set image preview
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedImage) {
      toast.error("Please select an image to upload");
      return;
    }
    
    // Simulate upload success
    toast.success("Image uploaded successfully!");
    navigate("/");
  };

  return (
    <div className="container max-w-2xl mx-auto p-4 pt-24 md:pt-28">
      <h1 className="text-2xl font-bold mb-6 text-center">Create New Post</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {!selectedImage ? (
          <div 
            className={cn(
              "rounded-lg border-2 border-dashed p-12 text-center transition-colors",
              dragActive ? "border-primary bg-primary/5" : "border-muted"
            )}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="rounded-full bg-muted/30 p-4">
                <Image className="h-8 w-8 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Drag photo here</h3>
                <p className="text-sm text-muted-foreground">
                  JPG, PNG, GIF files are allowed. Max size 5MB.
                </p>
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="rounded-full bg-primary px-4 py-2 text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Select from computer
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-lg">
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="absolute right-2 top-2 rounded-full bg-black/50 p-1 text-white"
              >
                <X className="h-5 w-5" />
              </button>
              <img
                src={selectedImage}
                alt="Preview"
                className="h-auto w-full max-h-[70vh] object-contain"
              />
            </div>
            
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-full overflow-hidden flex-shrink-0">
                <img 
                  src={currentUser.avatarUrl} 
                  alt={currentUser.displayName}
                  className="h-full w-full object-cover" 
                />
              </div>
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Write a caption..."
                className="flex-1 resize-none bg-transparent placeholder:text-muted-foreground focus:outline-none min-h-[100px]"
              />
            </div>
          </div>
        )}
        
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={!selectedImage}
            className="flex items-center gap-2 rounded-full bg-primary px-6 py-2 text-primary-foreground transition-transform hover:bg-primary/90 active:scale-95 disabled:opacity-50"
          >
            <Upload className="h-4 w-4" />
            <span>Upload</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default UploadModal;
