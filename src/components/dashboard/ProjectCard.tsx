import { MoreHorizontal, Clock, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { motion } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ProjectCardProps {
  id: string;
  name: string;
  status: string;
  description: string;
  sessionCount: number;
  lastUpdated: string;
  color: string;
  team: Array<{ image: string; name: string }>;
}

export function ProjectCard({
  name,
  status,
  description,
  sessionCount,
  lastUpdated,
  color,
  team
}: ProjectCardProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'in progress':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'completed':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'pending review':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group"
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
            <Badge 
              variant="secondary"
              className={`mt-2 rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(status)}`}
            >
              {status}
            </Badge>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>View Details</DropdownMenuItem>
              <DropdownMenuItem>Edit Project</DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">Delete Project</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>

        {/* Team */}
        <div className="flex items-center justify-between">
          <div className="flex -space-x-2">
            {team.map((member, i) => (
              <Avatar key={i} className="h-8 w-8 ring-2 ring-white">
                <img
                  src={member.image}
                  alt={member.name}
                  className="h-full w-full object-cover"
                />
                <AvatarFallback>{member.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
            ))}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Users className="h-4 w-4" />
            <span>{sessionCount} sessions</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Clock className="h-4 w-4" />
          <span>Last updated {lastUpdated}</span>
        </div>
      </div>
    </motion.div>
  );
}