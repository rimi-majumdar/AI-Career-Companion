import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Target, BookOpen, Play, ExternalLink, TrendingUp, Clock, Search } from "lucide-react";

interface FieldData {
  name: string;
  description: string;
  requiredSkills: string[];
  averageSalary: string;
  growthRate: string;
  roadmap: {
    phase: string;
    duration: string;
    skills: string[];
    resources: { title: string; type: 'video' | 'course' | 'article'; url: string }[];
  }[];
}

const fieldsData: Record<string, FieldData> = {
  "frontend": {
    name: "Frontend Development",
    description: "Create user interfaces and experiences for web applications",
    requiredSkills: ["HTML/CSS", "JavaScript", "React", "TypeScript", "Responsive Design", "Version Control"],
    averageSalary: "₹8L - ₹25L",
    growthRate: "15%",
    roadmap: [
      {
        phase: "Foundation",
        duration: "2-3 months",
        skills: ["HTML", "CSS", "JavaScript Basics"],
        resources: [
          { title: "HTML & CSS Full Course", type: "video", url: "https://www.youtube.com/watch?v=G3e-cpL7ofc" },
          { title: "JavaScript Fundamentals", type: "video", url: "https://www.youtube.com/watch?v=PkZNo7MFNFg" },
          { title: "MDN Web Docs", type: "article", url: "https://developer.mozilla.org/en-US/" }
        ]
      },
      {
        phase: "Intermediate",
        duration: "3-4 months",
        skills: ["React", "TypeScript", "State Management"],
        resources: [
          { title: "React Complete Guide", type: "video", url: "https://www.youtube.com/watch?v=SqcY0GlETPk" },
          { title: "TypeScript for Beginners", type: "video", url: "https://www.youtube.com/watch?v=d56mG7DezGs" },
          { title: "React Official Docs", type: "article", url: "https://react.dev/" }
        ]
      },
      {
        phase: "Advanced",
        duration: "2-3 months",
        skills: ["Performance Optimization", "Testing", "Build Tools"],
        resources: [
          { title: "React Performance", type: "video", url: "https://www.youtube.com/watch?v=KJP1E-Y-xyo" },
          { title: "Testing React Apps", type: "video", url: "https://www.youtube.com/watch?v=7r4xVDI2vho" },
          { title: "Webpack & Vite Guide", type: "article", url: "https://vitejs.dev/guide/" }
        ]
      }
    ]
  },
  "backend": {
    name: "Backend Development",
    description: "Build server-side applications and APIs",
    requiredSkills: ["Node.js", "Python", "Databases", "API Design", "Authentication", "Cloud Services"],
    averageSalary: "₹10L - ₹30L",
    growthRate: "18%",
    roadmap: [
      {
        phase: "Foundation",
        duration: "2-3 months",
        skills: ["Node.js", "Express", "REST APIs"],
        resources: [
          { title: "Node.js Complete Course", type: "video", url: "https://www.youtube.com/watch?v=f2EqECiTBL8" },
          { title: "Express.js Tutorial", type: "video", url: "https://www.youtube.com/watch?v=SccSCuHhOw0" },
          { title: "REST API Best Practices", type: "article", url: "https://restfulapi.net/" }
        ]
      },
      {
        phase: "Intermediate",
        duration: "3-4 months",
        skills: ["Databases", "Authentication", "Security"],
        resources: [
          { title: "MongoDB Tutorial", type: "video", url: "https://www.youtube.com/watch?v=oSIv-E60NiU" },
          { title: "JWT Authentication", type: "video", url: "https://www.youtube.com/watch?v=7Q17ubqLfaM" },
          { title: "Node.js Security Guide", type: "article", url: "https://nodejs.org/en/guides/security/" }
        ]
      },
      {
        phase: "Advanced",
        duration: "3-4 months",
        skills: ["Microservices", "DevOps", "Cloud Deployment"],
        resources: [
          { title: "Microservices with Node.js", type: "video", url: "https://www.youtube.com/watch?v=BnknNTN8icw" },
          { title: "Docker for Developers", type: "video", url: "https://www.youtube.com/watch?v=pTFZFxd4hOI" },
          { title: "AWS Node.js Guide", type: "article", url: "https://aws.amazon.com/developer/language/javascript/" }
        ]
      }
    ]
  },
  "data-science": {
    name: "Data Science",
    description: "Extract insights from data using statistical analysis and machine learning",
    requiredSkills: ["Python", "Statistics", "Machine Learning", "Data Visualization", "SQL", "Deep Learning"],
    averageSalary: "₹12L - ₹35L",
    growthRate: "22%",
    roadmap: [
      {
        phase: "Foundation",
        duration: "3-4 months",
        skills: ["Python", "Statistics", "Pandas", "NumPy"],
        resources: [
          { title: "Python for Data Science", type: "video", url: "https://www.youtube.com/watch?v=ua-CiDNNj30" },
          { title: "Statistics Fundamentals", type: "video", url: "https://www.youtube.com/watch?v=xxpc-HPKN28" },
          { title: "Pandas Tutorial", type: "video", url: "https://www.youtube.com/watch?v=ZyhVh-qRZPA" }
        ]
      },
      {
        phase: "Intermediate",
        duration: "4-5 months",
        skills: ["Machine Learning", "Scikit-learn", "Data Visualization"],
        resources: [
          { title: "Machine Learning Course", type: "video", url: "https://www.youtube.com/watch?v=i_LwzRVP7bg" },
          { title: "Scikit-learn Tutorial", type: "video", url: "https://www.youtube.com/watch?v=0B5eIE_1vpU" },
          { title: "Data Visualization with Python", type: "video", url: "https://www.youtube.com/watch?v=8Mq2HRML4Ck" }
        ]
      },
      {
        phase: "Advanced",
        duration: "4-6 months",
        skills: ["Deep Learning", "TensorFlow", "MLOps"],
        resources: [
          { title: "Deep Learning Specialization", type: "course", url: "https://www.coursera.org/specializations/deep-learning" },
          { title: "TensorFlow Tutorial", type: "video", url: "https://www.youtube.com/watch?v=i8NETqtGHms" },
          { title: "MLOps Guide", type: "article", url: "https://ml-ops.org/" }
        ]
      }
    ]
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
      growthRate: "12-25%",
      roadmap: [
        {
          phase: "Foundation",
          duration: "2-3 months",
          skills: skills.slice(0, 3),
          resources: [
            { title: `${fieldName} Fundamentals`, type: "video", url: "https://www.youtube.com/results?search_query=" + encodeURIComponent(fieldName + " tutorial beginner") },
            { title: `Learn ${fieldName}`, type: "course", url: "https://www.coursera.org/courses?query=" + encodeURIComponent(fieldName) },
            { title: `${fieldName} Documentation`, type: "article", url: "https://www.google.com/search?q=" + encodeURIComponent(fieldName + " official documentation") }
          ]
        },
        {
          phase: "Intermediate",
          duration: "3-4 months",
          skills: skills.slice(3, 5),
          resources: [
            { title: `Advanced ${fieldName}`, type: "video", url: "https://www.youtube.com/results?search_query=" + encodeURIComponent("advanced " + fieldName + " course") },
            { title: `${fieldName} Projects`, type: "course", url: "https://www.udemy.com/courses/search/?q=" + encodeURIComponent(fieldName) },
            { title: `${fieldName} Best Practices`, type: "article", url: "https://www.google.com/search?q=" + encodeURIComponent(fieldName + " best practices guide") }
          ]
        },
        {
          phase: "Advanced",
          duration: "3-4 months",
          skills: skills.slice(5),
          resources: [
            { title: `${fieldName} Mastery`, type: "video", url: "https://www.youtube.com/results?search_query=" + encodeURIComponent(fieldName + " expert level mastery") },
            { title: `${fieldName} Certification`, type: "course", url: "https://www.coursera.org/professional-certificates" },
            { title: `${fieldName} Industry Trends`, type: "article", url: "https://www.google.com/search?q=" + encodeURIComponent(fieldName + " industry trends 2024") }
          ]
        }
      ]
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

          {/* Learning Roadmap */}
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Learning Roadmap
              </CardTitle>
              <CardDescription>
                Step-by-step path to master {fieldData.name}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {fieldData.roadmap.map((phase, index) => (
                <div key={index} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">{index + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">{phase.phase}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {phase.duration}
                      </div>
                    </div>
                  </div>

                  <div className="ml-11 space-y-3">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Skills to Learn:</h4>
                      <div className="flex flex-wrap gap-1">
                        {phase.skills.map((skill, i) => (
                          <Badge key={i} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium mb-2">Recommended Resources:</h4>
                      <div className="space-y-2">
                        {phase.resources.map((resource, i) => (
                          <div key={i} className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
                            {resource.type === 'video' && <Play className="h-4 w-4 text-red-500" />}
                            {resource.type === 'course' && <BookOpen className="h-4 w-4 text-blue-500" />}
                            {resource.type === 'article' && <ExternalLink className="h-4 w-4 text-green-500" />}
                            <span className="text-sm flex-1">{resource.title}</span>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => window.open(resource.url, '_blank')}
                            >
                              <ExternalLink className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {index < fieldData.roadmap.length - 1 && (
                    <div className="ml-4 w-0.5 h-4 bg-primary/20"></div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};