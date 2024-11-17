import { Home, FolderGit2, Bell, Boxes } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  return (
    <div className={cn('w-16 bg-[#EAECEE] border-r border-gray-200 flex flex-col items-center py-4', className)}>
      {/* Logo */}
      <div className="mb-8">
        <div className="w-10 h-10 bg-[#DC4A29] rounded-full flex items-center justify-center">
          <Boxes className="h-6 w-6 text-white" />
        </div>
      </div>

      {/* Navigation - Using margin-top to center in viewport */}
      <div className="flex-1 flex flex-col items-center justify-center -mt-16 gap-6">
        <Button
          variant="ghost"
          size="icon"
          className="w-10 h-10 rounded-full hover:bg-[#DC4A29]/10 hover:text-[#DC4A29]"
        >
          <Home className="h-5 w-5 text-[#8d919c] stroke-[2]" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="w-10 h-10 rounded-full hover:bg-[#DC4A29]/10 hover:text-[#DC4A29]"
        >
          <FolderGit2 className="h-5 w-5 text-[#8d919c] stroke-[2]" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="w-10 h-10 rounded-full hover:bg-[#DC4A29]/10 hover:text-[#DC4A29]"
        >
          <Bell className="h-5 w-5 text-[#8d919c] stroke-[2]" />
        </Button>
      </div>

      {/* Profile */}
      <div className="mt-auto">
        <Avatar className="h-10 w-10">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100"
            alt="Profile"
            className="h-full w-full object-cover"
          />
          <AvatarFallback>AN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}