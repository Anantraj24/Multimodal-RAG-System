import { useState } from "react";
import { Upload, FileText, Image as ImageIcon, Mic, X, CheckCircle } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";

interface UploadedFile {
  id: string;
  name: string;
  type: string;
  size: string;
  status: "uploading" | "processing" | "complete";
  progress: number;
}

interface UploadZoneProps {
  onClose: () => void;
}

export function UploadZone({ onClose }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // Mock file upload
    addMockFiles();
  };

  const addMockFiles = () => {
    const mockFiles: UploadedFile[] = [
      {
        id: "1",
        name: "Project_Report_2024.pdf",
        type: "pdf",
        size: "2.4 MB",
        status: "uploading",
        progress: 0,
      },
      {
        id: "2",
        name: "Screenshot_Evidence.png",
        type: "image",
        size: "876 KB",
        status: "uploading",
        progress: 0,
      },
      {
        id: "3",
        name: "Meeting_Recording.mp3",
        type: "audio",
        size: "5.2 MB",
        status: "uploading",
        progress: 0,
      },
    ];

    setFiles(mockFiles);

    // Simulate upload progress
    mockFiles.forEach((file, idx) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setFiles((prev) =>
          prev.map((f) =>
            f.id === file.id
              ? {
                  ...f,
                  progress,
                  status: progress === 50 ? "processing" : progress === 100 ? "complete" : "uploading",
                }
              : f
          )
        );
        if (progress >= 100) clearInterval(interval);
      }, 200 + idx * 100);
    });
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FileText className="w-8 h-8 text-red-500" />;
      case "image":
        return <ImageIcon className="w-8 h-8 text-purple-500" />;
      case "audio":
        return <Mic className="w-8 h-8 text-green-500" />;
      default:
        return <FileText className="w-8 h-8 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "uploading":
        return "Uploading...";
      case "processing":
        return "Processing & Indexing...";
      case "complete":
        return "Complete";
      default:
        return "";
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-auto">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h3>Upload Files</h3>
              <p className="text-sm text-muted-foreground">
                Drag and drop files or click to browse
              </p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Drop Zone */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
              isDragging
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50"
            }`}
          >
            <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p>Drag and drop files here</p>
            <p className="text-sm text-muted-foreground mt-2">
              Supports PDF, DOCX, Images (PNG, JPG), and Audio (MP3, WAV)
            </p>
            <Button onClick={addMockFiles} className="mt-4">
              Browse Files
            </Button>
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="space-y-3">
              <h4>Uploading Files</h4>
              {files.map((file) => (
                <Card key={file.id} className="p-4">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">{getFileIcon(file.type)}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <p className="truncate">{file.name}</p>
                        {file.status === "complete" && (
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {file.size} • {getStatusText(file.status)}
                      </p>
                      <Progress value={file.progress} className="h-2" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Actions */}
          {files.length > 0 && files.every((f) => f.status === "complete") && (
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={onClose}>Done</Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
