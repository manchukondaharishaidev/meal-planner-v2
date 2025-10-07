# 🍽️ Meal Planner V2

A personalized vegetarian Indian meal planner with Telugu language support, built with React, TypeScript, and Firebase.

## ✨ Features

### 🔐 Authentication
- Email/Password authentication
- Google Sign-in
- Password reset functionality

### 📊 Personalized Nutrition
- Scientific BMR calculation (Mifflin-St Jeor Equation)
- TDEE with activity level multipliers
- Automatic macro distribution (High protein: 2g/kg)
- BMI tracking

### 🍳 Recipe Browser
- 4 Sample Indian vegetarian recipes
- Bilingual (English + Telugu)
- Category filtering (Breakfast, Lunch, Snack, Dinner)
- Detailed nutrition breakdown
- Step-by-step instructions

### 🌐 Bilingual Support
- English and Telugu (తెలుగు)
- Seamless language switching
- Full UI translation

### 🎨 Modern UI
- Responsive design (mobile-first)
- Dark mode support
- Tailwind CSS styling
- Smooth animations

## 🚀 Live Demo

**GitHub Pages:** https://manchukondaharishaidev.github.io/meal-planner-v2/

## 🛠️ Tech Stack

- **Frontend:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS v3
- **Routing:** React Router v6
- **Backend:** Firebase (Auth + Firestore)
- **i18n:** react-i18next
- **Deployment:** GitHub Pages

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/manchukondaharishaidev/meal-planner-v2.git
cd meal-planner-v2

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Add your Firebase credentials to .env

# Run development server
npm run dev

# Build for production
npm run build
```

## 🔥 Firebase Setup

1. Create a Firebase project at https://console.firebase.google.com
2. Enable Authentication (Email/Password + Google)
3. Create Firestore database
4. Copy configuration from Project Settings
5. Update `.env` file with your credentials

See `FIREBASE_SETUP.md` for detailed instructions.

## 📱 Sample Recipes

1. **Breakfast:** Soya Chunk Upma (సోయా ఉప్మా)
2. **Lunch:** Tofu & Dal Curry (టోఫు & పప్పు కూర)
3. **Snack:** Paneer & Seed Mix (పన్నీర్ & విత్తనాల మిశ్రమం)
4. **Dinner:** Soya Biryani (సోయా బిర్యానీ)

All recipes focus on high-protein vegetarian sources:
- Soya chunks
- Tofu
- Low-fat paneer
- Lentils (dal)
- Seeds

## 🎯 User Flow

1. **Sign Up**
   - Create account with email or Google
   - Enter body metrics (age, weight, height, body fat %)
   - Set goals (target weight, activity level)

2. **Dashboard**
   - View personalized nutrition targets
   - See BMR, TDEE, daily calorie goal
   - Track macro breakdown (protein, carbs, fat)

3. **Browse Recipes**
   - Filter by meal category
   - Switch between English and Telugu
   - View detailed nutrition and instructions

## 🔮 Future Enhancements

- [ ] Meal planning calendar
- [ ] Progress tracking (weight, body fat, measurements)
- [ ] Photo tracking
- [ ] Grocery list generator
- [ ] More recipes (target: 60+ recipes)
- [ ] PWA support (offline mode)

## 📄 License

MIT

## 👨‍💻 Author

Built with ❤️ by Harish Manchukonda

🤖 Generated with [Claude Code](https://claude.com/claude-code)

---

**Note:** This is V2 of the meal planner. For the original static version (V1), see the V1 branch or Meal_Training_Plan directory.
