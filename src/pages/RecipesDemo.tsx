import { useState } from 'react';
import { Link } from 'react-router-dom';
import { sampleRecipes } from '../data/recipes';
import { Button } from '../components/ui/Button';

export function RecipesDemo() {
  const [selectedRecipe, setSelectedRecipe] = useState<string | null>(null);
  const recipe = selectedRecipe ? sampleRecipes.find(r => r.id === selectedRecipe) : null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Sample Recipes (Demo)
            </h1>
            <Link to="/">
              <Button variant="outline">← Back to Home</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!recipe ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sampleRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition-shadow cursor-pointer overflow-hidden"
                onClick={() => setSelectedRecipe(recipe.id)}
              >
                <div className="h-48 bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center">
                  <div className="text-white text-6xl">🍽️</div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {recipe.name_en}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {recipe.name_te}
                  </p>
                  <div className="grid grid-cols-3 gap-2 text-center text-sm">
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Calories</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{recipe.calories}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Protein</p>
                      <p className="font-semibold text-green-600 dark:text-green-400">{recipe.protein}g</p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Carbs</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{recipe.carbs}g</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-4xl mx-auto p-8">
            <Button variant="outline" onClick={() => setSelectedRecipe(null)} className="mb-6">
              ← Back to Recipes
            </Button>

            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {recipe.name_en}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
              {recipe.name_te}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <StatBox label="Calories" value={recipe.calories} unit="kcal" />
              <StatBox label="Protein" value={recipe.protein} unit="g" />
              <StatBox label="Carbs" value={recipe.carbs} unit="g" />
              <StatBox label="Fat" value={recipe.fat} unit="g" />
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Ingredients
              </h2>
              <ul className="space-y-2">
                {recipe.ingredients.map((ing, idx) => (
                  <li key={idx} className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                    <span className="text-gray-700 dark:text-gray-300">
                      {ing.name_en} ({ing.name_te})
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">
                      {ing.quantity}{ing.unit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Instructions
              </h2>
              <ol className="space-y-3">
                {recipe.instructions_en.map((step, idx) => (
                  <li key={idx} className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-semibold">
                      {idx + 1}
                    </span>
                    <p className="text-gray-700 dark:text-gray-300 pt-1">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function StatBox({ label, value, unit }: { label: string; value: number; unit: string }) {
  return (
    <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{label}</p>
      <p className="text-2xl font-bold text-gray-900 dark:text-white">
        {value}<span className="text-sm ml-1">{unit}</span>
      </p>
    </div>
  );
}
