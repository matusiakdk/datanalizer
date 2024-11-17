import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { MoreHorizontal, Clock, Users, CheckCircle2, ListTodo } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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
}

interface ProjectCardProps {
  project: Project;
  viewMode: 'grid' | 'list';
}

export function ProjectCard({ project, viewMode }: ProjectCardProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'in progress':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'completed':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'on hold':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        whileHover={{ y: -2 }}
        className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
      >
        <div className="flex items-center gap-6">
          {/* Project Icon */}
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg"
            style={{ 
              background: `linear-gradient(135deg, ${project.color}, ${project.color}DD)`,
              boxShadow: `0 8px 16px -4px ${project.color}33`
            }}
          >
            {project.name[0]}
          </div>

          {/* Project Info */}
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                <p className="text-sm text-gray-500 line-clamp-1 mt-1">{project.description}</p>
              </div>
              <Badge 
                variant="secondary"
                className={`ml-4 ${getStatusColor(project.status)}`}
              >
                {project.status}
              </Badge>
            </div>
          </div>

          {/* Progress */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <Progress value={project.progress} className="w-24" />
              <span className="text-sm font-medium">{project.progress}%</span>
            </div>
            <div className="flex -space-x-2">
              {project.team.map((member, i) => (
                <Avatar key={i} className="h-8 w-8 border-2 border-white">
                  <AvatarImage src={member.image} alt={member.name} />
                  <AvatarFallback>{member.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>View Details</DropdownMenuItem>
                <DropdownMenuItem>Edit Project</DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">Archive Project</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 h-full"
    >
      {/* Header */}
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
            <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
            <Badge 
              variant="secondary"
              className={`mt-2 ${getStatusColor(project.status)}`}
            >
              {project.status}
            </Badge>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Edit Project</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">Archive Project</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Description */}
      <p className="mt-4 text-sm text-gray-600 line-clamp-2">{project.description}</p>

      {/* Progress */}
      <div className="mt-6 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Progress</span>
          <span className="font-medium">{project.progress}%</span>
        </div>
        <Progress value={project.progress} />
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <ListTodo className="h-4 w-4" />
            <span>Tasks</span>
          </div>
          <p className="text-2xl font-semibold">
            {project.stats.completedTasks}
            <span className="text-gray-400 text-lg">/{project.stats.totalTasks}</span>
          </p>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users className="h-4 w-4" />
            <span>Sessions</span>
          </div>
          <p className="text-2xl font-semibold">
            {project.stats.completedSessions}
            <span className="text-gray-400 text-lg">/{project.stats.plannedSessions}</span>
          </p>
        </div>
      </div>

      {/* Team */}
      <div className="mt-6 flex items-center justify-between">
        <div className="flex -space-x-2">
          {project.team.map((member, i) => (
            <Avatar key={i} className="h-8 w-8 border-2 border-white">
              <AvatarImage src={member.image} alt={member.name} />
              <AvatarFallback>{member.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
          ))}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Clock className="h-4 w-4" />
          <span>Updated {project.lastUpdated}</span>
        </div>
      </div>
    </motion.div>
  );
}