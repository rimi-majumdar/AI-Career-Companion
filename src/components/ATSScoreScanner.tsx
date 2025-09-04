import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, CheckCircle, AlertCircle, XCircle } from "lucide-react";

interface ATSAnalysis {
  score: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  keywords: { found: string[]; missing: string[] };
}

export const ATSScoreScanner = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<ATSAnalysis | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile && uploadedFile.type === 'application/pdf') {
      setFile(uploadedFile);
      analyzeResume();
    }
  };

  const analyzeResume = () => {
    setIsAnalyzing(true);
    // Simulate ATS analysis
    setTimeout(() => {
      setAnalysis({
        score: 75,
        strengths: [
          "Clear contact information",
          "Relevant work experience",
          "Technical skills section",
          "Education details present"
        ],
        weaknesses: [
          "Missing keywords for target role",
          "No quantified achievements",
          "Generic objective statement",
          "Inconsistent formatting"
        ],
        suggestions: [
          "Add more industry-specific keywords",
          "Include metrics and numbers in achievements",
          "Use bullet points consistently",
          "Add a professional summary",
          "Include relevant certifications"
        ],
        keywords: {
          found: ["React", "JavaScript", "Python", "Git"],
          missing: ["TypeScript", "AWS", "Docker", "Kubernetes", "GraphQL"]
        }
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getScoreIcon = (score: number) => {
    if (score >= 80) return CheckCircle;
    if (score >= 60) return AlertCircle;
    return XCircle;
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-soft border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            ATS Score Scanner
          </CardTitle>
          <CardDescription>
            Analyze your resume's compatibility with Applicant Tracking Systems
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!file ? (
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Upload Your Resume</h3>
                <p className="text-muted-foreground">
                  Upload a PDF file to get your ATS compatibility score
                </p>
              </div>
              <label htmlFor="resume-upload" className="mt-4 inline-block">
                <Button variant="gradient" asChild>
                  <span className="cursor-pointer">
                    Choose File
                  </span>
                </Button>
                <input
                  id="resume-upload"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <FileText className="h-8 w-8 text-primary" />
                <div>
                  <p className="font-medium">{file.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>

              {isAnalyzing && (
                <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-sm font-medium">Analyzing resume...</span>
                  </div>
                  <Progress value={66} className="h-2" />
                </div>
              )}

              {analysis && !isAnalyzing && (
                <div className="space-y-6">
                  {/* ATS Score */}
                  <Card className="shadow-medium">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">ATS Compatibility Score</h3>
                        <div className="flex items-center gap-2">
                          {(() => {
                            const Icon = getScoreIcon(analysis.score);
                            return <Icon className={`h-5 w-5 ${getScoreColor(analysis.score)}`} />;
                          })()}
                          <span className={`text-2xl font-bold ${getScoreColor(analysis.score)}`}>
                            {analysis.score}%
                          </span>
                        </div>
                      </div>
                      <Progress value={analysis.score} className="h-3" />
                      <p className="text-sm text-muted-foreground mt-2">
                        {analysis.score >= 80 ? "Excellent ATS compatibility" :
                         analysis.score >= 60 ? "Good ATS compatibility with room for improvement" :
                         "Needs significant improvements for ATS compatibility"}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Keywords Analysis */}
                  <Card className="shadow-medium">
                    <CardHeader>
                      <CardTitle className="text-lg">Keywords Analysis</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-success mb-2">Found Keywords</h4>
                        <div className="flex flex-wrap gap-1">
                          {analysis.keywords.found.map((keyword, i) => (
                            <Badge key={i} variant="secondary" className="bg-success/10 text-success">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-destructive mb-2">Missing Keywords</h4>
                        <div className="flex flex-wrap gap-1">
                          {analysis.keywords.missing.map((keyword, i) => (
                            <Badge key={i} variant="outline" className="border-destructive/50 text-destructive">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Strengths & Weaknesses */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="shadow-medium">
                      <CardHeader>
                        <CardTitle className="text-lg text-success">Strengths</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {analysis.strengths.map((strength, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                              {strength}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="shadow-medium">
                      <CardHeader>
                        <CardTitle className="text-lg text-destructive">Areas to Improve</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {analysis.weaknesses.map((weakness, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <XCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                              {weakness}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Suggestions */}
                  <Card className="shadow-medium">
                    <CardHeader>
                      <CardTitle className="text-lg">Improvement Suggestions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {analysis.suggestions.map((suggestion, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm">
                            <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setFile(null);
                      setAnalysis(null);
                    }}
                    className="w-full"
                  >
                    Analyze Another Resume
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};