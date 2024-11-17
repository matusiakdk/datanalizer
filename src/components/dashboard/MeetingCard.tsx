import { useState } from 'react';
import { ChevronDown, Clock, Users, Video, MessageSquare, Calendar, Link2, MoreVertical, CheckCircle2, AlertCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface MeetingCardProps {
  userImage: string;
  userName: string;
  testNumber: number;
  projectName: string;
  isApproved: boolean;
  time: string;
  details?: {
    duration: string;
    participants: Array<{ image: string; name: string; role: string }>;
    platform: string;
    notes: string[];
    actionItems: string[];
  };
}

export function MeetingCard({
  userImage,
  userName,
  testNumber,
  projectName,
  isApproved,
  time,
  details
}: MeetingCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div 
      layout
      className={cn(
        "py-3 first:pt-0 transition-colors duration-200",
        isExpanded ? "bg-gray-50/50" : "hover:bg-gray-50/30"
      )}
    >
      <div className="px-4">
        {/* Compact View */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Status Icon */}
            <div className="relative flex-shrink-0">
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center",
                isApproved ? "bg-green-50" : "bg-yellow-50"
              )}>
                {isApproved ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                )}
              </div>
            </div>

            {/* Meeting Info */}
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-gray-900">User test {testNumber}</h3>
                <Badge 
                  variant={isApproved ? "default" : "secondary"}
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[10px] font-medium",
                    isApproved 
                      ? "bg-green-50 text-green-700 border border-green-200" 
                      : "bg-yellow-50 text-yellow-700 border border-yellow-200"
                  )}
                >
                  {isApproved ? "Approved" : "In Review"}
                </Badge>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-sm text-gray-600">{projectName}</span>
                <span className="text-gray-300">•</span>
                <span className="text-sm text-gray-500">{time}</span>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Participants */}
            {details?.participants && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <div className="flex -space-x-2">
                      {details.participants.slice(0, 3).map((participant, i) => (
                        <Avatar key={i} className="h-8 w-8 ring-2 ring-white">
                          <img
                            src={participant.image}
                            alt={participant.name}
                            className="h-full w-full object-cover"
                          />
                          <AvatarFallback>{participant.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                      ))}
                      {details.participants.length > 3 && (
                        <div className="h-8 w-8 rounded-full bg-gray-100 ring-2 ring-white flex items-center justify-center text-xs font-medium text-gray-600">
                          +{details.participants.length - 3}
                        </div>
                      )}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="space-y-2">
                      {details.participants.map((participant, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <img src={participant.image} alt={participant.name} />
                          </Avatar>
                          <div>
                            <div className="text-sm font-medium">{participant.name}</div>
                            <div className="text-xs text-gray-500">{participant.role}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}

            {/* Expand Button */}
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-8 w-8 rounded-full hover:bg-gray-100 transition-transform duration-300",
                isExpanded && "rotate-180"
              )}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </Button>
          </div>
        </div>

        {/* Expanded Content */}
        <AnimatePresence>
          {isExpanded && details && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-4 pl-14 space-y-4"
            >
              {/* Meeting Details */}
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="font-medium">{details.duration}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</div>
                  <div className="flex items-center gap-2 text-sm">
                    <MessageSquare className="h-4 w-4 text-gray-400" />
                    <span className="font-medium">{details.notes.length} items</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Platform</div>
                  <div className="flex items-center gap-2 text-sm">
                    <Video className="h-4 w-4 text-gray-400" />
                    <span className="font-medium">{details.platform}</span>
                  </div>
                </div>
              </div>

              {/* Notes Preview */}
              <div className="bg-white rounded-lg p-3 space-y-2">
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Key Discussion Points</div>
                <ul className="space-y-1 list-disc pl-4 marker:text-gray-400">
                  {details.notes.map((note, i) => (
                    <li key={i} className="text-sm text-gray-600">{note}</li>
                  ))}
                </ul>
              </div>

              {/* Action Items */}
              {details.actionItems && details.actionItems.length > 0 && (
                <div className="bg-white rounded-lg p-3 space-y-2">
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Action Items</div>
                  <ul className="space-y-1">
                    {details.actionItems.map((item, i) => (
                      <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                        <div className="w-4 h-4 rounded border border-gray-200 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Quick Actions */}
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-8 rounded-full">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Add Comment
                </Button>
                <Button variant="outline" size="sm" className="h-8 rounded-full">
                  <Video className="h-4 w-4 mr-2" />
                  View Recording
                </Button>
                <Button variant="outline" size="sm" className="h-8 rounded-full">
                  <Link2 className="h-4 w-4 mr-2" />
                  Copy Link
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-3 border-t border-gray-100 last:hidden" />
    </motion.div>
  );
}