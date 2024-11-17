import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Clock, ChevronRight } from 'lucide-react';

interface ActivityCardProps {
  userImage: string;
  userName: string;
  testNumber: number;
  projectName: string;
  isApproved: boolean;
}

export function ActivityCard({ 
  userImage, 
  userName, 
  testNumber, 
  projectName, 
  isApproved 
}: ActivityCardProps) {
  return (
    <Card className="p-4 bg-white rounded-xl hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        {/* User Image */}
        <Avatar className="h-12 w-12 rounded-xl">
          <img
            src={userImage}
            alt={userName}
            className="h-full w-full object-cover"
          />
          <AvatarFallback>{userName.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-sm font-medium text-gray-900 truncate">User test {testNumber}</h3>
              <p className="text-sm text-gray-500">{projectName}</p>
            </div>
            <Badge 
              variant={isApproved ? "default" : "secondary"}
              className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                isApproved 
                  ? "bg-green-50 text-green-700 border border-green-200" 
                  : "bg-red-50 text-red-700 border border-red-200"
              }`}
            >
              {isApproved ? "Approved" : "Not Approved"}
            </Badge>
          </div>

          {/* Footer */}
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Clock className="h-3.5 w-3.5" />
              <span>2h ago</span>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>
    </Card>
  );
}