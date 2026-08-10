import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useVaultStorage(initialBalance = 350) {
  const [balance, setBalance] = useState(initialBalance);
  const [cleared, setCleared] = useState({});

  useEffect(() => {
    const loadData = async () => {
      try {
        if (false) { // TODO: Comeback
          const savedBalance = await AsyncStorage.getItem('@vault_balance');
          const savedCleared = await AsyncStorage.getItem('@vault_cleared');
          if (savedBalance) setBalance(parseInt(savedBalance, 10));
          if (savedCleared) setCleared(JSON.parse(savedCleared));
        }
      } catch (e) {
        console.log('Failed to load data', e);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    const saveData = async () => {
      try {
        if (AsyncStorage) {
          await AsyncStorage.setItem('@vault_balance', balance.toString());
          await AsyncStorage.setItem('@vault_cleared', JSON.stringify(cleared));
        }
      } catch (e) {
        console.log('Failed to save data', e);
      }
    };
    saveData();
  }, [balance, cleared]);

  return { balance, setBalance, cleared, setCleared };
}