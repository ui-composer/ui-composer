import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Constants } from '../data/constants';
import { Level } from '../data/levels';

type GameBuilderParams = {
  level: Level;
};

export function gameBuilder({ level }: GameBuilderParams) {
  const sessionId = Constants.sessionId;
  const metadata = {
    level,
  };

  async function saveGame() {
    try {
      await AsyncStorage.setItem('game', sessionId);
    } catch (e) {
      Alert.alert('Error! While saving data for game');
    }
  }

  async function createGame() {
    try {
      await AsyncStorage.setItem('game', sessionId);
    } catch (e) {
      Alert.alert('Error! While saving data for game');
    }
  }

  return { createGame, saveGame, metadata };
}
