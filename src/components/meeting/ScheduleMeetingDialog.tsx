import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Users, Clock, CalendarDays, Video, ChevronRight, Search, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';

interface ScheduleMeetingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const meetingTypes = [
  { id: 'user-interview', label: 'User Interview', icon: '👤', description: 'One-on-one session with a user', duration: '45-60 minutes' },
  { id: 'focus-group', label: 'Focus Group', icon: '👥', description: 'Discussion with multiple participants', duration: '60-90 minutes' },
  { id: 'usability-testing', label: 'Usability Testing', icon: '🧪', description: 'Test specific features or flows', duration: '30-45 minutes' },
  { id: 'team-meeting', label: 'Team Meeting', icon: '🤝', description: 'Internal team collaboration', duration: '30-60 minutes' },
];

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00'
];

const participants = [
  { 
    id: '1', 
    name: 'Sarah Chen', 
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100',
    role: 'UX Designer',
    availableTimes: ['09:00', '09:30', '10:00', '14:30', '15:00']
  },
  { 
    id: '2', 
    name: 'Michael Scott', 
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100',
    role: 'Product Manager',
    availableTimes: ['11:00', '11:30', '14:30', '15:00', '15:30']
  },
  { 
    id: '3', 
    name: 'Emma Wilson', 
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100',
    role: 'Developer',
    availableTimes: ['09:00', '09:30', '14:30', '15:00', '15:30']
  }
];

const projects = [
  { id: '1', name: 'E-commerce Platform', color: '#4F46E5' },
  { id: '2', name: 'Healthcare App', color: '#DC4A29' },
  { id: '3', name: 'Banking Platform', color: '#0EA5E9' }
];

export function ScheduleMeetingDialog({ open, onOpenChange }: ScheduleMeetingDialogProps) {
  const [date, setDate] = useState<Date>(new Date());
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [meetingType, setMeetingType] = useState('user-interview');

  const filteredParticipants = participants.filter(participant =>
    participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    participant.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getTimeSlotStatus = (time: string) => {
    const availableCount = participants.filter(p => p.availableTimes.includes(time)).length;
    if (availableCount === participants.length) return 'all';
    if (availableCount > 0) return 'some';
    return 'none';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 gap-0 bg-white/95 backdrop-blur-xl border-none rounded-3xl shadow-[0_0_50px_-12px_rgba(0,0,0,0.25)] overflow-hidden sm:max-w-[800px]">
        <div className="flex flex-col h-full">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <DialogHeader className="p-8 pb-6 bg-gradient-to-b from-gray-50 to-white border-b">
              <div className="flex items-start justify-between">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <DialogTitle className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                      Schedule Interview
                    </DialogTitle>
                    <DialogDescription className="text-base">
                      Set up your next research session or team meeting
                    </DialogDescription>
                  </div>
                  
                  {/* Project Selection */}
                  <div className="w-[400px]">
                    <Select value={selectedProject} onValueChange={setSelectedProject}>
                      <SelectTrigger className="h-12 bg-white/50 backdrop-blur-sm hover:bg-white focus:bg-white transition-all duration-300">
                        <SelectValue placeholder="Select project" />
                      </SelectTrigger>
                      <SelectContent>
                        {projects.map((project) => (
                          <SelectItem key={project.id} value={project.id}>
                            <div className="flex items-center gap-3">
                              <div 
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: project.color }}
                              />
                              {project.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-gray-100"
                  onClick={() => onOpenChange(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </DialogHeader>
          </motion.div>

          <div className="flex flex-1 min-h-0">
            {/* Left Column - Calendar & Time Selection */}
            <div className="w-[340px] border-r border-gray-100 bg-gray-50/50 p-6">
              <div className="space-y-6">
                {/* Calendar */}
                <div className="bg-white rounded-xl border shadow-sm p-2">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="w-full"
                    classNames={{
                      day_selected: "bg-[#DC4A29] text-white hover:bg-[#DC4A29]/90",
                      day_today: "bg-[#DC4A29]/10 text-[#DC4A29]",
                    }}
                  />
                </div>

                {/* Time Slots */}
                <div className="space-y-4">
                  <Label className="text-sm font-medium text-gray-700">Available Time Slots</Label>
                  <ScrollArea className="h-[300px] pr-4">
                    <div className="grid grid-cols-2 gap-2">
                      {timeSlots.map((time) => {
                        const status = getTimeSlotStatus(time);
                        const availableCount = participants.filter(p => 
                          p.availableTimes.includes(time)
                        ).length;
                        
                        return (
                          <Button
                            key={time}
                            variant="outline"
                            className={cn(
                              "h-10 px-3 justify-center text-sm relative group",
                              selectedTime === time 
                                ? "border-[#DC4A29] bg-[#DC4A29]/5 text-[#DC4A29]" 
                                : status === 'all'
                                ? "border-green-200 text-green-700 hover:border-green-300"
                                : status === 'some'
                                ? "border-yellow-200 text-yellow-700 hover:border-yellow-300"
                                : "border-gray-200 text-gray-400"
                            )}
                            onClick={() => setSelectedTime(time)}
                            disabled={status === 'none'}
                          >
                            <div className="flex flex-col items-center">
                              <span>{time}</span>
                              <span className="text-xs text-gray-400">
                                {availableCount} available
                              </span>
                            </div>
                          </Button>
                        );
                      })}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </div>

            {/* Right Column - Meeting Type & Participants */}
            <div className="flex-1 flex flex-col">
              <ScrollArea className="flex-1">
                <div className="p-6 space-y-8">
                  {/* Meeting Type Selection */}
                  <div className="space-y-4">
                    <Label className="text-sm font-medium text-gray-700">Meeting Type</Label>
                    <RadioGroup
                      value={meetingType}
                      onValueChange={setMeetingType}
                      className="grid grid-cols-2 gap-3"
                    >
                      {meetingTypes.map((type) => (
                        <div key={type.id} className="relative">
                          <RadioGroupItem
                            value={type.id}
                            id={type.id}
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor={type.id}
                            className="flex items-start gap-3 p-4 border rounded-xl cursor-pointer hover:border-[#DC4A29]/30 peer-data-[state=checked]:border-[#DC4A29] peer-data-[state=checked]:bg-[#DC4A29]/5 transition-all duration-300"
                          >
                            <span className="text-2xl">{type.icon}</span>
                            <div className="flex-1">
                              <div className="font-medium">{type.label}</div>
                              <div className="text-sm text-gray-500 mt-1">{type.description}</div>
                              <div className="flex items-center gap-2 mt-2">
                                <Clock className="h-3.5 w-3.5 text-gray-400" />
                                <span className="text-xs text-gray-400">{type.duration}</span>
                              </div>
                            </div>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  {/* Participants Selection */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium text-gray-700">Participants</Label>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8"
                        onClick={() => {
                          const availableParticipants = participants
                            .filter(p => selectedTime ? p.availableTimes.includes(selectedTime) : true)
                            .map(p => p.id);
                          setSelectedParticipants(availableParticipants);
                        }}
                      >
                        Select All Available
                      </Button>
                    </div>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search participants..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 h-12"
                      />
                    </div>
                    <div className="space-y-3">
                      {filteredParticipants.map((participant) => (
                        <motion.div
                          key={participant.id}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                        >
                          <div
                            className={cn(
                              "flex items-center justify-between p-4 rounded-xl border hover:border-[#DC4A29]/30 cursor-pointer transition-all duration-300",
                              selectedParticipants.includes(participant.id) && "border-[#DC4A29] bg-[#DC4A29]/5"
                            )}
                            onClick={() => {
                              setSelectedParticipants((prev) =>
                                prev.includes(participant.id)
                                  ? prev.filter((id) => id !== participant.id)
                                  : [...prev, participant.id]
                              );
                            }}
                          >
                            <div className="flex items-center gap-4">
                              <Avatar className="h-12 w-12 ring-2 ring-white shadow-md">
                                <AvatarImage src={participant.image} alt={participant.name} />
                                <AvatarFallback>{participant.name.slice(0, 2)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{participant.name}</div>
                                <div className="text-sm text-gray-500">{participant.role}</div>
                                <div className="flex items-center gap-3 mt-1">
                                  <div className="flex items-center gap-1 text-xs">
                                    <CalendarDays className="h-3.5 w-3.5 text-gray-400" />
                                    <span className="text-gray-400">
                                      {participant.availableTimes.length} slots available
                                    </span>
                                  </div>
                                  {selectedTime && (
                                    <div className="flex items-center gap-1 text-xs">
                                      {participant.availableTimes.includes(selectedTime) ? (
                                        <>
                                          <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                                          <span className="text-green-500">Available at {selectedTime}</span>
                                        </>
                                      ) : (
                                        <>
                                          <AlertTriangle className="h-3.5 w-3.5 text-yellow-500" />
                                          <span className="text-yellow-500">Unavailable at {selectedTime}</span>
                                        </>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            <AnimatePresence>
                              {selectedParticipants.includes(participant.id) && (
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.8 }}
                                >
                                  <Badge className="bg-[#DC4A29]">Selected</Badge>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </motion.div>
                      ))}
                      <Button 
                        variant="outline" 
                        className="w-full justify-start gap-2 h-12 hover:border-[#DC4A29]/30 hover:text-[#DC4A29]"
                      >
                        <Plus className="h-4 w-4" /> Add External Participant
                      </Button>
                    </div>
                  </div>
                </div>
              </ScrollArea>

              {/* Footer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="p-6 border-t bg-gradient-to-t from-gray-50 to-white"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Users className="h-4 w-4" />
                      <span>{selectedParticipants.length} participants</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <CalendarDays className="h-4 w-4" />
                      <span>
                        {selectedTime 
                          ? `${format(date!, 'MMM d')} at ${selectedTime}`
                          : 'Select time'
                        }
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Video className="h-4 w-4" />
                      <span>Zoom Meeting</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      onClick={() => onOpenChange(false)}
                      className="h-11 px-6 hover:border-[#DC4A29]/30 hover:text-[#DC4A29]"
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={() => onOpenChange(false)}
                      className="h-11 px-6 bg-gradient-to-r from-[#DC4A29] to-[#E85C3A] hover:shadow-lg hover:shadow-[#DC4A29]/20"
                      disabled={!selectedProject || !selectedTime || selectedParticipants.length === 0}
                    >
                      Send Invites
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}