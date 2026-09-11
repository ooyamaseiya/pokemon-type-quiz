import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Download } from 'lucide-react';

interface InstallPromptProps {
  visible?: boolean;
}

export default function InstallPrompt({ visible: initialVisible = false }: InstallPromptProps) {
  const { t } = useTranslation();
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isVisible, setIsVisible] = useState(initialVisible);
  const installationAttempted = useRef(false);

  useEffect(() => {
    // Check if already installed
    if ('standalone' in window.navigator) {
      setIsInstalled(true);
      setIsVisible(false);
      return;
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the default prompt
      e.preventDefault();
      setDeferredPrompt(e);
      setIsVisible(true);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsVisible(false);
      setDeferredPrompt(null);
      installationAttempted.current = true;
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      void deferredPrompt.prompt();
      // User dismissed the prompt
      setIsVisible(false);
    } catch (error) {
      console.error('Install prompt failed:', error);
    } finally {
      setDeferredPrompt(null);
      installationAttempted.current = true;
    }
  };

  if (!isVisible || isInstalled || !deferredPrompt) {
    return null;
  }

  return (
    <button
      onClick={handleInstall}
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
      aria-label={t('install.app')}
    >
      <Download size={20} />
      <span>{t('install.app')}</span>
    </button>
  );
}
