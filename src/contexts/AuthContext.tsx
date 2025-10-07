import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import type { User } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import type { UserProfile, AuthContextType } from '../types';
import { calculateNutritionTargets, calculateBMI } from '../utils/calorieCalculator';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Load user profile from Firestore
        await loadUserProfile(firebaseUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  async function loadUserProfile(firebaseUser: User) {
    try {
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));

      if (userDoc.exists()) {
        setUser(userDoc.data() as UserProfile);
      } else {
        // Create minimal profile if doesn't exist
        const minimalProfile: Partial<UserProfile> = {
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          name: firebaseUser.displayName || '',
          language: 'en',
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        setUser(minimalProfile as UserProfile);
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  }

  async function signUp(
    email: string,
    password: string,
    profileData: Partial<UserProfile>
  ): Promise<void> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const { uid } = userCredential.user;

      // Calculate nutrition targets
      const nutritionTargets = calculateNutritionTargets({
        weight: profileData.currentWeight!,
        height: profileData.height!,
        age: profileData.age!,
        gender: profileData.gender!,
        activityLevel: profileData.activityLevel!,
      });

      const BMI = calculateBMI(profileData.currentWeight!, profileData.height!);

      // Create user profile in Firestore
      const newUserProfile: UserProfile = {
        uid,
        email,
        name: profileData.name || '',
        age: profileData.age || 25,
        gender: profileData.gender || 'male',
        currentWeight: profileData.currentWeight || 70,
        height: profileData.height || 170,
        currentBodyFat: profileData.currentBodyFat || 20,
        targetBodyFat: 13,
        targetWeight: profileData.targetWeight || 70,
        activityLevel: profileData.activityLevel || 'moderate',
        dietaryPreferences: profileData.dietaryPreferences || ['vegetarian'],
        BMI,
        BMR: nutritionTargets.BMR,
        TDEE: nutritionTargets.TDEE,
        dailyCalorieTarget: nutritionTargets.dailyCalorieTarget,
        proteinTarget: nutritionTargets.proteinTarget,
        carbTarget: nutritionTargets.carbTarget,
        fatTarget: nutritionTargets.fatTarget,
        language: 'en',
        measurementSystem: 'metric',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await setDoc(doc(db, 'users', uid), newUserProfile);
      setUser(newUserProfile);
    } catch (error: any) {
      console.error('Signup error:', error);
      throw new Error(error.message || 'Failed to create account');
    }
  }

  async function signIn(email: string, password: string): Promise<void> {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // User profile will be loaded by onAuthStateChanged
    } catch (error: any) {
      console.error('Sign in error:', error);
      throw new Error(error.message || 'Failed to sign in');
    }
  }

  async function signInWithGoogle(): Promise<void> {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      // Check if user profile exists
      const userDoc = await getDoc(doc(db, 'users', result.user.uid));

      if (!userDoc.exists()) {
        // New Google user - redirect to profile setup
        const minimalProfile: Partial<UserProfile> = {
          uid: result.user.uid,
          email: result.user.email || '',
          name: result.user.displayName || '',
          language: 'en',
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        await setDoc(doc(db, 'users', result.user.uid), minimalProfile);
      }
    } catch (error: any) {
      console.error('Google sign in error:', error);
      throw new Error(error.message || 'Failed to sign in with Google');
    }
  }

  async function signOut(): Promise<void> {
    try {
      await firebaseSignOut(auth);
      setUser(null);
    } catch (error: any) {
      console.error('Sign out error:', error);
      throw new Error(error.message || 'Failed to sign out');
    }
  }

  async function updateProfile(updates: Partial<UserProfile>): Promise<void> {
    if (!user) throw new Error('No user logged in');

    try {
      // Recalculate nutrition if relevant fields changed
      let nutritionTargets = {};

      if (
        updates.currentWeight ||
        updates.height ||
        updates.age ||
        updates.gender ||
        updates.activityLevel
      ) {
        const weight = updates.currentWeight || user.currentWeight;
        const height = updates.height || user.height;
        const age = updates.age || user.age;
        const gender = updates.gender || user.gender;
        const activityLevel = updates.activityLevel || user.activityLevel;

        const targets = calculateNutritionTargets({
          weight,
          height,
          age,
          gender,
          activityLevel,
        });

        const BMI = calculateBMI(weight, height);

        nutritionTargets = {
          BMI,
          BMR: targets.BMR,
          TDEE: targets.TDEE,
          dailyCalorieTarget: targets.dailyCalorieTarget,
          proteinTarget: targets.proteinTarget,
          carbTarget: targets.carbTarget,
          fatTarget: targets.fatTarget,
        };
      }

      const updatedProfile = {
        ...updates,
        ...nutritionTargets,
        updatedAt: new Date(),
      };

      await updateDoc(doc(db, 'users', user.uid), updatedProfile);

      setUser({ ...user, ...updatedProfile } as UserProfile);
    } catch (error: any) {
      console.error('Update profile error:', error);
      throw new Error(error.message || 'Failed to update profile');
    }
  }

  async function resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      console.error('Password reset error:', error);
      throw new Error(error.message || 'Failed to send password reset email');
    }
  }

  const value: AuthContextType = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
    signInWithGoogle,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
