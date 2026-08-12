import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { useTheme } from '../context/ThemeContext';
import { TopBar } from '../components/TopBar';
import { VaultStatusCard } from '../features/VaultStatusCard';
import { TimedInfiltration } from '../features/TimedInfiltration';
import { MissionFile } from '../features/MissionFile';
import { MISSIONS } from '../constants/data';

export function PlanScreen({
  balance,
  activeLayers,
  isTimerActive,
  timerSeconds,
  isUnlockedState,
  cleared,
  onStartTimer,
  onCancelTimer,
  onStartNfcScan,
}) {
  const { theme } = useTheme();
  const isDark = theme.statusBarStyle === 'light-content';

  return (
    <View style={styles.planView}>
      <TopBar balance={balance} />
      <View style={styles.vaultWrapper}>
        <VaultStatusCard
          active={activeLayers}
          total={4}
          isTimerActive={isTimerActive}
          timerSeconds={timerSeconds}
          isUnlocked={isUnlockedState}
        />
      </View>
      
      <TimedInfiltration onStartTimer={onStartTimer} onCancelTimer={onCancelTimer} isTimerActive={isTimerActive} />
      
      <View style={styles.sectionContainer}>
        <View style={styles.missionBoardHeader}>
          <Text style={[styles.sectionTitle, { color: theme.textMuted }]}>MISSION BOARD</Text>
          <Text style={[styles.missionBoardSub, { color: theme.gold }]}>DAILY TARGETS</Text>
        </View>

        {/* Frosted Glass Wrapper */}
        <BlurView
          intensity={40}
          tint={isDark ? 'dark' : 'light'}
          style={[
            styles.frostedWrapper,
            { 
              borderColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.8)', 
              borderRadius: theme.radius['xl'],
              backgroundColor: isDark ? 'rgba(18, 24, 32, 0.3)' : 'rgba(255, 255, 255, 0.4)',
            },
          ]}
        >
          <View style={styles.missionList}>
            {MISSIONS.map((mission, i) => (
              <MissionFile key={mission.id} mission={mission} index={i} cleared={!!cleared[mission.id]} onBypass={onStartNfcScan} />
            ))}
          </View>
        </BlurView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  planView: { flex: 1, gap: 24 },
  vaultWrapper: { paddingHorizontal: 24 },
  sectionContainer: { paddingHorizontal: 24 },
  sectionTitle: { fontSize: 11, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 2.4 },
  missionBoardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  missionBoardSub: { fontSize: 11, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 1.8 },
  frostedWrapper: {
    overflow: 'hidden',
    borderWidth: 1,
    padding: 12,
  },
  missionList: { gap: 12 },
});