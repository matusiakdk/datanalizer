import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Upload, Lock, Globe, Plus, DollarSign } from 'lucide-react';

export function ProjectSettings() {
  const [isPublic, setIsPublic] = useState(true);

  return (
    <div className="space-y-8">
      {/* Privacy Settings */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-gray-900">Privacy Settings</Label>
          <p className="text-sm text-gray-500">Control who can access and view this project</p>
        </div>

        <div className="space-y-4">
          <div
            className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
              isPublic ? 'border-[#DC4A29] bg-[#DC4A29]/5' : ''
            }`}
            onClick={() => setIsPublic(true)}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                <Globe className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="font-medium">Public Project</div>
                <div className="text-sm text-gray-500">All team members can view and access</div>
              </div>
              <Switch checked={isPublic} />
            </div>
          </div>

          <div
            className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
              !isPublic ? 'border-[#DC4A29] bg-[#DC4A29]/5' : ''
            }`}
            onClick={() => setIsPublic(false)}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                <Lock className="h-5 w-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <div className="font-medium">Private Project</div>
                <div className="text-sm text-gray-500">Only selected members can access</div>
              </div>
              <Switch checked={!isPublic} />
            </div>
          </div>
        </div>
      </div>

      {/* Budget Settings */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-gray-900">Budget Settings</Label>
          <p className="text-sm text-gray-500">Set and manage the project budget</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-sm text-gray-700">Budget Amount</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input className="pl-10 h-12" placeholder="Enter budget amount" />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-gray-700">Budget Type</Label>
            <Select>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select budget type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="fixed">Fixed Budget</SelectItem>
                <SelectItem value="hourly">Hourly Rate</SelectItem>
                <SelectItem value="milestone">Milestone Based</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Attachments */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-gray-900">Project Attachments</Label>
          <p className="text-sm text-gray-500">Upload relevant project files and documentation</p>
        </div>

        <div className="border-2 border-dashed rounded-xl p-8 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-gray-50 mx-auto flex items-center justify-center">
            <Upload className="h-6 w-6 text-gray-400" />
          </div>
          <div>
            <p className="text-sm font-medium">Drop files here or click to upload</p>
            <p className="text-sm text-gray-500">Support for documents, images, and PDFs</p>
          </div>
          <Button variant="outline" className="mt-4">
            Choose Files
          </Button>
        </div>
      </div>

      {/* Custom Fields */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-sm font-semibold text-gray-900">Custom Fields</Label>
          <p className="text-sm text-gray-500">Add custom fields to track project-specific information</p>
        </div>

        <Button
          variant="outline"
          className="w-full justify-center gap-2 h-12 border-dashed hover:border-[#DC4A29]/30 hover:text-[#DC4A29]"
        >
          <Plus className="h-4 w-4" /> Add Custom Field
        </Button>
      </div>
    </div>
  );
}