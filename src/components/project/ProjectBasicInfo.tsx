import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';

export function ProjectBasicInfo() {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [isOngoing, setIsOngoing] = useState(false);

  return (
    <div className="space-y-6">
      {/* Project Name */}
      <div className="space-y-2">
        <Label className="text-sm font-semibold text-gray-900">Project Name</Label>
        <Input 
          placeholder="Enter project name..." 
          className="h-12"
        />
      </div>

      {/* Project Description */}
      <div className="space-y-2">
        <Label className="text-sm font-semibold text-gray-900">Description</Label>
        <Textarea 
          placeholder="Brief description of the project (optional)..." 
          className="min-h-[100px] resize-none"
        />
      </div>

      {/* Project Manager */}
      <div className="space-y-2">
        <Label className="text-sm font-semibold text-gray-900">Project Manager</Label>
        <Select>
          <SelectTrigger className="h-12">
            <SelectValue placeholder="Select project manager" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sarah">Sarah Chen</SelectItem>
            <SelectItem value="michael">Michael Scott</SelectItem>
            <SelectItem value="emma">Emma Wilson</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Project Status */}
      <div className="space-y-2">
        <Label className="text-sm font-semibold text-gray-900">Initial Status</Label>
        <Select>
          <SelectTrigger className="h-12">
            <SelectValue placeholder="Select project status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="planning">Planning</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="on-hold">On Hold</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Project Dates */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label className="text-sm font-semibold text-gray-900">Project Timeline</Label>
          <div className="flex items-center gap-2">
            <Switch
              checked={isOngoing}
              onCheckedChange={setIsOngoing}
            />
            <Label className="text-sm text-gray-500">Ongoing project</Label>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm text-gray-500">Start Date</Label>
            <div className="border rounded-lg">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                className="w-full"
              />
            </div>
          </div>
          {!isOngoing && (
            <div className="space-y-2">
              <Label className="text-sm text-gray-500">End Date</Label>
              <div className="border rounded-lg">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={setEndDate}
                  className="w-full"
                  disabled={(date) => date < (startDate || new Date())}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}