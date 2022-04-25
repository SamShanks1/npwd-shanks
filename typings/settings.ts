import { SETTING_MENTIONS, SETTINGS_ALL_TWEETS } from './twitter';

export interface IconSetObject {
  custom: boolean;
  name: string;
}

export interface SettingOption<T = any> {
  label: string;
  value: T | string | number;
}

export enum KvpItems {
  NPWD_RINGTONE = 'npwd-ringtone',
  NPWD_NOTIFICATION = 'npwd-notification',
}

export interface IPhoneSettings {
  language: SettingOption;
  iconSet: SettingOption<IconSetObject>;
  wallpaper: SettingOption;
  frame: SettingOption;
  theme: SettingOption;
  zoom: SettingOption;
  streamerMode: boolean;
  ringtone: SettingOption;
  ringtoneVol: number;
  callVolume: number;
  notiSound: SettingOption;
  notiSoundVol: number;
  TWITTER_notiFilter: SettingOption<SETTING_MENTIONS | SETTINGS_ALL_TWEETS>;
  TWITTER_notiSound: SettingOption;
  TWITTER_notiSoundVol: number;
  TWITTER_notifyNewFeedTweet: boolean;
  MARKETPLACE_notifyNewListing: boolean;
}

export enum SettingEvents {
  NUI_SETTINGS_UPDATED = 'npwd:nuiSettingsUpdated',
}
