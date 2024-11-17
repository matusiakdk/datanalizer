import { motion, AnimatePresence } from 'framer-motion';
import { ProjectCard } from './ProjectGridCard';
import { ProjectExpanded } from './ProjectExpanded';

interface ProjectGridProps {
  viewMode: 'grid' | 'list';
  searchQuery: string;
  expandedProjectId: string | null;
  onProjectClick: (id: string | null) => void;
}

const projects = [
  {
    id: '1',
    name: 'E-commerce Platform',
    status: 'In Progress',
    description: 'Redesigning the user experience for our flagship e-commerce platform with focus on mobile responsiveness and checkout optimization.',
    progress: 65,
    sessionCount: 12,
    lastUpdated: '2h ago',
    color: '#4F46E5',
    team: [
      { name: 'Sarah Chen', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100' },
      { name: 'Michael Scott', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100' },
      { name: 'Emma Wilson', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100' }
    ],
    stats: {
      completedTasks: 24,
      totalTasks: 36,
      completedSessions: 8,
      plannedSessions: 15
    },
    meetings: [
      {
        id: '1',
        title: 'User Testing Session',
        date: '2024-03-20',
        time: '10:00 AM',
        status: 'Completed',
        participants: [
          { name: 'Sarah Chen', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100' },
          { name: 'Michael Scott', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100' }
        ]
      },
      {
        id: '2',
        title: 'Design Review',
        date: '2024-03-21',
        time: '2:30 PM',
        status: 'Scheduled',
        participants: [
          { name: 'Emma Wilson', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100' }
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'Healthcare App',
    status: 'On Hold',
    description: 'A comprehensive healthcare application focused on patient engagement and telemedicine capabilities.',
    progress: 35,
    sessionCount: 8,
    lastUpdated: '1d ago',
    color: '#DC4A29',
    team: [
      { name: 'David Kim', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100' },
      { name: 'Lisa Johnson', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100' }
    ],
    stats: {
      completedTasks: 12,
      totalTasks: 45,
      completedSessions: 4,
      plannedSessions: 12
    },
    meetings: []
  },
  {
    id: '3',
    name: 'Banking Platform',
    status: 'Completed',
    description: 'Modern banking platform with focus on security, user experience, and real-time transactions.',
    progress: 100,
    sessionCount: 15,
    lastUpdated: '3d ago',
    color: '#0EA5E9',
    team: [
      { name: 'John Doe', image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=100' },
      { name: 'Sarah Chen', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100' },
      { name: 'Emma Wilson', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100' }
    ],
    stats: {
      completedTasks: 52,
      totalTasks: 52,
      completedSessions: 15,
      plannedSessions: 15
    },
    meetings: []
  }
];

export function ProjectGrid({ viewMode, searchQuery, expandedProjectId, onProjectClick }: ProjectGridProps) {
  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const expandedProject = projects.find(p => p.id === expandedProjectId);

  return (
    <motion.div layout>
      <div className={
        viewMode === 'grid'
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
          : 'space-y-4'
      }>
        {filteredProjects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onProjectClick(project.id === expandedProjectId ? null : project.id)}
          >
            <ProjectCard 
              project={project} 
              viewMode={viewMode}
              isExpanded={project.id === expandedProjectId}
            />
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {expandedProject && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6"
          >
            <ProjectExpanded 
              project={expandedProject}
              onClose={() => onProjectClick(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}