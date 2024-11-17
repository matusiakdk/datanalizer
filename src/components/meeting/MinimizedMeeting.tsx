import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Maximize2, X, Mic, Video } from 'lucide-react';

interface MinimizedMeetingProps {
  onMaximize: () => void;
  onEndMeeting: () => void;
}

export function MinimizedMeeting({ onMaximize, onEndMeeting }: MinimizedMeetingProps) {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-6 right-6 w-[320px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100"
    >
      {/* Preview */}
      <div className="relative h-[180px] bg-gray-900">
        <img
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400"
          alt="Meeting Preview"
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Participant Count */}
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="bg-black/50 text-white border-0">
            5 Participants
          </Badge>
        </div>

        {/* Controls */}
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full bg-black/50 text-white hover:bg-black/70"
            onClick={onMaximize}
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full bg-black/50 text-white hover:bg-red-600"
            onClick={onEndMeeting}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Meeting Info */}
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 ring-2 ring-white">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100"
                  alt="You"
                  className="h-full w-full object-cover"
                />
              </Avatar>
              <div>
                <div className="text-white font-medium">User Testing Session</div>
                <div className="text-xs text-gray-300">E-commerce Platform</div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full bg-black/50 text-white hover:bg-black/70"
              >
                <Mic className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full bg-black/50 text-white hover:bg-black/70"
              >
                <Video className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}