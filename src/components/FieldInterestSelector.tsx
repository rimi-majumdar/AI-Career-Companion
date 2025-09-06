import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Target, TrendingUp, Search } from "lucide-react";

interface FieldData {
  name: string;
  description: string;
  requiredSkills: string[];
  averageSalary: string;
  growthRate: string;
}

const fieldsData: Record<string, FieldData> = {
  "frontend": {
    name: "Frontend Development",
    description: "Create user interfaces and experiences for web applications",
    requiredSkills: ["HTML/CSS", "JavaScript", "React", "TypeScript", "Responsive Design", "Version Control"],
    averageSalary: "₹8L - ₹25L",
    growthRate: "15%",
  },
  "backend": {
    name: "Backend Development",
    description: "Build server-side applications and APIs",
    requiredSkills: ["Node.js", "Python", "Databases", "API Design", "Authentication", "Cloud Services"],
    averageSalary: "₹10L - ₹30L",
    growthRate: "18%",
  },
  "data-science": {
    name: "Data Science",
    description: "Extract insights from data using statistical analysis and machine learning",
    requiredSkills: ["Python", "Statistics", "Machine Learning", "Data Visualization", "SQL", "Deep Learning"],
    averageSalary: "₹12L - ₹35L",
    growthRate: "22%",
  }
};

interface FieldInterestSelectorProps {
  userSkills: string[];
}

export const FieldInterestSelector = ({ userSkills }: FieldInterestSelectorProps) => {
  const [selectedField, setSelectedField] = useState<string>("");
  const [fieldData, setFieldData] = useState<FieldData | null>(null);

  const generateDynamicFieldData = (fieldName: string): FieldData => {
    const commonSkills = {
      "ai": ["Python", "Machine Learning", "TensorFlow", "PyTorch", "Statistics", "Data Analysis"],
      "mobile": ["React Native", "Flutter", "Swift", "Kotlin", "Mobile UI/UX", "API Integration"],
      "devops": ["Docker", "Kubernetes", "AWS", "CI/CD", "Linux", "Terraform"],
      "cybersecurity": ["Network Security", "Penetration Testing", "CISSP", "Ethical Hacking", "Firewall", "Encryption"],
      "blockchain": ["Solidity", "Web3", "Smart Contracts", "Ethereum", "Cryptocurrency", "DeFi"],
      "game": ["Unity", "C#", "Game Design", "3D Modeling", "Physics", "User Experience"],
      "ui": ["Figma", "Adobe XD", "Prototyping", "User Research", "Design Systems", "Accessibility"]
    };

    const fieldKey = Object.keys(commonSkills).find(key => 
      fieldName.toLowerCase().includes(key)
    );

    const skills = fieldKey ? commonSkills[fieldKey as keyof typeof commonSkills] : 
      ["Programming", "Problem Solving", "Communication", "Project Management", "Technical Skills", "Domain Knowledge"];

    return {
      name: fieldName,
      description: `Build expertise in ${fieldName} with industry-relevant skills and knowledge`,
      requiredSkills: skills,
      averageSalary: "₹6L - ₹30L",
      growthRate: "12-25%"
    };
  };

  const handleFieldSelect = (field: string) => {
    setSelectedField(field);
    if (field.trim()) {
      const predefinedField = fieldsData[field.toLowerCase()];
      setFieldData(predefinedField || generateDynamicFieldData(field));
    } else {
      setFieldData(null);
    }
  };

  const calculateSkillGap = (requiredSkills: string[]) => {
    const matchingSkills = requiredSkills.filter(skill => 
      userSkills.some(userSkill => 
        userSkill.toLowerCase().includes(skill.toLowerCase()) ||
        skill.toLowerCase().includes(userSkill.toLowerCase())
      )
    );
    const missingSkills = requiredSkills.filter(skill => !matchingSkills.includes(skill));
    const completionPercentage = Math.round((matchingSkills.length / requiredSkills.length) * 100);
    
    return { matchingSkills, missingSkills, completionPercentage };
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-soft border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Field Interest Analysis
          </CardTitle>
          <CardDescription>
            Choose your field of interest to get personalized roadmap and skill gap analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Enter your field of interest (e.g., AI, Mobile Development, Cybersecurity...)"
              value={selectedField}
              onChange={(e) => handleFieldSelect(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {["Frontend Development", "Backend Development", "Data Science", "AI/ML", "Mobile Development", "DevOps", "Cybersecurity"].map((field) => (
              <Button
                key={field}
                variant="outline"
                size="sm"
                onClick={() => handleFieldSelect(field)}
                className="text-xs"
              >
                {field}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {fieldData && (
        <div className="space-y-6">
          {/* Field Overview */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="text-xl">{fieldData.name}</CardTitle>
              <CardDescription>{fieldData.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-success" />
                  <span className="text-sm">Average Salary: <strong>{fieldData.averageSalary}</strong></span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span className="text-sm">Growth Rate: <strong>{fieldData.growthRate}</strong></span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills Gap Analysis */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>Skills Gap Analysis</CardTitle>
              <CardDescription>Based on your current skills vs required skills for {fieldData.name}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {(() => {
                const { matchingSkills, missingSkills, completionPercentage } = calculateSkillGap(fieldData.requiredSkills);
                return (
                  <>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Skill Completion</span>
                        <span className="font-medium">{completionPercentage}%</span>
                      </div>
                      <Progress value={completionPercentage} className="h-3" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-success">Skills You Have</h4>
                        <div className="flex flex-wrap gap-1">
                          {matchingSkills.length > 0 ? matchingSkills.map((skill, i) => (
                            <Badge key={i} variant="secondary" className="bg-success/10 text-success">
                              {skill}
                            </Badge>
                          )) : (
                            <p className="text-sm text-muted-foreground">No matching skills found</p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-warning">Skills to Learn</h4>
                        <div className="flex flex-wrap gap-1">
                          {missingSkills.map((skill, i) => (
                            <Badge key={i} variant="outline" className="border-warning/50 text-warning">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                );
              })()}
            </CardContent>
          </Card>

        </div>
      )}
    </div>
  );
};