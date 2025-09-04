import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { User, Plus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProfileEntryProps {
  onComplete: (profileData: any) => void;
}

export const ProfileEntry = ({ onComplete }: ProfileEntryProps) => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    currentRole: "",
    experience: "",
    education: "",
    skills: [] as string[],
  });
  const [newSkill, setNewSkill] = useState("");
  const { toast } = useToast();

  const addSkill = () => {
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!profile.name || !profile.currentRole || profile.skills.length === 0) {
      toast({
        title: "Please complete required fields",
        description: "Name, current role, and at least one skill are required.",
        variant: "destructive",
      });
      return;
    }

    onComplete(profile);
    toast({
      title: "Profile created successfully!",
      description: "Your professional profile has been saved.",
    });
  };

  return (
    <Card className="shadow-medium">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5 text-primary" />
          Create Your Profile
        </CardTitle>
        <CardDescription>
          Enter your professional information to get personalized career recommendations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                placeholder="John Doe"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="currentRole">Current Job Title *</Label>
            <Input
              id="currentRole"
              value={profile.currentRole}
              onChange={(e) => setProfile(prev => ({ ...prev, currentRole: e.target.value }))}
              placeholder="Software Engineer"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="experience">Years of Experience</Label>
            <Input
              id="experience"
              value={profile.experience}
              onChange={(e) => setProfile(prev => ({ ...prev, experience: e.target.value }))}
              placeholder="3 years"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="education">Education</Label>
            <Textarea
              id="education"
              value={profile.education}
              onChange={(e) => setProfile(prev => ({ ...prev, education: e.target.value }))}
              placeholder="Bachelor's in Computer Science from XYZ University"
              rows={2}
            />
          </div>

          <div className="space-y-3">
            <Label>Skills *</Label>
            <div className="flex gap-2">
              <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a skill"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
              />
              <Button type="button" variant="outline" onClick={addSkill}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 min-h-[2rem]">
              {profile.skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <Button type="submit" variant="gradient" className="w-full">
            Create Profile
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};