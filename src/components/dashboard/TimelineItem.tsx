import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Play, MoreVertical } from 'lucide-react';

interface TimelineItemProps {
  time: string;
  title: string;
  duration: string;
  status: 'completed' | 'active' | 'upcoming';
  participants: Array<{ name: string; image: string }>;
}

export function TimelineItem({ time, title, duration, status, participants }: TimelineItemProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="timeline-item"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      layout
    >
      <div
        className={`flex items-center gap-4 p-3 rounded-xl border transition-colors duration-300 ${
          status === 'active'
            ? 'border-[#DC4A29] bg-[#DC4A29]/5'
            : status === 'completed'
            ? 'border-gray-200 bg-gray-50'
            : 'border-gray-200 hover:border-[#DC4A29]/30'
        }`}
      >
        <div className="w-20 text-sm font-medium">
          {time}
        </div>
        <div className="flex-1">
          <div className="font-medium">{title}</div>
          <div className="text-sm text-gray-500">
            Duration: {duration}
          </div>
          {status === 'active' && (
            <div className="mt-2 space-y-1">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Progress</span>
                <span>45%</span>
              </div>
              <div className="progress-bar">
                <Progress value={45} className="h-1" />
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {participants.map((participant, i) => (
              <Avatar key={i} className="h-8 w-8 border-2 border-white">
                <AvatarImage src={participant.image} alt={participant.name} />
                <AvatarFallback>{participant.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
            ))}
          </div>
          <Badge
            variant="secondary"
            className={
              status === 'active'
                ? 'bg-[#DC4A29]/10 text-[#DC4A29] border-0'
                : status === 'completed'
                ? 'bg-green-50 text-green-700 border-0'
                : 'bg-gray-100 text-gray-700 border-0'
            }
          >
            {status === 'active' ? 'In Progress' : status === 'completed' ? 'Completed' : 'Upcoming'}
          </Badge>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="flex items-center gap-1"
          >
            {status === 'active' && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-[#DC4A29]/10 hover:text-[#DC4A29]"
              >
                <Play className="h-4 w-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-gray-100"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}