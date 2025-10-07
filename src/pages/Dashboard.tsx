import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { useNavigate } from 'react-router-dom';

export function Dashboard() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Meal Planner
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Welcome back, {user.name}!
              </p>
            </div>
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <Button variant="outline" onClick={signOut}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Daily Calories"
            value={user.dailyCalorieTarget}
            unit="kcal"
            color="primary"
          />
          <StatCard
            title="Protein Target"
            value={user.proteinTarget}
            unit="g"
            color="green"
          />
          <StatCard
            title="Current Weight"
            value={user.currentWeight}
            unit="kg"
            color="blue"
          />
          <StatCard
            title="Target Weight"
            value={user.targetWeight}
            unit="kg"
            color="purple"
          />
        </div>

        {/* Macro Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Daily Macro Targets
            </h2>
            <div className="space-y-4">
              <MacroBar
                label="Protein"
                value={user.proteinTarget}
                unit="g"
                color="bg-green-500"
              />
              <MacroBar
                label="Carbs"
                value={user.carbTarget}
                unit="g"
                color="bg-blue-500"
              />
              <MacroBar
                label="Fat"
                value={user.fatTarget}
                unit="g"
                color="bg-yellow-500"
              />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Your Metrics
            </h2>
            <div className="space-y-3">
              <MetricRow label="BMI" value={user.BMI.toFixed(1)} />
              <MetricRow label="BMR" value={`${user.BMR} kcal`} />
              <MetricRow label="TDEE" value={`${user.TDEE} kcal`} />
              <MetricRow label="Current Body Fat" value={`${user.currentBodyFat}%`} />
              <MetricRow label="Target Body Fat" value={`${user.targetBodyFat}%`} />
              <MetricRow label="Activity Level" value={user.activityLevel} />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button fullWidth onClick={() => navigate('/recipes')}>Browse Recipes</Button>
            <Button fullWidth variant="secondary" onClick={() => navigate('/recipes')}>View Meal Plan</Button>
            <Button fullWidth variant="outline" onClick={() => navigate('/dashboard')}>Track Progress</Button>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value, unit, color }: {
  title: string;
  value: number;
  unit: string;
  color: string;
}) {
  const colorClasses = {
    primary: 'from-primary-500 to-purple-600',
    green: 'from-green-500 to-emerald-600',
    blue: 'from-blue-500 to-cyan-600',
    purple: 'from-purple-500 to-pink-600',
  };

  return (
    <div className={`bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} rounded-xl shadow-lg p-6 text-white`}>
      <p className="text-sm opacity-90 mb-1">{title}</p>
      <p className="text-3xl font-bold">
        {value}
        <span className="text-lg ml-1">{unit}</span>
      </p>
    </div>
  );
}

function MacroBar({ label, value, unit, color }: {
  label: string;
  value: number;
  unit: string;
  color: string;
}) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
        <span className="text-sm text-gray-600 dark:text-gray-400">{value}{unit}</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
        <div className={`${color} h-2.5 rounded-full`} style={{ width: '100%' }}></div>
      </div>
    </div>
  );
}

function MetricRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
      <span className="text-sm text-gray-600 dark:text-gray-400">{label}</span>
      <span className="text-sm font-medium text-gray-900 dark:text-white capitalize">{value}</span>
    </div>
  );
}
