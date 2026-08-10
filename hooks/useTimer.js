import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import * as Haptics from 'expo-haptics';

export function useTimer(onSuccessPayout) {
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [activePayout, setActivePayout] = useState(0);
  const [isVaultUnlocked, setIsVaultUnlocked] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isTimerActive && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (isTimerActive && timerSeconds === 0) {
      setIsTimerActive(false);
      setIsVaultUnlocked(true);
      onSuccessPayout(activePayout);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Alert.alert('VAULT BREACHED!', `Infiltration successful. You earned +${activePayout} Gold Bars!`);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timerSeconds, activePayout, onSuccessPayout]);

  const startTimer = (minutes, payout) => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setIsVaultUnlocked(false);
    setTimerSeconds(minutes * 60);
    setActivePayout(payout);
    setIsTimerActive(true);
  };

  const cancelTimer = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    setIsTimerActive(false);
    setTimerSeconds(0);
  };

  return {
    isTimerActive,
    timerSeconds,
    isVaultUnlocked,
    startTimer,
    cancelTimer,
  };
}