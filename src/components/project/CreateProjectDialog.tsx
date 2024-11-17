import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { X, Users, Calendar, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { ProjectBasicInfo } from './ProjectBasicInfo';
import { ProjectTeam } from './ProjectTeam';
import { ProjectGoals } from './ProjectGoals';
import { ProjectSettings } from './ProjectSettings';

interface CreateProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateProjectDialog({ open, onOpenChange }: CreateProjectDialogProps) {
  const [activeTab, setActiveTab] = useState('basic');

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: '📋', color: 'blue' },
    { id: 'team', label: 'Team', icon: '👥', color: 'purple' },
    { id: 'goals', label: 'Goals', icon: '🎯', color: 'green' },
    { id: 'settings', label: 'Settings', icon: '⚙️', color: 'orange' },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 gap-0 bg-white/95 backdrop-blur-xl border-none rounded-3xl shadow-[0_0_50px_-12px_rgba(0,0,0,0.25)] overflow-hidden sm:max-w-[800px]">
        <div className="flex flex-col h-full">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <DialogHeader className="p-8 pb-6 bg-gradient-to-b from-gray-50 to-white border-b">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <DialogTitle className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                    Create New Project
                  </DialogTitle>
                  <DialogDescription className="text-base">
                    Set up a new project and invite your team members
                  </DialogDescription>
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

          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-1 min-h-0">
            {/* Sidebar Navigation */}
            <div className="w-[200px] border-r border-gray-100 bg-gray-50/50 flex flex-col">
              <TabsList className="flex flex-col w-full bg-transparent space-y-1 px-3 mt-8">
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="w-full justify-start gap-3 px-4 py-2.5 h-auto data-[state=active]:bg-white"
                  >
                    <div className={`w-8 h-8 rounded-lg bg-${tab.color}-50 flex items-center justify-center`}>
                      {tab.icon}
                    </div>
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {/* Content Area */}
            <div className="flex-1 min-h-0">
              <ScrollArea className="h-full">
                <div className="p-6">
                  <TabsContent value="basic">
                    <ProjectBasicInfo />
                  </TabsContent>
                  <TabsContent value="team">
                    <ProjectTeam />
                  </TabsContent>
                  <TabsContent value="goals">
                    <ProjectGoals />
                  </TabsContent>
                  <TabsContent value="settings">
                    <ProjectSettings />
                  </TabsContent>
                </div>
              </ScrollArea>
            </div>
          </Tabs>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="p-8 pt-6 border-t bg-gradient-to-t from-gray-50 to-white"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Users className="h-4 w-4" />
                  <span>0 team members</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="h-4 w-4" />
                  <span>Starting today</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Globe className="h-4 w-4" />
                  <span>Public project</span>
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
                >
                  Create Project
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}