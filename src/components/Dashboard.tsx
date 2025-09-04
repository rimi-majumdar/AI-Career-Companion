import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResumeUpload } from "./ResumeUpload";
import { ProfileEntry } from "./ProfileEntry";
import { CareerSuggestions } from "./CareerSuggestions";
import { JobMatching } from "./JobMatching";
import { ATSScoreScanner } from "./ATSScoreScanner";
import { FieldInterestSelector } from "./FieldInterestSelector";
import { 
  User, 
  BrainCircuit, 
  Target, 
  Briefcase, 
  TrendingUp,
  Award,
  BookOpen,
  Star 
} from "lucide-react";

interface UserData {
  profile?: any;
  resume?: any;
  skills: string[];
}

export const Dashboard = () => {
  const [userData, setUserData] = useState<UserData>({ skills: [] });
  const [activeTab, setActiveTab] = useState("upload");
  const [selectedCareerPath, setSelectedCareerPath] = useState<any>(null);

  const handleResumeComplete = (resumeData: any) => {
    setUserData(prev => ({
      ...prev,
      resume: resumeData,
      skills: [...new Set([...prev.skills, ...resumeData.skills])]
    }));
    setActiveTab("suggestions");
  };

  const handleProfileComplete = (profileData: any) => {
    setUserData(prev => ({
      ...prev,
      profile: profileData,
      skills: [...new Set([...prev.skills, ...profileData.skills])]
    }));
    setActiveTab("suggestions");
  };

  const handleSelectCareerPath = (path: any) => {
    setSelectedCareerPath(path);
    setActiveTab("jobs");
  };

  const hasData = userData.profile || userData.resume;
  const allSkills = userData.skills;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <BrainCircuit className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">AI Career Companion</h1>
                <p className="text-sm text-muted-foreground">Your intelligent career advisor</p>
              </div>
            </div>
            {hasData && (
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">
                  {userData.profile?.name || "Professional"}
                </span>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {!hasData ? (
          /* Onboarding Flow */
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Welcome to Your Career Journey
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Get AI-powered career insights, personalized job recommendations, and skill gap analysis
              </p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="upload" className="flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  Upload Resume
                </TabsTrigger>
                <TabsTrigger value="manual" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Manual Entry
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="upload" className="mt-6">
                <ResumeUpload onComplete={handleResumeComplete} />
              </TabsContent>
              
              <TabsContent value="manual" className="mt-6">
                <ProfileEntry onComplete={handleProfileComplete} />
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          /* Main Dashboard */
          <div className="space-y-8">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="shadow-soft">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{allSkills.length}</p>
                      <p className="text-sm text-muted-foreground">Skills Identified</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-soft">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                      <Target className="h-6 w-6 text-success" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">3</p>
                      <p className="text-sm text-muted-foreground">Career Paths</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-soft">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                      <Briefcase className="h-6 w-6 text-warning" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">24</p>
                      <p className="text-sm text-muted-foreground">Job Matches</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-soft">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">87%</p>
                      <p className="text-sm text-muted-foreground">Best Match</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Skills Overview */}
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-primary" />
                  Your Skills Portfolio
                </CardTitle>
                <CardDescription>
                  Skills extracted from your profile and resume
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {allSkills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="px-3 py-1">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Main Content Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="suggestions" className="flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Career Paths
                </TabsTrigger>
                <TabsTrigger value="jobs" className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  Job Matches
                </TabsTrigger>
                <TabsTrigger value="ats" className="flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  ATS Scanner
                </TabsTrigger>
                <TabsTrigger value="field" className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Field Analysis
                </TabsTrigger>
                <TabsTrigger value="learn" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Skill Development
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="suggestions" className="mt-6">
                <CareerSuggestions 
                  userSkills={allSkills} 
                  onSelectPath={handleSelectCareerPath} 
                />
              </TabsContent>
              
              <TabsContent value="jobs" className="mt-6">
                <JobMatching userSkills={allSkills} />
              </TabsContent>
              
              <TabsContent value="ats" className="mt-6">
                <ATSScoreScanner />
              </TabsContent>
              
              <TabsContent value="field" className="mt-6">
                <FieldInterestSelector userSkills={allSkills} />
              </TabsContent>
              
              <TabsContent value="learn" className="mt-6">
                <Card className="shadow-medium">
                  <CardHeader>
                    <CardTitle>Skill Development Recommendations</CardTitle>
                    <CardDescription>
                      Personalized learning paths to advance your career
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center py-12">
                    <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Coming soon - Personalized learning recommendations</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
};