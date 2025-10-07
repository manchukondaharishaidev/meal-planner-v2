import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import type { UserProfile, ActivityLevel } from '../../types';

export function Signup() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Step 1: Account Info
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');

  // Step 2: Body Metrics
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [currentWeight, setCurrentWeight] = useState('');
  const [height, setHeight] = useState('');
  const [currentBodyFat, setCurrentBodyFat] = useState('');

  // Step 3: Goals
  const [targetWeight, setTargetWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('moderate');
  const [dietaryPreferences, setDietaryPreferences] = useState<string[]>(['vegetarian']);

  const { signUp } = useAuth();
  const navigate = useNavigate();

  function validateStep1(): boolean {
    if (!email || !password || !confirmPassword || !name) {
      setError('Please fill in all fields');
      return false;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    return true;
  }

  function validateStep2(): boolean {
    if (!age || !currentWeight || !height || !currentBodyFat) {
      setError('Please fill in all fields');
      return false;
    }

    const ageNum = parseInt(age);
    const weightNum = parseFloat(currentWeight);
    const heightNum = parseFloat(height);
    const bodyFatNum = parseFloat(currentBodyFat);

    if (ageNum < 15 || ageNum > 100) {
      setError('Age must be between 15-100 years');
      return false;
    }

    if (weightNum < 30 || weightNum > 300) {
      setError('Weight must be between 30-300 kg');
      return false;
    }

    if (heightNum < 100 || heightNum > 250) {
      setError('Height must be between 100-250 cm');
      return false;
    }

    if (bodyFatNum < 3 || bodyFatNum > 60) {
      setError('Body fat must be between 3-60%');
      return false;
    }

    return true;
  }

  function handleNext() {
    setError('');

    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;

    setStep(step + 1);
  }

  function handleBack() {
    setError('');
    setStep(step - 1);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!targetWeight) {
      setError('Please enter your target weight');
      return;
    }

    try {
      setError('');
      setLoading(true);

      const profileData: Partial<UserProfile> = {
        name,
        age: parseInt(age),
        gender,
        currentWeight: parseFloat(currentWeight),
        height: parseFloat(height),
        currentBodyFat: parseFloat(currentBodyFat),
        targetWeight: parseFloat(targetWeight),
        activityLevel,
        dietaryPreferences,
      };

      await signUp(email, password, profileData);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 px-4 py-8">
      <div className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Create Your Account
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Step {step} of 3: {step === 1 ? 'Account Info' : step === 2 ? 'Body Metrics' : 'Goals'}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className={`text-sm ${step >= 1 ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400'}`}>
              Account
            </span>
            <span className={`text-sm ${step >= 2 ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400'}`}>
              Metrics
            </span>
            <span className={`text-sm ${step >= 3 ? 'text-primary-600 dark:text-primary-400' : 'text-gray-400'}`}>
              Goals
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Step 1: Account Info */}
          {step === 1 && (
            <div className="space-y-4">
              <Input
                type="text"
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                disabled={loading}
                required
              />

              <Input
                type="email"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                disabled={loading}
                required
              />

              <Input
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                helperText="At least 6 characters"
                disabled={loading}
                required
              />

              <Input
                type="password"
                label="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                disabled={loading}
                required
              />

              <Button type="button" onClick={handleNext} fullWidth>
                Next
              </Button>
            </div>
          )}

          {/* Step 2: Body Metrics */}
          {step === 2 && (
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

              <div className="flex gap-4">
                <Button type="button" variant="outline" onClick={handleBack} fullWidth>
                  Back
                </Button>
                <Button type="button" onClick={handleNext} fullWidth>
                  Next
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Goals */}
          {step === 3 && (
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

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Dietary Preferences
                </label>
                <div className="space-y-2">
                  {['vegetarian', 'vegan', 'gluten-free', 'dairy-free'].map((pref) => (
                    <label key={pref} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={dietaryPreferences.includes(pref)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setDietaryPreferences([...dietaryPreferences, pref]);
                          } else {
                            setDietaryPreferences(dietaryPreferences.filter((p) => p !== pref));
                          }
                        }}
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                        disabled={loading}
                      />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300 capitalize">
                        {pref}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <Button type="button" variant="outline" onClick={handleBack} fullWidth>
                  Back
                </Button>
                <Button type="submit" fullWidth isLoading={loading}>
                  Create Account
                </Button>
              </div>
            </div>
          )}
        </form>

        <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <Link
            to="/login"
            className="font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
