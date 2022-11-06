import { NativeModules } from 'react-native';

// eslint-disable-next-line func-style
const noop = () => {};

const HapticsModule = (NativeModules.Haptics || {
  impactAsync: noop,
  notificationAsync: noop,
}) as {
  impactAsync: (type: string) => Promise<void>;
  notificationAsync: (type: string) => Promise<void>;
};

async function notification(type: 'success' | 'warning' | 'error'): Promise<void> {
  return HapticsModule.notificationAsync(type);
}

async function successNotification() {
  return notification('success');
}

async function warningNotification() {
  return notification('warning');
}

async function errorNotification() {
  return notification('error');
}

async function impact(style: 'light' | 'medium' | 'heavy'): Promise<void> {
  return HapticsModule.impactAsync(style);
}

async function lightImpact() {
  return impact('light');
}

async function normalImpact() {
  return impact('medium');
}

async function heavyImpact() {
  return impact('heavy');
}

export const Haptics = {
  successNotification,
  warningNotification,
  errorNotification,
  lightImpact,
  normalImpact,
  heavyImpact,
};
