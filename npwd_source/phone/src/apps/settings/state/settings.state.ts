import { atom, AtomEffect, DefaultValue } from 'recoil';
import { IPhoneSettings, SettingEvents } from '@typings/settings';
import config from '../../../config/default.json';
import fetchNui from '@utils/fetchNui';
import { isSchemaValid } from '../utils/schema';
import { NPWD_STORAGE_KEY } from '../utils/constants';
import { getDefaultLanguage } from '@utils/language';

const getDefaultConfig = () => {
  return { ...config.defaultSettings, language: getDefaultLanguage() };
};

const localStorageEffect =
  (key): AtomEffect<IPhoneSettings> =>
  ({ setSelf, onSet }) => {
    const savedVal = localStorage.getItem(key);

    if (!savedVal) setSelf(new DefaultValue());

    try {
      const validString = isSchemaValid(savedVal);
      const settingsObj = !validString ? getDefaultConfig() : JSON.parse(savedVal);

      if (!validString) {
        console.error('Settings Schema was invalid, applying default settings');
      }

      // Triggered on init
      fetchNui(SettingEvents.NUI_SETTINGS_UPDATED, settingsObj, {}).catch();
      setSelf(settingsObj);
    } catch (e) {
      // If we are unable to parse the json string, we set default settings
      console.error('Unable to parse JSON');
      setSelf(getDefaultConfig());
    }

    onSet((newValue) => {
      // Triggered on set event
      fetchNui(SettingEvents.NUI_SETTINGS_UPDATED, newValue, {}).catch();
      if (newValue instanceof DefaultValue) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    });
  };

export const settingsState = atom<IPhoneSettings>({
  key: 'settings',
  default: getDefaultConfig(),
  effects_UNSTABLE: [localStorageEffect(NPWD_STORAGE_KEY)],
});
