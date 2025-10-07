import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const { user, updateProfile } = useAuth();

  async function changeLanguage(lng: 'en' | 'te') {
    await i18n.changeLanguage(lng);
    if (user) {
      await updateProfile({ language: lng });
    }
  }

  return (
    <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
      <button
        onClick={() => changeLanguage('en')}
        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
          i18n.language === 'en'
            ? 'bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 shadow-sm'
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
        }`}
      >
        English
      </button>
      <button
        onClick={() => changeLanguage('te')}
        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
          i18n.language === 'te'
            ? 'bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 shadow-sm'
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
        }`}
      >
        తెలుగు
      </button>
    </div>
  );
}
