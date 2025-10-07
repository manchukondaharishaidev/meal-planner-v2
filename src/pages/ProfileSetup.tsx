import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import type { ActivityLevel } from '../types';

export function ProfileSetup() {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [age, setAge] = useState(user?.age?.toString() || '');
  const [gender, setGender] = useState<'male' | 'female'>(user?.gender || 'male');
  const [currentWeight, setCurrentWeight] = useState(user?.currentWeight?.toString() || '');
  const [height, setHeight] = useState(user?.height?.toString() || '');
  const [currentBodyFat, setCurrentBodyFat] = useState(user?.currentBodyFat?.toString() || '');
  const [targetWeight, setTargetWeight] = useState(user?.targetWeight?.toString() || '');
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>(user?.activityLevel || 'moderate');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!age || !currentWeight || !height || !currentBodyFat || !targetWeight) {
      setError('Please fill in all fields');
      return;
    }

    const ageNum = parseInt(age);
    const weightNum = parseFloat(currentWeight);
    const heightNum = parseFloat(height);
    const bodyFatNum = parseFloat(currentBodyFat);
    const targetWeightNum = parseFloat(targetWeight);

    if (ageNum < 15 || ageNum > 100) {
      setError('Age must be between 15-100 years');
      return;
    }

    if (weightNum < 30 || weightNum > 300) {
      setError('Weight must be between 30-300 kg');
      return;
    }

    if (heightNum < 100 || heightNum > 250) {
      setError('Height must be between 100-250 cm');
      return;
    }

    if (bodyFatNum < 3 || bodyFatNum > 60) {
      setError('Body fat must be between 3-60%');
      return;
    }

    try {
      setError('');
      setLoading(true);

      await updateProfile({
        age: ageNum,
        gender,
        currentWeight: weightNum,
        height: heightNum,
        currentBodyFat: bodyFatNum,
        targetWeight: targetWeightNum,
        activityLevel,
      });

      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 px-4 py-8">
      <div className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Complete Your Profile
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Let's set up your personalized meal plan
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Body Metrics */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Body Metrics
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="number"
                  label="Age (years)"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="25"
                  disabled={loading}
                  required
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Gender
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as 'male' | 'female')}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                      focus:outline-none focus:ring-2 focus:ring-primary-500
                      bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    disabled={loading}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="number"
                  step="0.1"
                  label="Current Weight (kg)"
                  value={currentWeight}
                  onChange={(e) => setCurrentWeight(e.target.value)}
                  placeholder="70"
                  disabled={loading}
                  required
                />

                <Input
                  type="number"
                  label="Height (cm)"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="170"
                  disabled={loading}
                  required
                />
              </div>

              <Input
                type="number"
                step="0.1"
                label="Current Body Fat %"
                value={currentBodyFat}
                onChange={(e) => setCurrentBodyFat(e.target.value)}
                placeholder="20"
                helperText="Estimate if unsure (10-15% lean, 15-20% average, 20%+ higher)"
                disabled={loading}
                required
              />
            </div>
          </div>

          {/* Goals */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Your Goals
            </h2>
            <div className="space-y-4">
              <Input
                type="number"
                step="0.1"
                label="Target Weight (kg)"
                value={targetWeight}
                onChange={(e) => setTargetWeight(e.target.value)}
                placeholder="65"
                disabled={loading}
                required
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Activity Level
                </label>
                <select
                  value={activityLevel}
                  onChange={(e) => setActivityLevel(e.target.value as ActivityLevel)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                    focus:outline-none focus:ring-2 focus:ring-primary-500
                    bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  disabled={loading}
                >
                  <option value="sedentary">Sedentary (little/no exercise)</option>
                  <option value="light">Light (1-3 days/week)</option>
                  <option value="moderate">Moderate (3-5 days/week)</option>
                  <option value="active">Active (6-7 days/week)</option>
                  <option value="very_active">Very Active (athlete level)</option>
                </select>
              </div>
            </div>
          </div>

          <Button type="submit" fullWidth isLoading={loading}>
            Complete Setup
          </Button>
        </form>
      </div>
    </div>
  );
}
