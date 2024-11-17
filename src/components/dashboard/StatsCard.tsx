import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string;
  trend?: {
    value: string;
    positive: boolean;
  };
}

export function StatsCard({ title, value, trend }: StatsCardProps) {
  return (
    <Card className="h-[100px] rounded-card shadow-lg">
      <CardContent className="p-4">
        <h3 className="text-sm font-medium text-muted-foreground mb-2">{title}</h3>
        <div className="flex items-baseline space-x-3">
          <span className="text-2xl font-bold">{value}</span>
          {trend && (
            <span
              className={cn(
                'text-sm',
                trend.positive ? 'text-green-600' : 'text-red-600'
              )}
            >
              {trend.value}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}