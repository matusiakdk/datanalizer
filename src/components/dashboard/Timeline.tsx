import { TimelineItem } from './TimelineItem';

const timelineData = [
  {
    title: 'Intro',
    progress: 100,
    users: [
      { name: 'Sarah Chen', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' },
      { name: 'Michael Scott', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d' }
    ],
    position: 20
  },
  {
    title: 'Audit',
    progress: 59,
    users: [
      { name: 'Emma Wilson', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80' }
    ],
    position: 50
  },
  {
    title: 'Research',
    progress: 75,
    users: [
      { name: 'David Kim', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e' },
      { name: 'Lisa Johnson', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2' },
      { name: 'John Doe', image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef' }
    ],
    active: true,
    position: 80
  }
];

const hours = ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00'];

export function Timeline() {
  return (
    <div className="relative h-[300px] px-4">
      {/* Vertical Timeline Line */}
      <div className="absolute top-0 bottom-0 right-8 w-px bg-[#DC4A29]">
        <div className="absolute top-[80%] right-0 w-3 h-3 rounded-full bg-[#DC4A29] -translate-x-1" />
      </div>
      
      {/* Vertical Grid Lines */}
      <div className="absolute inset-0 right-8 flex justify-between">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="w-px h-full bg-gray-100" />
        ))}
      </div>

      {/* Timeline Items */}
      {timelineData.map((item, i) => (
        <TimelineItem key={i} {...item} />
      ))}

      {/* Hours */}
      <div className="absolute bottom-0 left-0 right-8 flex justify-between">
        {hours.map((hour, i) => (
          <div key={i} className="text-sm text-muted-foreground -mb-6">{hour}</div>
        ))}
      </div>
    </div>
  );
}