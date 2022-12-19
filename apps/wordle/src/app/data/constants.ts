import ExpoConstants from 'expo-constants';

type OriginalConstantsType = typeof ExpoConstants;
type OriginalExpoConfigType = Omit<NonNullable<OriginalConstantsType['expoConfig']>, 'extra'>;
type ExtraType = {
  extra: {
    env: {
      serverUrl: string;
    };
  };
};
type ExpoConfigType = OriginalExpoConfigType & ExtraType;
type ConstantsType = Omit<OriginalConstantsType, 'expoConfig'> & {
  expoConfig: ExpoConfigType;
};

export const Constants = ExpoConstants as unknown as ConstantsType;
