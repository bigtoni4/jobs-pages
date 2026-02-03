import { ArrowRight, Clock, Users } from 'lucide-react';
import { Card } from '@/app/components/ui/card';

interface ScenarioCardProps {
  title: string;
  description: string;
  timeScope: string;
  complexity: string;
  tools: string[];
  onClick: () => void;
}

export function ScenarioCard({
  title,
  description,
  timeScope,
  complexity,
  tools,
  onClick,
}: ScenarioCardProps) {
  return (
    <Card
      className="p-6 hover:shadow-lg transition-all cursor-pointer border-2 hover:border-blue-500 group"
      onClick={onClick}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-semibold group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
        </div>

        <p className="text-gray-600 leading-relaxed">{description}</p>

        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{timeScope}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{complexity}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-2 border-t">
          {tools.map((tool, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
}
