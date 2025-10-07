// User Profile Types
export interface UserProfile {
  uid: string;
  email: string;
  name: string;
  age: number;
  gender: 'male' | 'female';

  // Body Metrics
  currentWeight: number; // kg
  height: number; // cm
  currentBodyFat: number; // percentage

  // Goals
  targetBodyFat: number; // percentage (default: 13)
  targetWeight: number; // kg
  activityLevel: ActivityLevel;
  dietaryPreferences: string[];

  // Calculated Values
  BMI: number;
  BMR: number; // Basal Metabolic Rate
  TDEE: number; // Total Daily Energy Expenditure
  dailyCalorieTarget: number;
  proteinTarget: number; // grams
  carbTarget: number; // grams
  fatTarget: number; // grams

  // Settings
  language: 'en' | 'te';
  measurementSystem: 'metric' | 'imperial';

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';

export const ActivityLevelMultipliers: Record<ActivityLevel, number> = {
  sedentary: 1.2,     // Little/no exercise
  light: 1.375,       // 1-3 days/week
  moderate: 1.55,     // 3-5 days/week
  active: 1.725,      // 6-7 days/week
  very_active: 1.9    // Athlete level
};

// Recipe Types
export interface Recipe {
  id: string;
  name_en: string;
  name_te: string;
  category: RecipeCategory;

  // Nutrition per serving
  servingSize: number; // grams
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;

  // Ingredients with detailed breakdown
  ingredients: Ingredient[];

  // Instructions
  instructions_en: string[];
  instructions_te: string[];

  // Metadata
  cookTime: number; // minutes
  prepTime: number; // minutes
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  scalable: boolean;

  // Images
  imageUrl?: string;

  createdAt: Date;
  updatedAt: Date;
}

export type RecipeCategory = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface Ingredient {
  name_en: string;
  name_te: string;
  quantity: number;
  unit: string;
  protein: number;
  calories: number;
  carbs: number;
  fat: number;
}

// Protein Source Data
export interface ProteinSource {
  name_en: string;
  name_te: string;
  protein: number; // per 100g
  calories: number; // per 100g
  carbs: number; // per 100g
  fat: number; // per 100g
  category: 'soya' | 'tofu' | 'paneer' | 'dal' | 'seeds' | 'dairy' | 'other';
}

// Meal Plan Types
export interface DailyMealPlan {
  userId: string;
  date: string; // YYYY-MM-DD
  breakfast?: MealEntry;
  lunch?: MealEntry;
  snack?: MealEntry;
  dinner?: MealEntry;

  // Daily Totals
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;

  completed: boolean;
  notes?: string;
}

export interface MealEntry {
  recipeId: string;
  recipeName_en: string;
  recipeName_te: string;
  servings: number;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  loggedAt: Date;
}

// Progress Tracking Types
export interface WeightEntry {
  userId: string;
  date: string; // YYYY-MM-DD
  weight: number; // kg
  notes?: string;
}

export interface BodyFatEntry {
  userId: string;
  date: string; // YYYY-MM-DD
  bodyFat: number; // percentage
  method: 'caliper' | 'dexa' | 'bioimpedance' | 'visual' | 'other';
  notes?: string;
}

export interface MeasurementEntry {
  userId: string;
  date: string; // YYYY-MM-DD
  waist?: number; // cm
  chest?: number; // cm
  arms?: number; // cm (both)
  thighs?: number; // cm (both)
  hips?: number; // cm
  notes?: string;
}

export interface ProgressPhoto {
  userId: string;
  date: string; // YYYY-MM-DD
  photoUrl: string;
  type: 'front' | 'side' | 'back';
  weight?: number;
  bodyFat?: number;
}

// Grocery List Types
export interface GroceryList {
  userId: string;
  weekStartDate: string; // YYYY-MM-DD
  items: GroceryItem[];
  totalEstimatedCost: number;
  createdAt: Date;
}

export interface GroceryItem {
  name_en: string;
  name_te: string;
  totalQuantity: number;
  unit: string;
  usedIn: string[]; // Meal names
  category: GroceryCategory;
  estimatedCost?: number;
  purchased: boolean;
}

export type GroceryCategory =
  | 'proteins'
  | 'vegetables'
  | 'fruits'
  | 'grains'
  | 'dairy'
  | 'spices'
  | 'oils'
  | 'other';

// Calculator Helper Types
export interface CalorieCalculationInput {
  weight: number; // kg
  height: number; // cm
  age: number;
  gender: 'male' | 'female';
  activityLevel: ActivityLevel;
  targetDeficit?: number; // kcal (default: 500)
}

export interface CalorieCalculationResult {
  BMR: number;
  TDEE: number;
  dailyCalorieTarget: number;
  proteinTarget: number;
  carbTarget: number;
  fatTarget: number;
  estimatedWeeklyWeightLoss: number; // kg
  estimatedTimeToGoal: number; // weeks
}

// Auth Context Types
export interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, profile: Partial<UserProfile>) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}
