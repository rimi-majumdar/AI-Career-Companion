import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileText, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ResumeUploadProps {
  onComplete: (resumeData: any) => void;
}

export const ResumeUpload = ({ onComplete }: ResumeUploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleFileUpload = async (file: File) => {
    if (!file) return;
    
    if (!file.type.includes('pdf') && !file.type.includes('word') && !file.type.includes('docx')) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF or Word document",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    setUploadedFile(file);

    // Simulate resume parsing
    setTimeout(() => {
      const mockResumeData = {
        fileName: file.name,
        skills: ["React", "TypeScript", "Node.js", "Python", "Machine Learning"],
        experience: "3+ years",
        education: "Bachelor's in Computer Science",
        jobTitles: ["Software Developer", "Frontend Engineer"]
      };
      
      setIsUploading(false);
      onComplete(mockResumeData);
      
      toast({
        title: "Resume processed successfully!",
        description: "Your skills and experience have been analyzed.",
      });
    }, 2000);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  return (
    <Card className="shadow-medium">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5 text-primary" />
          Upload Your Resume
        </CardTitle>
        <CardDescription>
          Upload your resume to get AI-powered career insights and recommendations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragOver 
              ? "border-primary bg-primary/5" 
              : "border-border hover:border-primary/50"
          }`}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
        >
          {isUploading ? (
            <div className="space-y-4">
              <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto" />
              <p className="text-muted-foreground">Processing your resume...</p>
            </div>
          ) : uploadedFile ? (
            <div className="space-y-4">
              <CheckCircle className="w-12 h-12 text-success mx-auto" />
              <div>
                <p className="font-medium text-foreground">{uploadedFile.name}</p>
                <p className="text-sm text-muted-foreground">Resume processed successfully</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto" />
              <div>
                <p className="font-medium">Drop your resume here, or click to browse</p>
                <p className="text-sm text-muted-foreground">Supports PDF and Word documents</p>
              </div>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
                id="resume-upload"
              />
              <Button 
                variant="outline" 
                onClick={() => document.getElementById('resume-upload')?.click()}
              >
                Choose File
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};