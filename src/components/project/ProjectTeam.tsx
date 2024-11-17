import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const teamMembers = [
  { id: '1', name: 'Sarah Chen', role: 'UX Designer', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100' },
  { id: '2', name: 'Michael Scott', role: 'Product Manager', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100' },
  { id: '3', name: 'Emma Wilson', role: 'Developer', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100' },
  { id: '4', name: 'David Kim', role: 'UI Designer', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100' },
];

export function ProjectTeam() {
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Search Members */}
      <div className="space-y-4">
        <Label className="text-sm font-semibold text-gray-900">Team Members</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search team members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12"
          />
        </div>
      </div>

      {/* Selected Members */}
      {selectedMembers.length > 0 && (
        <div className="space-y-2">
          <Label className="text-sm text-gray-500">Selected Members</Label>
          <div className="flex flex-wrap gap-2">
            {selectedMembers.map((memberId) => {
              const member = teamMembers.find(m => m.id === memberId);
              if (!member) return null;
              
              return (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <Badge
                    variant="secondary"
                    className="h-8 pl-2 pr-2 gap-2 bg-gray-100/80 hover:bg-gray-100"
                  >
                    <Avatar className="h-5 w-5">
                      <AvatarImage src={member.image} alt={member.name} />
                      <AvatarFallback>{member.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <span>{member.name}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 p-0 hover:bg-gray-200 rounded-full"
                      onClick={() => setSelectedMembers(prev => prev.filter(id => id !== member.id))}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Team Members List */}
      <div className="space-y-3">
        {filteredMembers.map((member) => (
          <motion.div
            key={member.id}
            initial={false}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className={`flex items-center justify-between p-4 rounded-xl border hover:border-[#DC4A29]/30 cursor-pointer transition-all duration-300 ${
                selectedMembers.includes(member.id) ? 'border-[#DC4A29] bg-[#DC4A29]/5' : ''
              }`}
              onClick={() => {
                setSelectedMembers(prev =>
                  prev.includes(member.id)
                    ? prev.filter(id => id !== member.id)
                    : [...prev, member.id]
                );
              }}
            >
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12 ring-2 ring-white shadow-md">
                  <AvatarImage src={member.image} alt={member.name} />
                  <AvatarFallback>{member.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{member.name}</div>
                  <div className="text-sm text-gray-500">{member.role}</div>
                </div>
              </div>
              <AnimatePresence>
                {selectedMembers.includes(member.id) && (
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

        {/* Add External Member */}
        <Button
          variant="outline"
          className="w-full justify-start gap-2 h-12 hover:border-[#DC4A29]/30 hover:text-[#DC4A29]"
        >
          <Plus className="h-4 w-4" /> Invite External Member
        </Button>
      </div>
    </div>
  );
}