import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { sampleRecipes } from '../data/recipes';
import type { RecipeCategory } from '../types';
import { Button } from '../components/ui/Button';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { Link } from 'react-router-dom';

export function Recipes() {
  const { t, i18n } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<RecipeCategory | 'all'>('all');
  const [selectedRecipe, setSelectedRecipe] = useState<string | null>(null);

  const filteredRecipes = selectedCategory === 'all'
    ? sampleRecipes
    : sampleRecipes.filter(r => r.category === selectedCategory);

  const recipe = selectedRecipe ? sampleRecipes.find(r => r.id === selectedRecipe) : null;
  const isTelugu = i18n.language === 'te';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <Link to="/dashboard" className="text-2xl font-bold text-gray-900 dark:text-white hover:text-primary-600">
                {t('dashboard.title')}
              </Link>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {isTelugu ? 'వంటకాలు' : 'Recipes'}
              </p>
            </div>
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!recipe ? (
          <>
            {/* Category Filter */}
            <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
              <CategoryButton
                active={selectedCategory === 'all'}
                onClick={() => setSelectedCategory('all')}
                label={isTelugu ? 'అన్నీ' : 'All'}
              />
              <CategoryButton
                active={selectedCategory === 'breakfast'}
                onClick={() => setSelectedCategory('breakfast')}
                label={isTelugu ? 'అల్పాహారం' : 'Breakfast'}
              />
              <CategoryButton
                active={selectedCategory === 'lunch'}
                onClick={() => setSelectedCategory('lunch')}
                label={isTelugu ? 'మధ్యాహ్నం' : 'Lunch'}
              />
              <CategoryButton
                active={selectedCategory === 'snack'}
                onClick={() => setSelectedCategory('snack')}
                label={isTelugu ? 'స్నాక్' : 'Snack'}
              />
              <CategoryButton
                active={selectedCategory === 'dinner'}
                onClick={() => setSelectedCategory('dinner')}
                label={isTelugu ? 'రాత్రి భోజనం' : 'Dinner'}
              />
            </div>

            {/* Recipe Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecipes.map((recipe) => (
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
                      {isTelugu ? recipe.name_te : recipe.name_en}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-xs px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded">
                        {recipe.category}
                      </span>
                      <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded">
                        {recipe.protein}g protein
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{isTelugu ? 'కేలరీలు' : 'Calories'}</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{recipe.calories}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{isTelugu ? 'కార్బ్స్' : 'Carbs'}</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{recipe.carbs}g</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{isTelugu ? 'కొవ్వు' : 'Fat'}</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{recipe.fat}g</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-4xl mx-auto">
            <div className="p-8">
              <Button variant="outline" onClick={() => setSelectedRecipe(null)} className="mb-6">
                ← {isTelugu ? 'వెనక్కి' : 'Back'}
              </Button>

              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {isTelugu ? recipe.name_te : recipe.name_en}
              </h1>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <StatBox label={isTelugu ? 'కేలరీలు' : 'Calories'} value={recipe.calories} unit="kcal" />
                <StatBox label={isTelugu ? 'ప్రోటీన్' : 'Protein'} value={recipe.protein} unit="g" />
                <StatBox label={isTelugu ? 'కార్బ్స్' : 'Carbs'} value={recipe.carbs} unit="g" />
                <StatBox label={isTelugu ? 'కొవ్వు' : 'Fat'} value={recipe.fat} unit="g" />
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {isTelugu ? 'పదార్థాలు' : 'Ingredients'}
                </h2>
                <ul className="space-y-2">
                  {recipe.ingredients.map((ing, idx) => (
                    <li key={idx} className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700">
                      <span className="text-gray-700 dark:text-gray-300">
                        {isTelugu ? ing.name_te : ing.name_en}
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
                  {isTelugu ? 'తయారీ విధానం' : 'Instructions'}
                </h2>
                <ol className="space-y-3">
                  {(isTelugu ? recipe.instructions_te : recipe.instructions_en).map((step, idx) => (
                    <li key={idx} className="flex gap-4">
                      <span className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-semibold">
                        {idx + 1}
                      </span>
                      <p className="text-gray-700 dark:text-gray-300 pt-1">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    {isTelugu ? 'తయారీ సమయం' : 'Prep Time'}: <strong>{recipe.prepTime} min</strong>
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {isTelugu ? 'వంట సమయం' : 'Cook Time'}: <strong>{recipe.cookTime} min</strong>
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {isTelugu ? 'కష్టతనం' : 'Difficulty'}: <strong className="capitalize">{recipe.difficulty}</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function CategoryButton({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
        active
          ? 'bg-primary-600 text-white'
          : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
      }`}
    >
      {label}
    </button>
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
