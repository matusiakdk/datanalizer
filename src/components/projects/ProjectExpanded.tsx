import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  X, Clock, Users, CheckCircle2, ListTodo, Plus, 
  Video, MessageSquare, Calendar, ChevronRight 
} from 'lucide-react';

interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  status: string;
  participants: Array<{ name: string; image: string }>;
}

interface Project {
  id: string;
  name: string;
  status: string;
  description: string;
  progress: number;
  sessionCount: number;
  lastUpdated: string;
  color: string;
  team: Array<{ name: string; image: string }>;
  stats: {
    completedTasks: number;
    totalTasks: number;
    completedSessions: number;
    plannedSessions: number;
  };
  meetings: Meeting[];
}

interface ProjectExpandedProps {
  project: Project;
  onClose: () => void;
}

export function ProjectExpanded({ project, onClose }: ProjectExpandedProps) {
  return (
    <motion.div
      className="bg-white rounded-xl border border-gray-100 shadow-lg overflow-hidden"
      layout
    >
      {/* Header */}
      <div className="p-6 bg-gradient-to-b from-gray-50 to-white border-b">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg"
              style={{ 
                background: `linear-gradient(135deg, ${project.color}, ${project.color}DD)`,
                boxShadow: `0 8px 16px -4px ${project.color}33`
              }}
            >
              {project.name[0]}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">{project.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{project.description}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-gray-100"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Project Stats */}
        <div className="mt-6 grid grid-cols-4 gap-4">
          <div className="space-y-2">
            <div className="text-sm text-gray-500">Progress</div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{project.progress}%</span>
              </div>
              <Progress value={project.progress} />
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-sm text-gray-500">Team Members</div>
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {project.team.map((member, i) => (
                  <Avatar key={i} className="h-8 w-8 border-2 border-white">
                    <AvatarImage src={member.image} alt={member.name} />
                    <AvatarFallback>{member.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-sm text-gray-500">Tasks</div>
            <p className="text-2xl font-semibold">
              {project.stats.completedTasks}
              <span className="text-gray-400 text-lg">/{project.stats.totalTasks}</span>
            </p>
          </div>
          <div className="space-y-2">
            <div className="text-sm text-gray-500">Sessions</div>
            <p className="text-2xl font-semibold">
              {project.stats.completedSessions}
              <span className="text-gray-400 text-lg">/{project.stats.plannedSessions}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <Tabs defaultValue="meetings" className="p-6">
        <TabsList className="w-full justify-start border-b rounded-none h-12 bg-transparent space-x-8">
          <TabsTrigger 
            value="meetings" 
            className="relative h-12 rounded-none border-b-2 border-transparent data-[state=active]:border-[#DC4A29] data-[state=active]:bg-transparent"
          >
            Meetings
          </TabsTrigger>
          <TabsTrigger 
            value="tasks" 
            className="relative h-12 rounded-none border-b-2 border-transparent data-[state=active]:border-[#DC4A29] data-[state=active]:bg-transparent"
          >
            Tasks
          </TabsTrigger>
          <TabsTrigger 
            value="files" 
            className="relative h-12 rounded-none border-b-2 border-transparent data-[state=active]:border-[#DC4A29] data-[state=active]:bg-transparent"
          >
            Files
          </TabsTrigger>
        </TabsList>

        <TabsContent value="meetings" className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium">Upcoming & Recent Meetings</h4>
            <Button variant="outline" className="h-9 gap-2">
              <Plus className="h-4 w-4" />
              Schedule Meeting
            </Button>
          </div>

          <ScrollArea className="h-[300px] pr-4">
            {project.meetings.length > 0 ? (
              <div className="space-y-3">
                {project.meetings.map((meeting) => (
                  <div
                    key={meeting.id}
                    className="flex items-center justify-between p-4 rounded-xl border hover:border-[#DC4A29]/30 transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[#DC4A29]/10 flex items-center justify-center">
                        <Video className="h-5 w-5 text-[#DC4A29]" />
                      </div>
                      <div>
                        <h5 className="font-medium">{meeting.title}</h5>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {meeting.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {meeting.time}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-2">
                        {meeting.participants.map((participant, i) => (
                          <Avatar key={i} className="h-8 w-8 border-2 border-white">
                            <AvatarImage src={participant.image} alt={participant.name} />
                            <AvatarFallback>{participant.name.slice(0, 2)}</AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                      <Badge 
                        variant="secondary"
                        className={meeting.status === 'Completed' 
                          ? 'bg-green-50 text-green-700 border-green-200' 
                          : 'bg-blue-50 text-blue-700 border-blue-200'
                        }
                      >
                        {meeting.status}
                      </Badge>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-gray-400" />
                </div>
                <h5 className="font-medium text-gray-900">No meetings scheduled</h5>
                <p className="text-sm text-gray-500 mt-1">
                  Schedule your first meeting for this project
                </p>
                <Button className="mt-4 gap-2">
                  <Plus className="h-4 w-4" />
                  Schedule Meeting
                </Button>
              </div>
            )}
          </ScrollArea>
        </TabsContent>

        <TabsContent value="tasks">Tasks content</TabsContent>
        <TabsContent value="files">Files content</TabsContent>
      </Tabs>
    </motion.div>
  );
}