import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, Edit3, Plus, Trash2 } from "lucide-react";

interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  atsScore: number;
  sections: {
    personalInfo: {
      name: string;
      email: string;
      phone: string;
      location: string;
      linkedin: string;
    };
    summary: string;
    experience: Array<{
      title: string;
      company: string;
      duration: string;
      description: string;
    }>;
    education: Array<{
      degree: string;
      institution: string;
      year: string;
      gpa?: string;
    }>;
    skills: string[];
    projects: Array<{
      name: string;
      description: string;
      technologies: string[];
    }>;
  };
}

const resumeTemplates: ResumeTemplate[] = [
  {
    id: "tech",
    name: "Tech Professional",
    description: "ATS-optimized template for software developers and engineers",
    atsScore: 95,
    sections: {
      personalInfo: {
        name: "Your Name",
        email: "your.email@gmail.com",
        phone: "+91 9876543210",
        location: "Bangalore, India",
        linkedin: "linkedin.com/in/yourname"
      },
      summary: "Results-driven Software Engineer with 3+ years of experience in full-stack development. Proven track record of delivering scalable solutions using modern technologies. Strong expertise in React, Node.js, and cloud platforms.",
      experience: [
        {
          title: "Software Engineer",
          company: "Tech Company India",
          duration: "Jan 2022 - Present",
          description: "• Developed and maintained 5+ web applications serving 100K+ users\n• Improved application performance by 40% through optimization techniques\n• Collaborated with cross-functional teams to deliver features on time"
        },
        {
          title: "Junior Developer",
          company: "Startup India",
          duration: "Jun 2021 - Dec 2021",
          description: "• Built responsive web applications using React and TypeScript\n• Implemented RESTful APIs and integrated third-party services\n• Participated in code reviews and maintained clean code standards"
        }
      ],
      education: [
        {
          degree: "Bachelor of Technology in Computer Science",
          institution: "Indian Institute of Technology",
          year: "2021",
          gpa: "8.5/10"
        }
      ],
      skills: ["JavaScript", "React", "Node.js", "Python", "AWS", "MongoDB", "Git", "Docker"],
      projects: [
        {
          name: "E-commerce Platform",
          description: "Full-stack e-commerce application with payment integration",
          technologies: ["React", "Node.js", "MongoDB", "Stripe"]
        },
        {
          name: "Task Management App",
          description: "Real-time collaborative task management tool",
          technologies: ["React", "Socket.io", "Express", "PostgreSQL"]
        }
      ]
    }
  },
  {
    id: "marketing",
    name: "Marketing Professional",
    description: "ATS-friendly template for digital marketing and growth roles",
    atsScore: 92,
    sections: {
      personalInfo: {
        name: "Your Name",
        email: "your.email@gmail.com",
        phone: "+91 9876543210",
        location: "Mumbai, India",
        linkedin: "linkedin.com/in/yourname"
      },
      summary: "Creative Digital Marketing Specialist with 4+ years of experience driving brand growth and customer engagement. Expert in SEO, social media marketing, and content strategy with proven ROI improvements.",
      experience: [
        {
          title: "Digital Marketing Manager",
          company: "Marketing Agency India",
          duration: "Mar 2021 - Present",
          description: "• Increased client organic traffic by 150% through SEO optimization\n• Managed social media campaigns reaching 500K+ impressions monthly\n• Led content strategy resulting in 75% increase in engagement rates"
        },
        {
          title: "Marketing Executive",
          company: "E-commerce Startup",
          duration: "Jan 2020 - Feb 2021",
          description: "• Developed and executed email marketing campaigns with 25% open rates\n• Created content calendars and managed brand social media presence\n• Analyzed campaign performance and optimized for better conversion"
        }
      ],
      education: [
        {
          degree: "Master of Business Administration - Marketing",
          institution: "Indian Institute of Management",
          year: "2020"
        }
      ],
      skills: ["SEO", "Google Analytics", "Social Media Marketing", "Content Marketing", "PPC", "Email Marketing", "Canva", "HubSpot"],
      projects: [
        {
          name: "Brand Awareness Campaign",
          description: "Multi-channel campaign increasing brand recognition by 200%",
          technologies: ["Google Ads", "Facebook Ads", "Analytics"]
        }
      ]
    }
  }
];

export const ResumeTemplates = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<ResumeTemplate>(resumeTemplates[0]);
  const [editingTemplate, setEditingTemplate] = useState<ResumeTemplate>(resumeTemplates[0]);
  const [isEditing, setIsEditing] = useState(false);

  const handleTemplateSelect = (template: ResumeTemplate) => {
    setSelectedTemplate(template);
    setEditingTemplate(JSON.parse(JSON.stringify(template))); // Deep clone
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setSelectedTemplate(editingTemplate);
    setIsEditing(false);
  };

  const handleInputChange = (section: string, field: string, value: string) => {
    setEditingTemplate(prev => {
      const sectionData = prev.sections[section as keyof typeof prev.sections];
      if (typeof sectionData === 'object' && sectionData !== null && !Array.isArray(sectionData)) {
        return {
          ...prev,
          sections: {
            ...prev.sections,
            [section]: {
              ...sectionData,
              [field]: value
            }
          }
        };
      }
      return prev;
    });
  };

  const handleArrayAdd = (section: 'experience' | 'education' | 'projects', newItem: any) => {
    setEditingTemplate(prev => ({
      ...prev,
      sections: {
        ...prev.sections,
        [section]: [...prev.sections[section], newItem]
      }
    }));
  };

  const handleArrayRemove = (section: 'experience' | 'education' | 'projects', index: number) => {
    setEditingTemplate(prev => ({
      ...prev,
      sections: {
        ...prev.sections,
        [section]: prev.sections[section].filter((_, i) => i !== index)
      }
    }));
  };

  const handleSkillsChange = (skills: string) => {
    setEditingTemplate(prev => ({
      ...prev,
      sections: {
        ...prev.sections,
        skills: skills.split(',').map(s => s.trim()).filter(s => s)
      }
    }));
  };

  const generatePDF = () => {
    const element = document.getElementById('resume-preview');
    if (element) {
      window.print();
    }
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-soft border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            ATS-Friendly Resume Templates
          </CardTitle>
          <CardDescription>
            Choose from professionally designed templates optimized for Applicant Tracking Systems
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {resumeTemplates.map((template) => (
              <Card 
                key={template.id}
                className={`cursor-pointer transition-all ${
                  selectedTemplate.id === template.id 
                    ? 'ring-2 ring-primary shadow-medium' 
                    : 'hover:shadow-soft'
                }`}
                onClick={() => handleTemplateSelect(template)}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{template.name}</h3>
                    <Badge variant="secondary" className="bg-success/10 text-success">
                      ATS {template.atsScore}%
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{template.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex gap-2">
            <Button onClick={handleEdit} disabled={isEditing}>
              <Edit3 className="h-4 w-4 mr-2" />
              {isEditing ? 'Editing...' : 'Edit Template'}
            </Button>
            <Button onClick={generatePDF} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Editor Panel */}
        {isEditing && (
          <Card className="shadow-medium">
            <CardHeader>
              <CardTitle>Edit Resume</CardTitle>
              <CardDescription>Customize your resume template</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="personal">Personal</TabsTrigger>
                  <TabsTrigger value="experience">Experience</TabsTrigger>
                  <TabsTrigger value="education">Education</TabsTrigger>
                  <TabsTrigger value="skills">Skills</TabsTrigger>
                </TabsList>
                
                <TabsContent value="personal" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Name</label>
                      <Input
                        value={editingTemplate.sections.personalInfo.name}
                        onChange={(e) => handleInputChange('personalInfo', 'name', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <Input
                        value={editingTemplate.sections.personalInfo.email}
                        onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Phone</label>
                      <Input
                        value={editingTemplate.sections.personalInfo.phone}
                        onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Location</label>
                      <Input
                        value={editingTemplate.sections.personalInfo.location}
                        onChange={(e) => handleInputChange('personalInfo', 'location', e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Professional Summary</label>
                    <Textarea
                      value={editingTemplate.sections.summary}
                      onChange={(e) => setEditingTemplate(prev => ({
                        ...prev,
                        sections: { ...prev.sections, summary: e.target.value }
                      }))}
                      rows={4}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="experience" className="space-y-4">
                  {editingTemplate.sections.experience.map((exp, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">Experience {index + 1}</h4>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleArrayRemove('experience', index)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mb-2">
                        <Input
                          placeholder="Job Title"
                          value={exp.title}
                          onChange={(e) => {
                            const newExp = [...editingTemplate.sections.experience];
                            newExp[index].title = e.target.value;
                            setEditingTemplate(prev => ({
                              ...prev,
                              sections: { ...prev.sections, experience: newExp }
                            }));
                          }}
                        />
                        <Input
                          placeholder="Company"
                          value={exp.company}
                          onChange={(e) => {
                            const newExp = [...editingTemplate.sections.experience];
                            newExp[index].company = e.target.value;
                            setEditingTemplate(prev => ({
                              ...prev,
                              sections: { ...prev.sections, experience: newExp }
                            }));
                          }}
                        />
                      </div>
                      <Input
                        placeholder="Duration"
                        value={exp.duration}
                        onChange={(e) => {
                          const newExp = [...editingTemplate.sections.experience];
                          newExp[index].duration = e.target.value;
                          setEditingTemplate(prev => ({
                            ...prev,
                            sections: { ...prev.sections, experience: newExp }
                          }));
                        }}
                        className="mb-2"
                      />
                      <Textarea
                        placeholder="Job Description"
                        value={exp.description}
                        onChange={(e) => {
                          const newExp = [...editingTemplate.sections.experience];
                          newExp[index].description = e.target.value;
                          setEditingTemplate(prev => ({
                            ...prev,
                            sections: { ...prev.sections, experience: newExp }
                          }));
                        }}
                        rows={3}
                      />
                    </Card>
                  ))}
                  <Button
                    onClick={() => handleArrayAdd('experience', {
                      title: '',
                      company: '',
                      duration: '',
                      description: ''
                    })}
                    variant="outline"
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Experience
                  </Button>
                </TabsContent>

                <TabsContent value="education" className="space-y-4">
                  {editingTemplate.sections.education.map((edu, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">Education {index + 1}</h4>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleArrayRemove('education', index)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <Input
                          placeholder="Degree"
                          value={edu.degree}
                          onChange={(e) => {
                            const newEdu = [...editingTemplate.sections.education];
                            newEdu[index].degree = e.target.value;
                            setEditingTemplate(prev => ({
                              ...prev,
                              sections: { ...prev.sections, education: newEdu }
                            }));
                          }}
                        />
                        <Input
                          placeholder="Institution"
                          value={edu.institution}
                          onChange={(e) => {
                            const newEdu = [...editingTemplate.sections.education];
                            newEdu[index].institution = e.target.value;
                            setEditingTemplate(prev => ({
                              ...prev,
                              sections: { ...prev.sections, education: newEdu }
                            }));
                          }}
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <Input
                            placeholder="Year"
                            value={edu.year}
                            onChange={(e) => {
                              const newEdu = [...editingTemplate.sections.education];
                              newEdu[index].year = e.target.value;
                              setEditingTemplate(prev => ({
                                ...prev,
                                sections: { ...prev.sections, education: newEdu }
                              }));
                            }}
                          />
                          <Input
                            placeholder="GPA (optional)"
                            value={edu.gpa || ''}
                            onChange={(e) => {
                              const newEdu = [...editingTemplate.sections.education];
                              newEdu[index].gpa = e.target.value;
                              setEditingTemplate(prev => ({
                                ...prev,
                                sections: { ...prev.sections, education: newEdu }
                              }));
                            }}
                          />
                        </div>
                      </div>
                    </Card>
                  ))}
                  <Button
                    onClick={() => handleArrayAdd('education', {
                      degree: '',
                      institution: '',
                      year: '',
                      gpa: ''
                    })}
                    variant="outline"
                    className="w-full"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Education
                  </Button>
                </TabsContent>

                <TabsContent value="skills" className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Skills (comma separated)</label>
                    <Textarea
                      placeholder="JavaScript, React, Node.js, Python..."
                      value={editingTemplate.sections.skills.join(', ')}
                      onChange={(e) => handleSkillsChange(e.target.value)}
                      rows={3}
                    />
                  </div>
                </TabsContent>
              </Tabs>

              <div className="flex gap-2 mt-6">
                <Button onClick={handleSave} variant="gradient">
                  Save Changes
                </Button>
                <Button onClick={() => setIsEditing(false)} variant="outline">
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Preview Panel */}
        <Card className="shadow-medium">
          <CardHeader>
            <CardTitle>Resume Preview</CardTitle>
            <CardDescription>Live preview of your resume</CardDescription>
          </CardHeader>
          <CardContent>
            <div id="resume-preview" className="bg-white p-6 text-black min-h-[800px] shadow-inner">
              {/* Personal Info */}
              <div className="text-center mb-6 border-b border-gray-200 pb-4">
                <h1 className="text-2xl font-bold text-gray-900">
                  {isEditing ? editingTemplate.sections.personalInfo.name : selectedTemplate.sections.personalInfo.name}
                </h1>
                <div className="text-sm text-gray-600 mt-2 space-y-1">
                  <p>{isEditing ? editingTemplate.sections.personalInfo.email : selectedTemplate.sections.personalInfo.email} | {isEditing ? editingTemplate.sections.personalInfo.phone : selectedTemplate.sections.personalInfo.phone}</p>
                  <p>{isEditing ? editingTemplate.sections.personalInfo.location : selectedTemplate.sections.personalInfo.location} | {isEditing ? editingTemplate.sections.personalInfo.linkedin : selectedTemplate.sections.personalInfo.linkedin}</p>
                </div>
              </div>

              {/* Summary */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2 border-b border-gray-300">PROFESSIONAL SUMMARY</h2>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {isEditing ? editingTemplate.sections.summary : selectedTemplate.sections.summary}
                </p>
              </div>

              {/* Experience */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2 border-b border-gray-300">PROFESSIONAL EXPERIENCE</h2>
                {(isEditing ? editingTemplate.sections.experience : selectedTemplate.sections.experience).map((exp, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold text-gray-900">{exp.title}</h3>
                      <span className="text-sm text-gray-600">{exp.duration}</span>
                    </div>
                    <p className="text-sm font-medium text-gray-700 mb-2">{exp.company}</p>
                    <div className="text-sm text-gray-700 whitespace-pre-line">
                      {exp.description}
                    </div>
                  </div>
                ))}
              </div>

              {/* Education */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2 border-b border-gray-300">EDUCATION</h2>
                {(isEditing ? editingTemplate.sections.education : selectedTemplate.sections.education).map((edu, index) => (
                  <div key={index} className="mb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                        <p className="text-sm text-gray-700">{edu.institution}</p>
                      </div>
                      <div className="text-right text-sm text-gray-600">
                        <p>{edu.year}</p>
                        {edu.gpa && <p>GPA: {edu.gpa}</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Skills */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2 border-b border-gray-300">TECHNICAL SKILLS</h2>
                <div className="flex flex-wrap gap-2">
                  {(isEditing ? editingTemplate.sections.skills : selectedTemplate.sections.skills).map((skill, index) => (
                    <span key={index} className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Projects */}
              {(isEditing ? editingTemplate.sections.projects : selectedTemplate.sections.projects).length > 0 && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-2 border-b border-gray-300">PROJECTS</h2>
                  {(isEditing ? editingTemplate.sections.projects : selectedTemplate.sections.projects).map((project, index) => (
                    <div key={index} className="mb-3">
                      <h3 className="font-semibold text-gray-900">{project.name}</h3>
                      <p className="text-sm text-gray-700 mb-1">{project.description}</p>
                      <p className="text-sm text-gray-600">
                        <strong>Technologies:</strong> {project.technologies.join(', ')}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};