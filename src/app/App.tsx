import { useState } from 'react';
import { Search, Filter, Layers } from 'lucide-react';
import { ScenarioCard } from '@/app/components/ScenarioCard';
import { ScenarioDetail } from '@/app/components/ScenarioDetail';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';

// Mock data
const scenarios = [
  {
    id: 1,
    title: 'Проверка контрагента перед сделкой',
    description:
      'Комплексная проверка надежности партнера: финансовое состояние, судебные дела, связи с другими компаниями.',
    timeScope: 'Экономия 3-4 часа',
    complexity: 'Средняя',
    tools: ['База компаний', 'Судебная практика', 'Финансовая аналитика'],
    steps: [
      'Введите данные контрагента (ИНН, ОГРН или название)',
      'Получите досье: финансы, учредители, судебные дела',
      'Проанализируйте риски через автоматические оценки',
      'Сформируйте отчёт для руководства или клиента',
    ],
    detailTools: [
      {
        name: 'База контрагентов',
        description: 'Полная информация о компаниях, учредителях и связях',
        icon: 'database' as const,
      },
      {
        name: 'Судебная аналитика',
        description: 'История споров, арбитражные дела и исполнительные производства',
        icon: 'search' as const,
      },
      {
        name: 'Финансовый анализ',
        description: 'Отчётность, показатели рентабельности, кредитные риски',
        icon: 'chart' as const,
      },
    ],
  },
  {
    id: 2,
    title: 'Подготовка к судебному заседанию',
    description:
      'Сбор судебной практики по аналогичным делам, формирование позиции, подготовка процессуальных документов.',
    timeScope: 'Экономия 5-6 часов',
    complexity: 'Высокая',
    tools: ['Судебная практика', 'Шаблоны документов', 'Правовая база'],
    steps: [
      'Определите категорию спора и ключевые правовые вопросы',
      'Найдите релевантную судебную практику и правовые позиции',
      'Сформируйте аргументацию на основе прецедентов',
      'Подготовьте процессуальные документы по шаблонам',
      'Проведите репетицию с учётом контраргументов',
    ],
    detailTools: [
      {
        name: 'База судебных решений',
        description: 'Поиск по категориям дел, судам, судьям и ключевым вопросам',
        icon: 'search' as const,
      },
      {
        name: 'Конструктор документов',
        description: 'Готовые шаблоны исков, отзывов, ходатайств',
        icon: 'file' as const,
      },
      {
        name: 'Правовая база',
        description: 'Актуальное законодательство с комментариями',
        icon: 'database' as const,
      },
    ],
  },
  {
    id: 3,
    title: 'Проверка договора на риски',
    description:
      'Анализ условий договора, выявление скрытых рисков, сравнение с лучшими практиками и рекомендации по доработке.',
    timeScope: 'Экономия 2-3 часа',
    complexity: 'Средняя',
    tools: ['Анализатор договоров', 'Библиотека шаблонов', 'Правовая база'],
    steps: [
      'Загрузите текст договора в систему',
      'Получите автоматический анализ рисков по пунктам',
      'Сравните условия с рыночными стандартами',
      'Получите рекомендации по доработке формулировок',
      'Сформируйте протокол разногласий или письмо',
    ],
    detailTools: [
      {
        name: 'AI-анализатор договоров',
        description: 'Автоматическое выявление рисков и несбалансированных условий',
        icon: 'search' as const,
      },
      {
        name: 'Библиотека шаблонов',
        description: 'Проверенные формулировки для различных типов сделок',
        icon: 'file' as const,
      },
      {
        name: 'База судебной практики',
        description: 'Как суды толкуют спорные положения договоров',
        icon: 'database' as const,
      },
    ],
  },
  {
    id: 4,
    title: 'Регистрация товарного знака',
    description:
      'Проверка на охраноспособность, подготовка заявки в Роспатент, мониторинг процесса регистрации.',
    timeScope: 'Экономия 4-5 часов',
    complexity: 'Высокая',
    tools: ['База товарных знаков', 'Конструктор заявок', 'Мониторинг'],
    steps: [
      'Проверьте наличие схожих товарных знаков в реестре',
      'Оцените охраноспособность обозначения',
      'Подготовьте заявку с классификацией товаров/услуг',
      'Подайте документы в Роспатент через систему',
      'Отслеживайте статус регистрации в личном кабинете',
    ],
    detailTools: [
      {
        name: 'Реестр товарных знаков',
        description: 'Поиск по базе Роспатента с визуальным сравнением',
        icon: 'search' as const,
      },
      {
        name: 'Конструктор заявок',
        description: 'Формирование заявки с учетом требований ФИПС',
        icon: 'file' as const,
      },
      {
        name: 'Система мониторинга',
        description: 'Отслеживание статуса и уведомления о важных этапах',
        icon: 'database' as const,
      },
    ],
  },
  {
    id: 5,
    title: 'Разработка политики обработки персональных данных',
    description:
      'Создание комплекта документов для соответствия требованиям 152-ФЗ с учетом специфики бизнеса.',
    timeScope: 'Экономия 6-8 часов',
    complexity: 'Высокая',
    tools: ['Генератор документов', 'Правовая база', 'Чек-листы'],
    steps: [
      'Заполните анкету о процессах обработки данных',
      'Получите индивидуальный комплект документов',
      'Проверьте соответствие требованиям через чек-лист',
      'Настройте уведомления об изменениях в законодательстве',
      'Скачайте готовые документы для утверждения',
    ],
    detailTools: [
      {
        name: 'Генератор документов',
        description: 'Создание политик, согласий, уведомлений под ваш бизнес',
        icon: 'file' as const,
      },
      {
        name: 'Правовая база 152-ФЗ',
        description: 'Актуальное законодательство с разъяснениями Роскомнадзора',
        icon: 'database' as const,
      },
      {
        name: 'Чек-лист комплаенса',
        description: 'Проверка наличия всех необходимых документов и процедур',
        icon: 'search' as const,
      },
    ],
  },
  {
    id: 6,
    title: 'Взыскание задолженности с контрагента',
    description:
      'От претензионной работы до исполнительного производства: документы, стратегия, мониторинг.',
    timeScope: 'Экономия 4-5 часов',
    complexity: 'Средняя',
    tools: ['Шаблоны претензий', 'Судебная практика', 'Реестр должников'],
    steps: [
      'Подготовьте претензию с расчетом долга и процентов',
      'Получите рекомендации по досудебному урегулированию',
      'Сформируйте исковое заявление при необходимости',
      'Отслеживайте ход дела в арбитражном суде',
      'Найдите имущество должника для обращения взыскания',
    ],
    detailTools: [
      {
        name: 'Конструктор претензий',
        description: 'Автоматический расчет неустоек, процентов, убытков',
        icon: 'file' as const,
      },
      {
        name: 'База судебной практики',
        description: 'Как суды взыскивают задолженности в вашей ситуации',
        icon: 'search' as const,
      },
      {
        name: 'Реестр должников',
        description: 'Информация об активах, счетах, исполнительных производствах',
        icon: 'database' as const,
      },
    ],
  },
];

const categories = [
  'Все сценарии',
  'Работа с контрагентами',
  'Судебная работа',
  'Договорная работа',
  'Интеллектуальная собственность',
  'Комплаенс',
];

export default function App() {
  const [selectedScenario, setSelectedScenario] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все сценарии');

  const filteredScenarios = scenarios.filter((scenario) => {
    const matchesSearch =
      scenario.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scenario.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  if (selectedScenario !== null) {
    const scenario = scenarios.find((s) => s.id === selectedScenario);
    if (!scenario) return null;

    return (
      <ScenarioDetail
        title={scenario.title}
        description={scenario.description}
        steps={scenario.steps}
        tools={scenario.detailTools}
        onBack={() => setSelectedScenario(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center gap-3 mb-4">
            <Layers className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold">Рабочие сценарии</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl">
            Как юристы решают практические задачи с помощью экосистемы продуктов
          </p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Найти сценарий..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            Фильтры
          </Button>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 rounded-lg p-6">
            <div className="text-3xl font-bold text-blue-700 mb-2">
              {scenarios.length}
            </div>
            <div className="text-gray-700">Рабочих сценариев</div>
          </div>
          <div className="bg-green-50 rounded-lg p-6">
            <div className="text-3xl font-bold text-green-700 mb-2">40%</div>
            <div className="text-gray-700">Средняя экономия времени</div>
          </div>
          <div className="bg-purple-50 rounded-lg p-6">
            <div className="text-3xl font-bold text-purple-700 mb-2">15+</div>
            <div className="text-gray-700">Интегрированных инструментов</div>
          </div>
        </div>

        {/* Scenarios Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {filteredScenarios.map((scenario) => (
            <ScenarioCard
              key={scenario.id}
              title={scenario.title}
              description={scenario.description}
              timeScope={scenario.timeScope}
              complexity={scenario.complexity}
              tools={scenario.tools}
              onClick={() => setSelectedScenario(scenario.id)}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredScenarios.length === 0 && (
          <div className="text-center py-16">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Сценарии не найдены
            </h3>
            <p className="text-gray-500">
              Попробуйте изменить параметры поиска
            </p>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="max-w-7xl mx-auto px-6 py-12 mt-12 border-t">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-3">
              Что такое рабочие сценарии?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Это готовые пути решения конкретных задач юриста. Каждый сценарий —
              это последовательность действий, где инструменты экосистемы работают
              как единая среда, экономя ваше время и минимизируя ошибки.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">
              Как использовать сценарии?
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Выберите задачу, с которой столкнулись. Следуйте этапам работы.
              Используйте рекомендованные инструменты. Система сама подскажет, что
              делать дальше и какой продукт поможет на каждом шаге.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
