import { useState } from 'react';
import { 
  Mic, MicOff, Video, VideoOff, Users, MessageSquare, 
  Share2, Settings, Hand, X, MonitorUp, Clock,
  Link2, ChevronRight, ChevronLeft, Smile,
  MoreVertical, Minimize2, PencilLine, List,
  Highlighter, Tag, Volume2, Timer
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface MeetingInterfaceProps {
  onEndMeeting: () => void;
  onMinimize: () => void;
}

export function MeetingInterface({ onEndMeeting, onMinimize }: MeetingInterfaceProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isHandRaised, setIsHandRaised] = useState(false);
  const [showEndCallDialog, setShowEndCallDialog] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [sidebarTab, setSidebarTab] = useState('notes');
  const [activeSpeaker, setActiveSpeaker] = useState(0);
  const [isRecording, setIsRecording] = useState(true);
  const [elapsedTime, setElapsedTime] = useState('00:15:23');

  const participants = [
    { id: 1, name: 'Sarah Thompson', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1024', isMuted: false, hasHandRaised: false },
    { id: 2, name: 'Michael Scott', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400', isMuted: true, hasHandRaised: true },
    { id: 3, name: 'Emma Wilson', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400', isMuted: false, hasHandRaised: false },
    { id: 4, name: 'David Kim', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400', isMuted: true, hasHandRaised: false },
  ];

  return (
    <div className="fixed inset-0 bg-[#0A0A0A] text-white">
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-[#1A1A1A]/80 backdrop-blur-md z-10 flex items-center justify-between px-8">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#DC4A29]/10 flex items-center justify-center">
            <Users className="h-5 w-5 text-[#DC4A29]" />
          </div>
          <div>
            <h2 className="font-medium">User Testing Session</h2>
            <p className="text-sm text-gray-400">E-commerce Platform</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-gray-400" />
            <span className="text-gray-400">{elapsedTime}</span>
          </div>
          <Badge 
            variant="secondary" 
            className={`${isRecording ? 'bg-[#DC4A29]/10 text-[#DC4A29]' : 'bg-gray-800 text-gray-400'} border-0 cursor-pointer transition-colors duration-300`}
            onClick={() => setIsRecording(!isRecording)}
          >
            {isRecording ? 'Recording' : 'Start Recording'}
          </Badge>
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-gray-800">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-full pt-16">
        {/* Video Grid */}
        <div className={`flex-1 p-4 transition-all duration-300 ${showSidebar ? 'pr-[400px]' : ''}`}>
          <div className="grid grid-cols-2 gap-4 h-full">
            {/* Main Speaker */}
            <div 
              className={`col-span-2 lg:col-span-1 relative rounded-2xl overflow-hidden bg-gray-800 aspect-video ring-4 ${
                activeSpeaker === 0 ? 'ring-[#DC4A29]/30' : 'ring-transparent'
              } transition-all duration-300`}
            >
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1024"
                alt="Speaker"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <Badge variant="secondary" className="bg-black/50 text-white border-0">
                  Sarah Thompson (You)
                </Badge>
                <Badge variant="secondary" className="bg-black/50 text-white border-0">
                  Host
                </Badge>
              </div>
              {isMuted && (
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-red-500/90 text-white border-0">
                    <MicOff className="h-3 w-3 mr-1" /> Muted
                  </Badge>
                </div>
              )}
            </div>

            {/* Other Participants */}
            <div className="col-span-2 lg:col-span-1 grid grid-cols-2 gap-4">
              {participants.slice(1).map((participant) => (
                <div 
                  key={participant.id}
                  className={`relative rounded-2xl overflow-hidden bg-gray-800 aspect-video ring-4 ${
                    activeSpeaker === participant.id ? 'ring-[#DC4A29]/30' : 'ring-transparent'
                  } transition-all duration-300`}
                >
                  <img
                    src={participant.image}
                    alt={participant.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <Badge variant="secondary" className="bg-black/50 text-white border-0">
                      {participant.name}
                    </Badge>
                  </div>
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    {participant.isMuted && (
                      <Badge variant="secondary" className="bg-red-500/90 text-white border-0">
                        <MicOff className="h-3 w-3 mr-1" /> Muted
                      </Badge>
                    )}
                    {participant.hasHandRaised && (
                      <Badge variant="secondary" className="bg-[#DC4A29]/90 text-white border-0">
                        <Hand className="h-3 w-3 mr-1" /> Hand Raised
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Unified Sidebar */}
        <AnimatePresence>
          {showSidebar && (
            <motion.div
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              exit={{ x: 400 }}
              className="absolute right-0 top-16 bottom-[100px] w-[400px] bg-[#1A1A1A] border-l border-gray-800"
            >
              <Tabs value={sidebarTab} onValueChange={setSidebarTab}>
                <TabsList className="w-full justify-start border-b border-gray-800 rounded-none h-12 bg-transparent px-4">
                  <TabsTrigger 
                    value="notes" 
                    className="relative h-12 rounded-none border-b-2 border-transparent data-[state=active]:border-[#DC4A29] data-[state=active]:bg-transparent"
                  >
                    Notes
                  </TabsTrigger>
                  <TabsTrigger 
                    value="chat" 
                    className="relative h-12 rounded-none border-b-2 border-transparent data-[state=active]:border-[#DC4A29] data-[state=active]:bg-transparent"
                  >
                    Chat
                  </TabsTrigger>
                  <TabsTrigger 
                    value="participants" 
                    className="relative h-12 rounded-none border-b-2 border-transparent data-[state=active]:border-[#DC4A29] data-[state=active]:bg-transparent"
                  >
                    Participants
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="notes" className="p-4 h-[calc(100%-48px)]">
                  <div className="space-y-4 h-full flex flex-col">
                    <Input 
                      placeholder="Meeting title..."
                      className="bg-transparent border-gray-800 h-12 focus:border-[#DC4A29]/50"
                    />
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>Started at 10:00 AM</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>{participants.length} participants</span>
                      </div>
                    </div>
                    <div className="flex-1 relative">
                      <ScrollArea className="absolute inset-0">
                        <div className="space-y-4">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-full hover:bg-gray-800"
                            >
                              <List className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-full hover:bg-gray-800"
                            >
                              <Highlighter className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-full hover:bg-gray-800"
                            >
                              <Tag className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="space-y-2">
                            <Input 
                              placeholder="Take notes..."
                              className="bg-transparent border-gray-800"
                            />
                          </div>
                        </div>
                      </ScrollArea>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="chat" className="h-[calc(100%-48px)] flex flex-col">
                  <ScrollArea className="flex-1 p-4">
                    {/* Chat messages would go here */}
                  </ScrollArea>
                  <div className="p-4 border-t border-gray-800">
                    <div className="flex items-center gap-2">
                      <Input 
                        placeholder="Type a message..."
                        className="bg-transparent border-gray-800 h-12 focus:border-[#DC4A29]/50"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-12 w-12 rounded-full hover:bg-gray-800"
                      >
                        <Smile className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="participants" className="h-[calc(100%-48px)]">
                  <ScrollArea className="h-full">
                    <div className="p-4 space-y-2">
                      {participants.map((participant) => (
                        <div
                          key={participant.id}
                          className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-800/50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={participant.image} alt={participant.name} />
                              <AvatarFallback>{participant.name.slice(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{participant.name}</div>
                              <div className="text-sm text-gray-400 flex items-center gap-2">
                                {participant.isMuted ? (
                                  <MicOff className="h-3 w-3" />
                                ) : (
                                  <Volume2 className="h-3 w-3" />
                                )}
                                {participant.hasHandRaised && (
                                  <Hand className="h-3 w-3 text-[#DC4A29]" />
                                )}
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full hover:bg-gray-700"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 h-[100px] bg-[#1A1A1A] border-t border-gray-800">
          <div className="flex items-center justify-between h-full px-8">
            {/* Left Controls */}
            <div className="flex items-center gap-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={isMuted ? "destructive" : "secondary"}
                      size="icon"
                      className="h-12 w-12 rounded-full"
                      onClick={() => setIsMuted(!isMuted)}
                    >
                      {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isMuted ? 'Unmute' : 'Mute'}</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={isVideoOff ? "destructive" : "secondary"}
                      size="icon"
                      className="h-12 w-12 rounded-full"
                      onClick={() => setIsVideoOff(!isVideoOff)}
                    >
                      {isVideoOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isVideoOff ? 'Turn on camera' : 'Turn off camera'}</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant={isScreenSharing ? "secondary" : "ghost"}
                          size="icon"
                          className="h-12 w-12 rounded-full hover:bg-gray-800"
                        >
                          <MonitorUp className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="w-56">
                        <DropdownMenuItem>Share Entire Screen</DropdownMenuItem>
                        <DropdownMenuItem>Share Window</DropdownMenuItem>
                        <DropdownMenuItem>Share Chrome Tab</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Share screen</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {/* Center Controls */}
            <div className="flex items-center gap-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={sidebarTab === 'participants' ? 'secondary' : 'ghost'}
                      size="icon"
                      className="h-12 w-12 rounded-full hover:bg-gray-800"
                      onClick={() => {
                        setSidebarTab('participants');
                        setShowSidebar(true);
                      }}
                    >
                      <Users className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Show participants</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={sidebarTab === 'chat' ? 'secondary' : 'ghost'}
                      size="icon"
                      className="h-12 w-12 rounded-full hover:bg-gray-800"
                      onClick={() => {
                        setSidebarTab('chat');
                        setShowSidebar(true);
                      }}
                    >
                      <MessageSquare className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Open chat</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-12 w-12 rounded-full hover:bg-gray-800"
                      onClick={() => setIsHandRaised(!isHandRaised)}
                    >
                      <Hand className={`h-5 w-5 ${isHandRaised ? 'text-[#DC4A29]' : ''}`} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isHandRaised ? 'Lower hand' : 'Raise hand'}</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-12 w-12 rounded-full hover:bg-gray-800"
                      onClick={() => setShowSidebar(!showSidebar)}
                    >
                      {showSidebar ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{showSidebar ? 'Hide sidebar' : 'Show sidebar'}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-12 w-12 rounded-full hover:bg-gray-800"
                    >
                      <Link2 className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Copy meeting link</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-12 w-12 rounded-full hover:bg-gray-800"
                    >
                      <Settings className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Settings</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-12 w-12 rounded-full hover:bg-gray-800"
                      onClick={onMinimize}
                    >
                      <Minimize2 className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Minimize</p>
                  </TooltipContent>
                </Tooltip>

                <Button
                  variant="destructive"
                  className="px-6 rounded-full bg-red-600 hover:bg-red-700"
                  onClick={() => setShowEndCallDialog(true)}
                >
                  End Call
                </Button>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </div>

      {/* End Call Dialog */}
      <Dialog open={showEndCallDialog} onOpenChange={setShowEndCallDialog}>
        <DialogContent className="sm:max-w-[425px] bg-[#1A1A1A] text-white border-gray-800">
          <DialogHeader>
            <DialogTitle>End Meeting</DialogTitle>
            <DialogDescription className="text-gray-400">
              Are you sure you want to end this meeting?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-3">
            <Button
              variant="ghost"
              onClick={() => setShowEndCallDialog(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={onEndMeeting}
            >
              End Meeting
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}