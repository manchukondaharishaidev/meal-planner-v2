import type {
  CalorieCalculationInput,
  CalorieCalculationResult,
} from '../types';
import { ActivityLevelMultipliers } from '../types';

/**
 * Calculate BMR using Mifflin-St Jeor Equation
 * Most accurate for modern populations
 */
export function calculateBMR(
  weight: number, // kg
  height: number, // cm
  age: number,
  gender: 'male' | 'female'
): number {
  if (gender === 'male') {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
}

/**
 * Calculate TDEE (Total Daily Energy Expenditure)
 */
export function calculateTDEE(BMR: number, activityLevel: string): number {
  const multiplier = ActivityLevelMultipliers[activityLevel as keyof typeof ActivityLevelMultipliers] || 1.2;
  return BMR * multiplier;
}

/**
 * Calculate BMI (Body Mass Index)
 */
export function calculateBMI(weight: number, height: number): number {
  // BMI = weight(kg) / (height(m))^2
  const heightInMeters = height / 100;
  return weight / (heightInMeters * heightInMeters);
}

/**
 * Calculate complete calorie and macro targets
 */
export function calculateNutritionTargets(
  input: CalorieCalculationInput
): CalorieCalculationResult {
  const { weight, height, age, gender, activityLevel, targetDeficit = 500 } = input;

  // Calculate BMR
  const BMR = calculateBMR(weight, height, age, gender);

  // Calculate TDEE
  const TDEE = calculateTDEE(BMR, activityLevel);

  // Calculate daily calorie target with deficit
  let dailyCalorieTarget = TDEE - targetDeficit;

  // Ensure minimum calories
  const minimumCalories = gender === 'male' ? 1500 : 1200;
  dailyCalorieTarget = Math.max(dailyCalorieTarget, minimumCalories);

  // Calculate protein target (2.0-2.2g per kg for muscle preservation)
  const proteinTarget = Math.round(weight * 2.0);
  const proteinCalories = proteinTarget * 4;

  // Calculate fat target (25-30% of total calories)
  const fatPercentage = 0.27; // 27% as middle ground
  const fatCalories = dailyCalorieTarget * fatPercentage;
  const fatTarget = Math.round(fatCalories / 9);

  // Calculate carb target (remainder)
  const carbCalories = dailyCalorieTarget - (proteinCalories + fatCalories);
  const carbTarget = Math.round(carbCalories / 4);

  // Estimate weekly weight loss
  // 1 kg fat = ~7700 calories
  const weeklyDeficit = targetDeficit * 7;
  const estimatedWeeklyWeightLoss = weeklyDeficit / 7700;

  // Estimate time to goal (if provided)
  const estimatedTimeToGoal = 0; // Can be calculated if target weight is provided

  return {
    BMR: Math.round(BMR),
    TDEE: Math.round(TDEE),
    dailyCalorieTarget: Math.round(dailyCalorieTarget),
    proteinTarget,
    carbTarget,
    fatTarget,
    estimatedWeeklyWeightLoss: Number(estimatedWeeklyWeightLoss.toFixed(2)),
    estimatedTimeToGoal,
  };
}

/**
 * Calculate estimated time to reach target body fat
 */
export function calculateTimeToGoal(
  currentWeight: number,
  currentBodyFat: number,
  targetBodyFat: number,
  weeklyWeightLoss: number
): number {
  // Calculate current fat mass
  const currentFatMass = (currentWeight * currentBodyFat) / 100;

  // Calculate target fat mass (assuming lean mass stays constant)
  const leanMass = currentWeight - currentFatMass;
  const targetWeight = leanMass / (1 - targetBodyFat / 100);
  const targetFatMass = (targetWeight * targetBodyFat) / 100;

  // Calculate fat to lose
  const fatToLose = currentFatMass - targetFatMass;

  // Estimate weeks (conservatively, assuming 70% of weight loss is fat)
  const weightToLose = fatToLose / 0.7;
  const weeksToGoal = weightToLose / weeklyWeightLoss;

  return Math.ceil(weeksToGoal);
}

/**
 * Calculate daily macro percentages
 */
export function calculateMacroPercentages(
  protein: number,
  carbs: number,
  fat: number
): { proteinPercent: number; carbPercent: number; fatPercent: number } {
  const totalCalories = protein * 4 + carbs * 4 + fat * 9;

  return {
    proteinPercent: Math.round((protein * 4 * 100) / totalCalories),
    carbPercent: Math.round((carbs * 4 * 100) / totalCalories),
    fatPercent: Math.round((fat * 9 * 100) / totalCalories),
  };
}

/**
 * Validate user input
 */
export function validateUserMetrics(data: {
  weight: number;
  height: number;
  age: number;
  bodyFat: number;
}): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (data.weight < 30 || data.weight > 300) {
    errors.push('Weight must be between 30-300 kg');
  }

  if (data.height < 100 || data.height > 250) {
    errors.push('Height must be between 100-250 cm');
  }

  if (data.age < 15 || data.age > 100) {
    errors.push('Age must be between 15-100 years');
  }

  if (data.bodyFat < 3 || data.bodyFat > 60) {
    errors.push('Body fat must be between 3-60%');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
