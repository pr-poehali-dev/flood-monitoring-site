import { useState, lazy, Suspense } from 'react';
import type { LucideIcon } from 'lucide-react';

const FloodMap = lazy(() => import('@/components/FloodMap'));
import Icon from '@/components/ui/icon';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const regions = [
    { name: 'Астана', risk: 'low', temp: 5, precip: 2.1, trend: 'stable' },
    { name: 'Алматы', risk: 'medium', temp: 12, precip: 15.3, trend: 'rising' },
    { name: 'Шымкент', risk: 'low', temp: 18, precip: 5.2, trend: 'stable' },
    { name: 'Караганда', risk: 'high', temp: 8, precip: 28.7, trend: 'critical' },
    { name: 'Актобе', risk: 'medium', temp: 10, precip: 12.4, trend: 'rising' },
    { name: 'Тараз', risk: 'critical', temp: 15, precip: 45.2, trend: 'critical' },
    { name: 'Павлодар', risk: 'medium', temp: 7, precip: 18.9, trend: 'rising' },
    { name: 'Усть-Каменогорск', risk: 'high', temp: 9, precip: 32.1, trend: 'critical' },
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-success text-white';
      case 'medium': return 'bg-warning text-white';
      case 'high': return 'bg-danger text-white';
      case 'critical': return 'bg-critical text-white';
      default: return 'bg-muted';
    }
  };

  const getRiskLabel = (risk: string) => {
    switch (risk) {
      case 'low': return 'Норма';
      case 'medium': return 'Внимание';
      case 'high': return 'Опасность';
      case 'critical': return 'Критично';
      default: return 'Неизвестно';
    }
  };

  const stats = {
    critical: regions.filter(r => r.risk === 'critical').length,
    high: regions.filter(r => r.risk === 'high').length,
    medium: regions.filter(r => r.risk === 'medium').length,
    low: regions.filter(r => r.risk === 'low').length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <header className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Icon name="Droplets" size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Мониторинг Паводков
                </h1>
                <p className="text-xs text-muted-foreground">Казахстан • Real-time</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse-slow" />
                <span className="text-muted-foreground">Обновлено 2 мин назад</span>
              </div>
              <Button variant="outline" size="sm">
                <Icon name="Bell" size={16} className="mr-2" />
                Уведомления
              </Button>
            </div>
          </div>
        </div>
      </header>

      <nav className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex gap-1 py-2">
            {([
              { id: 'overview', label: 'Главная', icon: 'Home' },
              { id: 'map', label: 'Карта паводков', icon: 'Map' },
              { id: 'stats', label: 'Статистика', icon: 'BarChart3' },
              { id: 'forecast', label: 'Прогноз', icon: 'TrendingUp' },
              { id: 'recommendations', label: 'Рекомендации', icon: 'Shield' },
              { id: 'contacts', label: 'Контакты', icon: 'Phone' },
            ] as const).map(item => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeSection === item.id
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item.icon} size={16} />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {activeSection === 'overview' && (
          <div className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="border-critical/30 bg-gradient-to-br from-critical/10 to-transparent">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Критический уровень</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-critical">{stats.critical}</span>
                    <span className="text-sm text-muted-foreground">регионов</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-danger/30 bg-gradient-to-br from-danger/10 to-transparent">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Высокий риск</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-danger">{stats.high}</span>
                    <span className="text-sm text-muted-foreground">регионов</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-warning/30 bg-gradient-to-br from-warning/10 to-transparent">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Средний риск</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-warning">{stats.medium}</span>
                    <span className="text-sm text-muted-foreground">регионов</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-success/30 bg-gradient-to-br from-success/10 to-transparent">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Норма</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-success">{stats.low}</span>
                    <span className="text-sm text-muted-foreground">регионов</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Текущая ситуация по регионам</CardTitle>
                <CardDescription>Мониторинг уровня риска паводков на основе данных WeatherAPI</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {regions.map((region, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg border border-border hover:shadow-md transition-all bg-card"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="flex flex-col gap-1">
                          <span className="font-semibold text-lg">{region.name}</span>
                          <div className="flex items-center gap-2">
                            <Badge className={getRiskColor(region.risk)}>
                              {getRiskLabel(region.risk)}
                            </Badge>
                            {region.trend === 'critical' && (
                              <Icon name="TrendingUp" size={16} className="text-critical animate-pulse-slow" />
                            )}
                            {region.trend === 'rising' && (
                              <Icon name="ArrowUp" size={16} className="text-warning" />
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-8">
                        <div className="text-center">
                          <div className="text-sm text-muted-foreground">Температура</div>
                          <div className="text-xl font-semibold">{region.temp}°C</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-muted-foreground">Осадки (мм)</div>
                          <div className="text-xl font-semibold">{region.precip}</div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Icon name="ExternalLink" size={16} className="mr-2" />
                          Детали
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === 'map' && (
          <div className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle>Интерактивная карта паводков</CardTitle>
                <CardDescription>Визуализация рисков по регионам Казахстана</CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={
                  <div className="aspect-video rounded-lg bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 flex items-center justify-center border-2 border-dashed border-border">
                    <div className="text-center space-y-4">
                      <Icon name="Map" size={64} className="mx-auto text-muted-foreground animate-pulse-slow" />
                      <p className="text-lg font-medium text-muted-foreground">Загрузка карты...</p>
                    </div>
                  </div>
                }>
                  <FloodMap />
                </Suspense>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === 'stats' && (
          <div className="animate-fade-in space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Региональная статистика</CardTitle>
                <CardDescription>Данные осадков и температуры за последние 7 дней</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="precip" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="precip">Осадки</TabsTrigger>
                    <TabsTrigger value="temp">Температура</TabsTrigger>
                  </TabsList>
                  <TabsContent value="precip" className="space-y-4 pt-4">
                    <div className="aspect-video rounded-lg bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center border border-border">
                      <div className="text-center space-y-2">
                        <Icon name="BarChart3" size={48} className="mx-auto text-muted-foreground" />
                        <p className="text-muted-foreground">График осадков</p>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="temp" className="space-y-4 pt-4">
                    <div className="aspect-video rounded-lg bg-gradient-to-br from-secondary/5 to-accent/5 flex items-center justify-center border border-border">
                      <div className="text-center space-y-2">
                        <Icon name="TrendingUp" size={48} className="mx-auto text-muted-foreground" />
                        <p className="text-muted-foreground">График температуры</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === 'forecast' && (
          <div className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle>Прогноз паводков</CardTitle>
                <CardDescription>Оценка риска на ближайшие 3-7 дней</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[...Array(7)].map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-lg border border-border bg-card">
                      <div className="flex items-center gap-4">
                        <div className="text-center min-w-[80px]">
                          <div className="text-sm text-muted-foreground">День {i + 1}</div>
                          <div className="text-lg font-semibold">
                            {new Date(Date.now() + i * 86400000).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}
                          </div>
                        </div>
                        <div className="h-12 w-px bg-border" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Icon name="CloudRain" size={20} className="text-primary" />
                            <span className="text-sm">Вероятность осадков: {Math.floor(Math.random() * 40 + 30)}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all" 
                              style={{ width: `${Math.floor(Math.random() * 60 + 20)}%` }}
                            />
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline" className="ml-4">
                        {i < 2 ? 'Низкий' : i < 4 ? 'Средний' : 'Высокий'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === 'recommendations' && (
          <div className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle>Рекомендации населению</CardTitle>
                <CardDescription>Действия при угрозе паводка</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {([
                    { icon: 'Shield', title: 'При низком уровне риска', text: 'Следите за сводками погоды. Подготовьте план эвакуации на случай ухудшения ситуации.' },
                    { icon: 'AlertTriangle', title: 'При среднем уровне риска', text: 'Переместите ценные вещи на верхние этажи. Подготовьте запас продуктов и воды на 3 дня.' },
                    { icon: 'AlertCircle', title: 'При высоком уровне риска', text: 'Готовьтесь к эвакуации. Отключите газ и электричество. Держите документы в водонепроницаемой упаковке.' },
                    { icon: 'Siren', title: 'При критическом уровне риска', text: 'Немедленно эвакуируйтесь в безопасное место. Следуйте указаниям МЧС. Не подходите к водоемам.' },
                  ] as const).map((rec, i) => (
                    <div key={i} className="flex gap-4 p-4 rounded-lg border border-border bg-card hover:shadow-md transition-all">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        i === 0 ? 'bg-success/10 text-success' :
                        i === 1 ? 'bg-warning/10 text-warning' :
                        i === 2 ? 'bg-danger/10 text-danger' :
                        'bg-critical/10 text-critical'
                      }`}>
                        <Icon name={rec.icon} size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{rec.title}</h3>
                        <p className="text-muted-foreground">{rec.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === 'contacts' && (
          <div className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Экстренные службы</CardTitle>
                  <CardDescription>Контакты для связи в чрезвычайной ситуации</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {([
                    { service: 'МЧС Казахстана', phone: '112', icon: 'Phone' },
                    { service: 'Единая служба спасения', phone: '101', icon: 'Ambulance' },
                    { service: 'Полиция', phone: '102', icon: 'ShieldAlert' },
                  ] as const).map((contact, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted">
                      <div className="flex items-center gap-3">
                        <Icon name={contact.icon} size={20} className="text-primary" />
                        <span className="font-medium">{contact.service}</span>
                      </div>
                      <span className="text-xl font-bold text-primary">{contact.phone}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Обратная связь</CardTitle>
                  <CardDescription>Сообщите о проблемах в системе мониторинга</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-square rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center border-2 border-dashed border-border">
                    <div className="text-center space-y-4">
                      <Icon name="Mail" size={48} className="mx-auto text-muted-foreground" />
                      <p className="text-muted-foreground">Форма обратной связи</p>
                      <Button>
                        <Icon name="Send" size={16} className="mr-2" />
                        Отправить сообщение
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-border bg-card/50 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              © 2026 Система мониторинга паводков Казахстана
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Данные:</span>
              <Badge variant="outline">WeatherAPI.com</Badge>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;