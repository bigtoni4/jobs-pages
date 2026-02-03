import { ArrowLeft, CheckCircle2, FileText, Database, Search, BarChart3 } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';

interface Tool {
  name: string;
  description: string;
  icon: 'file' | 'database' | 'search' | 'chart';
}

interface ScenarioDetailProps {
  title: string;
  description: string;
  steps: string[];
  tools: Tool[];
  onBack: () => void;
}

const iconMap = {
  file: FileText,
  database: Database,
  search: Search,
  chart: BarChart3,
};

export function ScenarioDetail({
  title,
  description,
  steps,
  tools,
  onBack,
}: ScenarioDetailProps) {
  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <Button
        variant="ghost"
        className="mb-6 gap-2"
        onClick={onBack}
      >
        <ArrowLeft className="w-4 h-4" />
        Назад к сценариям
      </Button>

      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <p className="text-xl text-gray-600">{description}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Steps */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Этапы работы</h2>
          <div className="space-y-3">
            {steps.map((step, index) => (
              <div key={index} className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-semibold">
                  {index + 1}
                </div>
                <div className="flex-1 pt-1">
                  <p className="text-gray-700">{step}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tools */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Инструменты</h2>
          <div className="space-y-4">
            {tools.map((tool, index) => {
              const Icon = iconMap[tool.icon];
              return (
                <Card key={index} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{tool.name}</h3>
                      <p className="text-sm text-gray-600">{tool.description}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-12 bg-green-50 border-2 border-green-200 rounded-lg p-6">
        <div className="flex gap-3">
          <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-green-900 mb-2">
              Результат сценария
            </h3>
            <p className="text-green-800">
              Вы получите полное понимание ситуации, готовые документы и минимизацию рисков. 
              Экосистема продуктов экономит до 40% времени на выполнении этой задачи.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
