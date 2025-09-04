import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Briefcase, MapPin, Clock, DollarSign, Search, ExternalLink } from "lucide-react";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  postedDate: string;
  matchScore: number;
  description: string;
  requiredSkills: string[];
  matchingSkills: string[];
  missingSkills: string[];
}

interface JobMatchingProps {
  userSkills: string[];
}

export const JobMatching = ({ userSkills }: JobMatchingProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const jobs: Job[] = [
    {
      id: "1",
      title: "Senior React Developer",
      company: "TechCorp Inc",
      location: "San Francisco, CA",
      salary: "$120k - $150k",
      type: "Full-time",
      postedDate: "2 days ago",
      matchScore: 92,
      description: "We're looking for a senior React developer to join our growing team...",
      requiredSkills: ["React", "TypeScript", "Node.js", "GraphQL", "AWS"],
      matchingSkills: ["React", "TypeScript", "Node.js"],
      missingSkills: ["GraphQL", "AWS"]
    },
    {
      id: "2", 
      title: "Full Stack Engineer",
      company: "StartupXYZ",
      location: "New York, NY",
      salary: "$90k - $120k",
      type: "Full-time",
      postedDate: "1 week ago",
      matchScore: 85,
      description: "Join our fast-growing startup as a full stack engineer...",
      requiredSkills: ["React", "Python", "PostgreSQL", "Docker", "Kubernetes"],
      matchingSkills: ["React", "Python"],
      missingSkills: ["PostgreSQL", "Docker", "Kubernetes"]
    },
    {
      id: "3",
      title: "ML Engineer",
      company: "AI Innovations",
      location: "Remote",
      salary: "$130k - $170k", 
      type: "Full-time",
      postedDate: "3 days ago",
      matchScore: 78,
      description: "Build and deploy machine learning models at scale...",
      requiredSkills: ["Python", "Machine Learning", "TensorFlow", "Kubernetes", "MLOps"],
      matchingSkills: ["Python", "Machine Learning"],
      missingSkills: ["TensorFlow", "Kubernetes", "MLOps"]
    },
    {
      id: "4",
      title: "Frontend Developer",
      company: "DesignStudio",
      location: "Austin, TX",
      salary: "$70k - $95k",
      type: "Contract",
      postedDate: "5 days ago", 
      matchScore: 88,
      description: "Create beautiful user interfaces using modern frontend technologies...",
      requiredSkills: ["React", "TypeScript", "CSS", "Figma", "Next.js"],
      matchingSkills: ["React", "TypeScript"],
      missingSkills: ["Figma", "Next.js"]
    }
  ];

  const filteredJobs = jobs
    .filter(job => 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(job => 
      !selectedLocation || job.location.toLowerCase().includes(selectedLocation.toLowerCase())
    )
    .sort((a, b) => b.matchScore - a.matchScore);

  return (
    <div className="space-y-6">
      <Card className="shadow-soft border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-primary" />
            Job Recommendations
          </CardTitle>
          <CardDescription>
            Jobs matched to your skills and career goals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search jobs or companies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Input
              placeholder="Location"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-48"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {filteredJobs.map((job) => (
          <Card key={job.id} className="shadow-medium hover:shadow-strong transition-shadow">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold">{job.title}</h3>
                    <p className="text-muted-foreground">{job.company}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <div className="w-2 h-2 rounded-full bg-success"></div>
                    {job.matchScore}% match
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {job.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />
                    {job.salary}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {job.postedDate}
                  </div>
                  <Badge variant={job.type === "Full-time" ? "default" : "secondary"}>
                    {job.type}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Skill Match</span>
                    <span className="font-medium">{job.matchScore}%</span>
                  </div>
                  <Progress value={job.matchScore} className="h-2" />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-success">Your Matching Skills</h4>
                    <div className="flex flex-wrap gap-1">
                      {job.matchingSkills.map((skill, i) => (
                        <Badge key={i} variant="secondary" className="bg-success/10 text-success">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-warning">Skills to Learn</h4>
                    <div className="flex flex-wrap gap-1">
                      {job.missingSkills.map((skill, i) => (
                        <Badge key={i} variant="outline" className="border-warning/50 text-warning">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2">
                  {job.description}
                </p>

                <div className="flex gap-2 pt-2">
                  <Button variant="gradient" className="flex-1">
                    Apply Now
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline">Save Job</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};