import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export function DemoLanding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            🍽️ Meal Planner V2
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
            Personalized Vegetarian Indian Meal Planning
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-400">
            With Telugu Language Support (తెలుగు)
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            ✨ Features
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <FeatureCard
              icon="🔐"
              title="User Authentication"
              description="Secure login with Email/Password or Google Sign-in"
            />
            <FeatureCard
              icon="📊"
              title="Personalized Nutrition"
              description="BMR, TDEE, and macro calculations based on your body metrics"
            />
            <FeatureCard
              icon="🍳"
              title="Indian Vegetarian Recipes"
              description="High-protein recipes with Soya, Tofu, Paneer, and Lentils"
            />
            <FeatureCard
              icon="🌐"
              title="Bilingual Support"
              description="Full app available in English and Telugu"
            />
            <FeatureCard
              icon="🎨"
              title="Modern UI"
              description="Responsive design with dark mode support"
            />
            <FeatureCard
              icon="📱"
              title="Mobile Friendly"
              description="Works perfectly on all devices"
            />
          </div>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-200 dark:border-yellow-700 rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-3">
            ⚠️ Firebase Setup Required
          </h3>
          <p className="text-yellow-800 dark:text-yellow-200 mb-4">
            This app requires Firebase configuration to work. The deployment you're viewing doesn't have Firebase credentials configured yet.
          </p>
          <p className="text-yellow-800 dark:text-yellow-200 mb-4">
            <strong>To run this app:</strong>
          </p>
          <ol className="list-decimal list-inside space-y-2 text-yellow-800 dark:text-yellow-200 ml-4">
            <li>Clone the repository from GitHub</li>
            <li>Create a Firebase project</li>
            <li>Add your Firebase credentials to <code className="bg-yellow-100 dark:bg-yellow-800 px-2 py-1 rounded">.env</code></li>
            <li>Run <code className="bg-yellow-100 dark:bg-yellow-800 px-2 py-1 rounded">npm install && npm run dev</code></li>
          </ol>
        </div>

        <div className="text-center space-y-4">
          <div className="flex justify-center gap-4">
            <a
              href="https://github.com/manchukondaharishaidev/meal-planner-v2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="primary" className="px-8">
                📦 View on GitHub
              </Button>
            </a>
            <Link to="/recipes-demo">
              <Button variant="secondary" className="px-8">
                👀 View Sample Recipes
              </Button>
            </Link>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            🤖 Built with Claude Code
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <TechCard title="Frontend" items={['React 18', 'TypeScript', 'Tailwind CSS', 'React Router']} />
          <TechCard title="Backend" items={['Firebase Auth', 'Firestore', 'Firebase Storage']} />
          <TechCard title="Features" items={['i18n (Telugu)', 'Dark Mode', 'Responsive', 'PWA Ready']} />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="flex gap-4">
      <div className="text-4xl flex-shrink-0">{icon}</div>
      <div>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm">{description}</p>
      </div>
    </div>
  );
}

function TechCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
      <h3 className="font-semibold text-gray-900 dark:text-white mb-3">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li key={idx} className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
            <span className="mr-2">✓</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
