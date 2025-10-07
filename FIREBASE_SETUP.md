# 🔥 Firebase Setup Guide

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click **"Add project"** or **"Create a project"**
3. Project name: `meal-planner-v2`
4. Enable Google Analytics: **Yes** (optional)
5. Click **"Create project"**

## Step 2: Add Web App to Firebase

1. In Firebase console, click **⚙️ (Settings)** → **Project settings**
2. Scroll to **"Your apps"** section
3. Click the **Web icon** `</>`
4. App nickname: `Meal Planner Web`
5. Check **"Also set up Firebase Hosting"** (optional)
6. Click **"Register app"**

## Step 3: Copy Firebase Config

You'll see a config object like this:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "meal-planner-v2.firebaseapp.com",
  projectId: "meal-planner-v2",
  storageBucket: "meal-planner-v2.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

**Copy this entire config object!** We'll use it in the next step.

## Step 4: Enable Authentication

1. In Firebase console, click **Authentication** (left sidebar)
2. Click **"Get started"**
3. Click **"Sign-in method"** tab
4. Enable these providers:
   - ✅ **Email/Password** → Click → Enable → Save
   - ✅ **Google** → Click → Enable → Select support email → Save

## Step 5: Set up Firestore Database

1. Click **Firestore Database** (left sidebar)
2. Click **"Create database"**
3. Select **"Start in production mode"** (we'll add rules later)
4. Choose location: **us-central** (or closest to you)
5. Click **"Enable"**

## Step 6: Set up Storage

1. Click **Storage** (left sidebar)
2. Click **"Get started"**
3. Keep default rules (we'll update later)
4. Choose same location as Firestore
5. Click **"Done"**

## Step 7: Configure Firestore Security Rules

1. Go to **Firestore Database** → **Rules** tab
2. Replace with these rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow users to read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;

      match /{document=**} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }

    // Allow all authenticated users to read recipes
    match /recipes/{recipeId} {
      allow read: if request.auth != null;
      allow write: if false; // Only admins can write (you'll do this manually)
    }

    // Allow all authenticated users to read ingredients
    match /ingredients/{ingredientId} {
      allow read: if request.auth != null;
      allow write: if false;
    }
  }
}
```

3. Click **"Publish"**

## Step 8: Configure Storage Security Rules

1. Go to **Storage** → **Rules** tab
2. Replace with:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // User profile photos
    match /users/{userId}/photos/{fileName} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow write: if request.auth != null
                   && request.auth.uid == userId
                   && request.resource.size < 5 * 1024 * 1024; // Max 5MB
    }
  }
}
```

3. Click **"Publish"**

## Step 9: Add Config to Your App

Now paste your Firebase config into:
`/Users/harishmanchukonda/Desktop/meal-planner-v2/src/config/firebase.ts`

The file structure will be:

```typescript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  // PASTE YOUR CONFIG HERE
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
```

## ✅ Setup Complete!

Once you've completed these steps, let me know and I'll continue building the authentication system!

## 🔐 Security Notes

- Never commit Firebase config to public repos (it's OK for our case, we have security rules)
- API keys are safe to expose (they're restricted by Firebase security rules)
- Always use security rules to protect data
- Store sensitive data only in Firestore with proper rules

## 📝 What We'll Build Next

- Login/Signup forms
- User authentication state management
- Protected routes
- User profile creation
- Calorie calculator
- And more!
