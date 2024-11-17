import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Filter, Grid2X2, List, Plus, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ProjectGrid } from './ProjectGrid';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CreateProjectDialog } from '@/components/project/CreateProjectDialog';

const filters = [
  { label: 'Status', options: ['All', 'In Progress', 'Completed', 'On Hold'] },
  { label: 'Sort By', options: ['Newest', 'Oldest', 'Name A-Z', 'Name Z-A'] },
  { label: 'Team Size', options: ['All', '1-3', '4-6', '7+'] },
];

export function AllProjects() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#F5F6F8]">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-b border-gray-200 sticky top-0 z-50"
      >
        <div className="max-w-[1920px] mx-auto px-8 py-6">
          {/* Top Section */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-6">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full hover:bg-gray-100"
                onClick={() => navigate('/')}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                  All Projects
                </h1>
                <div className="flex items-center gap-3 mt-1">
                  <Badge variant="secondary" className="bg-[#DC4A29]/10 text-[#DC4A29] hover:bg-[#DC4A29]/20">
                    12 Active Projects
                  </Badge>
                  <Badge variant="secondary" className="bg-green-50 text-green-700 hover:bg-green-100">
                    8 Completed
                  </Badge>
                  <Badge variant="secondary" className="bg-yellow-50 text-yellow-700 hover:bg-yellow-100">
                    4 On Hold
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="h-10 gap-2 hover:border-[#DC4A29]/30 hover:text-[#DC4A29]"
                onClick={() => setCreateDialogOpen(true)}
              >
                <Plus className="h-4 w-4" />
                New Project
              </Button>
            </div>
          </div>

          {/* Controls Section */}
          <div className="flex items-center justify-between">
            {/* Search and Filters */}
            <div className="flex items-center gap-4 flex-1">
              <div className="relative w-[320px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-10"
                />
              </div>

              <div className="flex items-center gap-3">
                {filters.map((filter) => (
                  <Select key={filter.label}>
                    <SelectTrigger className="h-10 w-[140px] bg-white">
                      <SelectValue placeholder={filter.label} />
                    </SelectTrigger>
                    <SelectContent>
                      {filter.options.map((option) => (
                        <SelectItem key={option} value={option.toLowerCase()}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ))}
              </div>
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
              <Button
                variant="ghost"
                size="icon"
                className={`h-8 w-8 rounded-md ${
                  viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-white/50'
                }`}
                onClick={() => setViewMode('grid')}
              >
                <Grid2X2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={`h-8 w-8 rounded-md ${
                  viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-white/50'
                }`}
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Content */}
      <div className="max-w-[1920px] mx-auto p-8">
        <ProjectGrid 
          viewMode={viewMode} 
          searchQuery={searchQuery} 
          expandedProjectId={expandedProjectId}
          onProjectClick={setExpandedProjectId}
        />
      </div>

      {/* Create Project Dialog */}
      <CreateProjectDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
      />
    </div>
  );
}