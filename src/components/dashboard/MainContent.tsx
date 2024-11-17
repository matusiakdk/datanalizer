import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, Clock, Users, ChevronLeft, Maximize2, Calendar } from 'lucide-react';
import { ProjectCard } from './ProjectCard';
import { MeetingCard } from './MeetingCard';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { format, addDays, subDays } from 'date-fns';

const projects = [
  {
    id: '1',
    name: 'E-commerce Platform',
    status: 'In Progress',
    description: 'Creating a comprehensive design system for a large e-commerce platform, focusing on scalability and consistency.',
    sessionCount: 5,
    lastUpdated: '2h ago',
    color: '#4F46E5',
    team: [
      { name: 'Sarah Chen', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100' },
      { name: 'Michael Scott', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100' },
      { name: 'Emma Wilson', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100' }
    ]
  },
  {
    id: '2',
    name: 'Healthcare App',
    status: 'Pending Review',
    description: 'Conducting in-depth user research for a healthcare startup, including interviews and usability testing.',
    sessionCount: 3,
    lastUpdated: '4h ago',
    color: '#DC4A29',
    team: [
      { name: 'David Kim', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100' },
      { name: 'Lisa Johnson', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100' }
    ]
  },
  {
    id: '3',
    name: 'Banking Platform',
    status: 'Completed',
    description: 'Developing a cross-platform mobile application for a banking provider with focus on security and user experience.',
    sessionCount: 8,
    lastUpdated: '1d ago',
    color: '#0EA5E9',
    team: [
      { name: 'John Doe', image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=100' },
      { name: 'Sarah Chen', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100' },
      { name: 'Emma Wilson', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100' }
    ]
  }
];

const timeSlots = [
  { time: '09:00', title: 'User Test 1', duration: '1h', status: 'completed' },
  { time: '10:30', title: 'Research Session', duration: '1.5h', status: 'active' },
  { time: '13:00', title: 'Team Review', duration: '1h', status: 'upcoming' },
  { time: '14:30', title: 'User Test 2', duration: '1h', status: 'upcoming' },
  { time: '16:00', title: 'Feedback Session', duration: '1h', status: 'upcoming' },
];

const meetings = [
  {
    userImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100',
    userName: 'Sarah Chen',
    testNumber: 1,
    projectName: 'E-commerce Platform',
    isApproved: true,
    time: '10:00 AM',
    details: {
      duration: '1h 30m',
      participants: [
        { image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100', name: 'Sarah Chen', role: 'UX Designer' },
        { image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100', name: 'Michael Scott', role: 'Product Manager' },
        { image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100', name: 'Emma Wilson', role: 'Developer' }
      ],
      platform: 'Zoom Meeting',
      notes: [
        'Discussed user onboarding flow improvements',
        'Identified pain points in checkout process',
        'Planned A/B testing for new features'
      ],
      actionItems: [
        'Create wireframes for new onboarding flow',
        'Schedule follow-up meeting with development team',
        'Prepare user testing script'
      ]
    }
  },
  {
    userImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100',
    userName: 'Michael Scott',
    testNumber: 2,
    projectName: 'Healthcare App',
    isApproved: false,
    time: '2:30 PM'
  },
  {
    userImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100',
    userName: 'Emma Wilson',
    testNumber: 3,
    projectName: 'Banking Platform',
    isApproved: true,
    time: '4:00 PM'
  }
];

export function MainContent() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const currentTime = new Date().getHours() + ':' + new Date().getMinutes().toString().padStart(2, '0');

  const handlePreviousDay = () => setSelectedDate(prev => subDays(prev, 1));
  const handleNextDay = () => setSelectedDate(prev => addDays(prev, 1));

  return (
    <div className="p-8 bg-[#F5F6F8]">
      <div className="grid grid-cols-3 gap-8">
        {/* Testing Tracker */}
        <div className="col-span-2">
          <Card className="rounded-2xl shadow-md bg-white border-0">
            <CardHeader className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#DC4A29]/10 rounded-xl flex items-center justify-center">
                      <Clock className="h-6 w-6 text-[#DC4A29]" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Testing Tracker</h2>
                      <p className="text-sm text-gray-500">
                        Track user testing sessions and monitor research progress
                      </p>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="h-9 px-4 rounded-full text-sm gap-2">
                  <Maximize2 className="h-4 w-4" /> Expand
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-8">
                {/* Date Column */}
                <div className="w-[240px] shrink-0">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full hover:bg-white"
                        onClick={handlePreviousDay}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full hover:bg-white"
                        onClick={handleNextDay}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="text-center space-y-1">
                      <div className="text-sm text-gray-500">{format(selectedDate, 'EEEE')}</div>
                      <div className="text-3xl font-semibold">{format(selectedDate, 'd')}</div>
                      <div className="text-sm text-gray-500">{format(selectedDate, 'MMMM')}</div>
                    </div>
                    <div className="mt-4 flex items-center justify-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-[#DC4A29]" />
                      <span className="text-sm text-gray-500">5 sessions today</span>
                    </div>
                  </div>
                </div>

                {/* Timeline Column */}
                <div className="flex-1 relative">
                  <ScrollArea className="h-[320px]">
                    <div className="space-y-3 pr-4">
                      {/* Current Time Indicator */}
                      <div 
                        className="absolute left-0 right-4 h-px bg-[#DC4A29] z-10"
                        style={{
                          top: `${(parseInt(currentTime.split(':')[0]) - 9) * (320 / 8)}px`,
                        }}
                      >
                        <div className="absolute -right-1 -top-1.5 w-3 h-3 rounded-full bg-[#DC4A29]" />
                      </div>

                      {timeSlots.map((slot, index) => (
                        <div
                          key={index}
                          className={`flex items-center gap-4 p-3 rounded-xl border transition-colors duration-300 ${
                            slot.status === 'active'
                              ? 'border-[#DC4A29] bg-[#DC4A29]/5'
                              : slot.status === 'completed'
                              ? 'border-gray-200 bg-gray-50'
                              : 'border-gray-200 hover:border-[#DC4A29]/30'
                          }`}
                        >
                          <div className="w-20 text-sm font-medium">
                            {slot.time}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">{slot.title}</div>
                            <div className="text-sm text-gray-500">
                              Duration: {slot.duration}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex -space-x-2">
                              {[1, 2, 3].map((i) => (
                                <Avatar key={i} className="h-8 w-8 border-2 border-white">
                                  <AvatarImage
                                    src={`https://images.unsplash.com/photo-${1507003211169 + i}-0a1dd7228f2d?q=80&w=100`}
                                    alt={`User ${i}`}
                                  />
                                  <AvatarFallback>U{i}</AvatarFallback>
                                </Avatar>
                              ))}
                            </div>
                            <Badge
                              variant="secondary"
                              className={
                                slot.status === 'active'
                                  ? 'bg-[#DC4A29]/10 text-[#DC4A29] border-0'
                                  : slot.status === 'completed'
                                  ? 'bg-green-50 text-green-700 border-0'
                                  : 'bg-gray-100 text-gray-700 border-0'
                              }
                            >
                              {slot.status === 'active' ? 'In Progress' : slot.status === 'completed' ? 'Completed' : 'Upcoming'}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Meetings */}
          <Card className="mt-8 rounded-2xl shadow-md bg-white border-0">
            <CardHeader className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#DC4A29]/10 rounded-xl flex items-center justify-center">
                      <Users className="h-6 w-6 text-[#DC4A29]" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Recent Meetings</h2>
                      <p className="text-sm text-gray-500">
                        View and manage your recent testing sessions
                      </p>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="h-9 px-4 rounded-full text-sm gap-2">
                  See all meetings <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[320px] pr-4">
                {meetings.map((meeting, index) => (
                  <MeetingCard key={index} {...meeting} />
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Your Recent Projects */}
        <Card className="rounded-2xl shadow-md bg-white border-0">
          <CardHeader className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#DC4A29]/10 rounded-xl flex items-center justify-center">
                    <Users className="h-6 w-6 text-[#DC4A29]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold tracking-tight text-gray-900">Your Recent Projects</h2>
                    <p className="text-sm text-gray-500">
                      Track and manage your ongoing research projects
                    </p>
                  </div>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="h-9 px-4 rounded-full text-sm gap-2"
                onClick={() => navigate('/projects')}
              >
                All Projects <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[calc(100vh-24rem)]">
              <div className="space-y-4 pr-4">
                {projects.map((project) => (
                  <ProjectCard key={project.id} {...project} />
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}