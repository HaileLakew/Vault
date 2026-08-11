import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, StatusBar, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, PlayfairDisplay_600SemiBold } from '@expo-google-fonts/playfair-display';
import { Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

import { ThemeProvider, useTheme } from './context/ThemeContext';
import { useVaultStorage } from './hooks/useVaultStorage';
import { useTimer } from './hooks/useTimer'; 
import { PlanScreen } from './screens/PlanScreen'; 
import { TakeScreen } from './screens/TakeScreen';
import { BottomNav } from './components/BottomNav';
import { NfcModal } from './components/NFCModal';

import { LinearGradient } from 'expo-linear-gradient';

function VaultAppContent() {
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const [tab, setTab] = useState('plan');
  const [scanningQuest, setScanningQuest] = useState(null);

  const { balance, setBalance, cleared, setCleared } = useVaultStorage(350);

  const { isTimerActive, timerSeconds, isVaultUnlocked, startTimer, cancelTimer } = useTimer((payout) => {
    setBalance((b) => b + payout);
  });

  const handleStartNfcScan = (mission) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setScanningQuest(mission);

    setTimeout(() => {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setCleared((prev) => ({ ...prev, [mission.id]: true }));
      setBalance((b) => b + mission.payout);
      setScanningQuest(null);
    }, 2000);
  };

  const handleClaim = (reward) => {
    if (balance < reward.cost) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setBalance((b) => b - reward.cost);
    Alert.alert('VOUCHER CLAIMED', `You have redeemed: ${reward.title}`);
  };

  const clearedCount = Object.values(cleared).filter(Boolean).length;
  const activeLayers = Math.max(0, 4 - clearedCount);
  const isUnlockedState = isVaultUnlocked || activeLayers === 0;

  return (
    <SafeAreaView style={[styles.safeArea]} edges={['top', 'left', 'right']}>
      <StatusBar barStyle={theme.statusBarStyle} />
      <View style={[styles.container]}>
      <LinearGradient
        colors={theme.backgroundGradient}
        locations={[0, 0.245, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFillObject}
        pointerEvents="none"
      />

        <ScrollView
          style={styles.mainScroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        > 
          {tab === 'plan' ? (
            <PlanScreen
              balance={balance}
              activeLayers={activeLayers}
              isTimerActive={isTimerActive}
              timerSeconds={timerSeconds}
              isUnlockedState={isUnlockedState}
              cleared={cleared}
              onStartTimer={startTimer}
              onCancelTimer={cancelTimer}
              onStartNfcScan={handleStartNfcScan}
            />
          ) : (
            <TakeScreen balance={balance} onClaim={handleClaim} />
          )}
        </ScrollView>

        {/* FLOATING STICKY THEME TOGGLE */}
        <TouchableOpacity
          onPress={toggleTheme}
          activeOpacity={0.8}
          style={[
            styles.floatingThemeBtn,
            { backgroundColor: theme.cardBg, borderColor: theme.border },
          ]}
        >
          <Feather name={isDarkMode ? 'sun' : 'moon'} size={18} color={theme.gold} />
        </TouchableOpacity>

        <BottomNav active={tab} onChange={setTab} />
      </View>

      <NfcModal scanningQuest={scanningQuest} onClose={() => setScanningQuest(null)} />
    </SafeAreaView>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    PlayfairDisplay: PlayfairDisplay_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <VaultAppContent />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1, position: 'relative' },
  mainScroll: { flex: 1 },
  scrollContent: { paddingBottom: 24 },
  floatingThemeBtn: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 6,
  },
});