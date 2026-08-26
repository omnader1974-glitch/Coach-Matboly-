import { useState, useEffect } from 'react';
import { SiteConfig } from '../types/fitness';
import { DEFAULT_SITE_CONFIG } from '../data/initialData';

const STORAGE_KEY = 'coach_matboly_fitness_config_v1';
const LEGACY_STORAGE_KEY = 'mohamed_ahmed_fitness_config_v2';

export function useSiteConfig() {
  const [config, setConfig] = useState<SiteConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Merge with DEFAULT_SITE_CONFIG to ensure new fields are present
        const merged: SiteConfig = {
          ...DEFAULT_SITE_CONFIG,
          ...parsed,
          hero: { ...DEFAULT_SITE_CONFIG.hero, ...(parsed.hero || {}) },
          about: { ...DEFAULT_SITE_CONFIG.about, ...(parsed.about || {}) },
          subscription: { ...DEFAULT_SITE_CONFIG.subscription, ...(parsed.subscription || {}) },
          plans: { ...DEFAULT_SITE_CONFIG.plans, ...(parsed.plans || {}) },
          choices: { ...DEFAULT_SITE_CONFIG.choices, ...(parsed.choices || {}) },
          contact: { ...DEFAULT_SITE_CONFIG.contact, ...(parsed.contact || {}) },
          footer: { ...DEFAULT_SITE_CONFIG.footer, ...(parsed.footer || {}) },
        };
        // Ensure brandName and coachName are always Coach Matboly
        if (merged.footer.brandName.toLowerCase().includes('mohamed')) {
          merged.footer.brandName = 'COACH MATBOLY';
        }
        if (merged.about.coachName.toLowerCase().includes('mohamed')) {
          merged.about.coachName = 'Coach Matboly';
        }
        if (merged.about.signatureText.toLowerCase().includes('mohamed')) {
          merged.about.signatureText = 'COACH MATBOLY';
        }
        return merged;
      }
    } catch (e) {
      console.warn('Failed to parse saved config from localStorage', e);
    }
    return DEFAULT_SITE_CONFIG;
  });

  const [hasSavedNotice, setHasSavedNotice] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    } catch (e) {
      console.error('Failed to save config to localStorage', e);
    }
  }, [config]);

  const updateConfig = (newConfig: Partial<SiteConfig> | ((prev: SiteConfig) => SiteConfig)) => {
    setConfig((prev) => {
      const updated = typeof newConfig === 'function' ? newConfig(prev) : { ...prev, ...newConfig };
      return updated;
    });
    setHasSavedNotice(true);
    setTimeout(() => setHasSavedNotice(false), 2500);
  };

  const updateHero = (heroUpdates: Partial<SiteConfig['hero']>) => {
    updateConfig((prev) => ({ ...prev, hero: { ...prev.hero, ...heroUpdates } }));
  };

  const updateAbout = (aboutUpdates: Partial<SiteConfig['about']>) => {
    updateConfig((prev) => ({ ...prev, about: { ...prev.about, ...aboutUpdates } }));
  };

  const updateSubscription = (subUpdates: Partial<SiteConfig['subscription']>) => {
    updateConfig((prev) => ({ ...prev, subscription: { ...prev.subscription, ...subUpdates } }));
  };

  const updatePlans = (plansUpdates: Partial<SiteConfig['plans']>) => {
    updateConfig((prev) => ({ ...prev, plans: { ...prev.plans, ...plansUpdates } }));
  };

  const updateChoices = (choicesUpdates: Partial<SiteConfig['choices']>) => {
    updateConfig((prev) => ({ ...prev, choices: { ...prev.choices, ...choicesUpdates } }));
  };

  const updateContact = (contactUpdates: Partial<SiteConfig['contact']>) => {
    updateConfig((prev) => ({ ...prev, contact: { ...prev.contact, ...contactUpdates } }));
  };

  const updateFooter = (footerUpdates: Partial<SiteConfig['footer']>) => {
    updateConfig((prev) => ({ ...prev, footer: { ...prev.footer, ...footerUpdates } }));
  };

  const resetToDefaults = () => {
    setConfig(DEFAULT_SITE_CONFIG);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_SITE_CONFIG));
    } catch (e) {
      console.error(e);
    }
    setHasSavedNotice(true);
    setTimeout(() => setHasSavedNotice(false), 2500);
  };

  const exportConfigJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(config, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'coach_matboly_fitness_backup.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importConfigJSON = (jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString);
      setConfig(parsed);
      setHasSavedNotice(true);
      setTimeout(() => setHasSavedNotice(false), 2500);
      return { success: true };
    } catch (err: unknown) {
      return { success: false, error: err instanceof Error ? err.message : 'Invalid JSON file' };
    }
  };

  return {
    config,
    updateConfig,
    updateHero,
    updateAbout,
    updateSubscription,
    updatePlans,
    updateChoices,
    updateContact,
    updateFooter,
    resetToDefaults,
    exportConfigJSON,
    importConfigJSON,
    hasSavedNotice,
  };
}
