import { Search, Users, Settings, Bell, Plus, CalendarDays, Play, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { ScheduleMeetingDialog } from '@/components/meeting/ScheduleMeetingDialog';
import { CreateProjectDialog } from '@/components/project/CreateProjectDialog';

interface TopBarProps {
  onStartMeeting: () => void;
}

export function TopBar({ onStartMeeting }: TopBarProps) {
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  const [projectDialogOpen, setProjectDialogOpen] = useState(false);

  return (
    <>
      <div className="bg-gradient-to-b from-white via-white to-[#FAFAFA] sticky top-0 z-50 h-[33vh] shadow-sm">
        <div className="max-w-[1920px] mx-auto">
          {/* Top Section */}
          <div className="flex h-16 items-center justify-between px-8 pt-6">
            {/* Logo and Brand */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4"
            >
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#DC4A29] to-[#E85C3A] rounded-2xl blur opacity-40 group-hover:opacity-60 transition duration-300" />
                <div className="relative w-12 h-12 bg-gradient-to-br from-[#DC4A29] to-[#E85C3A] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#DC4A29]/20 hover:shadow-xl hover:shadow-[#DC4A29]/30 transition-all duration-300">
                  <Users className="h-6 w-6" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                  Datanalizer
                </span>
                <span className="text-sm text-gray-500 tracking-wide">
                  User Research Platform
                </span>
              </div>
            </motion.div>

            {/* Right Section */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-6"
            >
              {/* Search */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-white rounded-full blur-xl opacity-80" />
                <div className="relative flex items-center">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-hover:text-[#DC4A29] transition-colors" />
                  <Input 
                    type="text" 
                    placeholder="Search for a project, interview or tester..." 
                    className="w-[320px] h-10 pl-9 pr-4 rounded-full border-gray-200 bg-white/80 backdrop-blur-sm focus:bg-white text-sm transition-all duration-300 hover:border-[#DC4A29]/30 focus:border-[#DC4A29] focus:ring-[#DC4A29]/20 shadow-sm"
                  />
                </div>
              </div>

              {/* Action Icons */}
              <div className="flex items-center gap-3">
                {/* Notification Badge */}
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 rounded-xl bg-white hover:bg-[#DC4A29]/10 hover:text-[#DC4A29] transition-all duration-300 shadow-sm"
                  >
                    <Bell className="h-5 w-5 text-gray-600" />
                  </Button>
                  <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#DC4A29] ring-2 ring-white animate-pulse" />
                </div>

                {/* Settings */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-xl bg-white hover:bg-[#DC4A29]/10 hover:text-[#DC4A29] transition-all duration-300 shadow-sm"
                >
                  <Settings className="h-5 w-5 text-gray-600" />
                </Button>

                {/* Profile */}
                <div className="flex items-center gap-3 pl-2">
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-medium text-gray-900">Dominika Matusiak</span>
                    <span className="text-xs text-gray-500">UX Researcher</span>
                  </div>
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#DC4A29] to-[#E85C3A] rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-300" />
                    <Avatar className="relative h-10 w-10 ring-2 ring-white shadow-md">
                      <img
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100"
                        alt="Profile"
                        className="h-full w-full object-cover"
                      />
                      <AvatarFallback>DM</AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Section */}
          <div className="px-8 absolute bottom-8 w-full">
            <div className="flex items-center justify-between">
              {/* Welcome Message */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="relative"
              >
                <h2 className="text-6xl font-bold">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700">
                    Hello, Domi
                  </span>
                  <span className="ml-4 animate-float inline-block">👋</span>
                </h2>
              </motion.div>

              {/* Date and Action Buttons */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-8"
              >
                {/* Date Circle */}
                <div className="flex items-center group">
                  <div className="relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#DC4A29] to-[#E85C3A] rounded-full blur opacity-25 group-hover:opacity-40 transition duration-300" />
                    <div className="relative w-[56px] h-[56px] rounded-full bg-white shadow-lg flex items-center justify-center transition-transform group-hover:scale-105">
                      <div className="text-center">
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-[#DC4A29] to-[#E85C3A]">19</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col ml-3">
                    <span className="text-sm font-medium text-gray-900">Tue,</span>
                    <span className="text-sm text-gray-500">December</span>
                  </div>
                </div>

                {/* Separator Line */}
                <div className="h-8 w-px bg-gradient-to-b from-gray-200 to-transparent" />

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button 
                    variant="outline"
                    className="h-9 px-4 rounded-full border-gray-200 text-sm hover:bg-[#DC4A29]/10 hover:text-[#DC4A29] hover:border-[#DC4A29]/30 transition-all duration-300 shadow-sm"
                    onClick={() => setProjectDialogOpen(true)}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Project
                  </Button>

                  <Button 
                    variant="outline"
                    className="h-9 px-4 rounded-full border-gray-200 text-sm hover:bg-[#DC4A29]/10 hover:text-[#DC4A29] hover:border-[#DC4A29]/30 transition-all duration-300 shadow-sm"
                    onClick={() => setScheduleDialogOpen(true)}
                  >
                    <CalendarDays className="mr-2 h-4 w-4" />
                    Schedule Interview
                  </Button>

                  <Button 
                    variant="default"
                    className="h-9 px-4 rounded-full bg-gradient-to-r from-[#DC4A29] to-[#E85C3A] text-sm hover:shadow-lg hover:shadow-[#DC4A29]/20 transition-all duration-300"
                    onClick={onStartMeeting}
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Start a Meeting
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <ScheduleMeetingDialog 
        open={scheduleDialogOpen} 
        onOpenChange={setScheduleDialogOpen} 
      />
      <CreateProjectDialog 
        open={projectDialogOpen} 
        onOpenChange={setProjectDialogOpen} 
      />
    </>
  );
}