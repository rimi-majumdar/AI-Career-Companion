import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { TrendingUp, Target, ArrowRight, Star } from "lucide-react";

interface CareerPath {
  title: string;
  description: string;
  matchScore: number;
  requiredSkills: string[];
  yourSkills: string[];
  missingSkills: string[];
  averageSalary: string;
  growthRate: string;
}

interface CareerSuggestionsProps {
  userSkills: string[];
  onSelectPath: (path: CareerPath) => void;
}

export const CareerSuggestions = ({ userSkills, onSelectPath }: CareerSuggestionsProps) => {
  const careerPaths: CareerPath[] = [
    {
      title: "Senior Full-Stack Developer",
      description: "Lead development of complex web applications using modern technologies",
      matchScore: 85,
      requiredSkills: ["React", "Node.js", "TypeScript", "AWS", "Docker", "GraphQL"],
      yourSkills: ["React", "TypeScript", "Node.js"],
      missingSkills: ["AWS", "Docker", "GraphQL"],
      averageSalary: "$95k - $130k",
      growthRate: "+15% (5 years)"
    },
    {
      title: "AI/ML Engineer",
      description: "Develop and deploy machine learning models and AI solutions",
      matchScore: 72,
      requiredSkills: ["Python", "Machine Learning", "TensorFlow", "PyTorch", "SQL", "Statistics"],
      yourSkills: ["Python", "Machine Learning"],
      missingSkills: ["TensorFlow", "PyTorch", "Statistics"],
      averageSalary: "$110k - $160k",
      growthRate: "+25% (5 years)"
    },
    {
      title: "Tech Lead / Engineering Manager",
      description: "Lead engineering teams and make technical architecture decisions",
      matchScore: 68,
      requiredSkills: ["Leadership", "System Design", "Mentoring", "Agile", "Communication"],
      yourSkills: ["React", "TypeScript"],
      missingSkills: ["Leadership", "System Design", "Mentoring", "Agile"],
      averageSalary: "$120k - $180k",
      growthRate: "+20% (5 years)"
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="shadow-soft border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Career Path Recommendations
          </CardTitle>
          <CardDescription>
            Based on your skills and experience, here are personalized career paths
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-6">
        {careerPaths.map((path, index) => (
          <Card key={index} className="shadow-medium hover:shadow-strong transition-shadow cursor-pointer group">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {path.title}
                  </CardTitle>
                  <CardDescription>{path.description}</CardDescription>
                </div>
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Star className="h-4 w-4 text-warning fill-current" />
                  {path.matchScore}% match
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Skill Match</span>
                  <span className="font-medium">{path.matchScore}%</span>
                </div>
                <Progress value={path.matchScore} className="h-2" />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-success">Your Skills</h4>
                  <div className="flex flex-wrap gap-1">
                    {path.yourSkills.map((skill, i) => (
                      <Badge key={i} variant="secondary" className="bg-success/10 text-success">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-warning">Skills to Learn</h4>
                  <div className="flex flex-wrap gap-1">
                    {path.missingSkills.map((skill, i) => (
                      <Badge key={i} variant="outline" className="border-warning/50 text-warning">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Average Salary</p>
                    <p className="font-semibold">{path.averageSalary}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-4 w-4 text-success" />
                    <div>
                      <p className="text-sm text-muted-foreground">Growth Rate</p>
                      <p className="font-semibold text-success">{path.growthRate}</p>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={() => onSelectPath(path)}
                  variant="gradient"
                >
                  Explore Path
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};