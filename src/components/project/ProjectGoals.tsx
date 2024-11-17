import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';

interface Goal {
  id: string;
  title: string;
  description: string;
}

export function ProjectGoals() {
  const [goals, setGoals] = useState<Goal[]>([
    { id: '1', title: '', description: '' }
  ]);

  const addGoal = () => {
    setGoals(prev => [...prev, { id: Date.now().toString(), title: '', description: '' }]);
  };

  const removeGoal = (id: string) => {
    setGoals(prev => prev.filter(goal => goal.id !== id));
  };

  const updateGoal = (id: string, field: keyof Goal, value: string) => {
    setGoals(prev => prev.map(goal =>
      goal.id === id ? { ...goal, [field]: value } : goal
    ));
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label className="text-sm font-semibold text-gray-900">Project Goals & Objectives</Label>
        <p className="text-sm text-gray-500">Define the key goals and objectives for this project</p>
      </div>

      <AnimatePresence>
        {goals.map((goal, index) => (
          <motion.div
            key={goal.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4 p-4 border rounded-xl bg-white/50"
          >
            <div className="flex items-start gap-4">
              <div className="mt-2 cursor-move">
                <GripVertical className="h-5 w-5 text-gray-400" />
              </div>
              
              <div className="flex-1 space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm text-gray-700">Goal Title</Label>
                  <Input
                    value={goal.title}
                    onChange={(e) => updateGoal(goal.id, 'title', e.target.value)}
                    placeholder="Enter goal title..."
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-gray-700">Description</Label>
                  <Textarea
                    value={goal.description}
                    onChange={(e) => updateGoal(goal.id, 'description', e.target.value)}
                    placeholder="Describe this goal in detail..."
                    className="min-h-[100px] resize-none"
                  />
                </div>
              </div>

              {goals.length > 1 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full hover:bg-red-50 hover:text-red-600"
                  onClick={() => removeGoal(goal.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      <Button
        variant="outline"
        className="w-full justify-center gap-2 h-12 border-dashed hover:border-[#DC4A29]/30 hover:text-[#DC4A29]"
        onClick={addGoal}
      >
        <Plus className="h-4 w-4" /> Add Another Goal
      </Button>
    </div>
  );
}