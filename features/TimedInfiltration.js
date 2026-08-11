import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../context/ThemeContext';
import { Button } from '../components/Button';
import { TIMER_OPTIONS } from '../constants/data';

export function TimedInfiltration({ onStartTimer, onCancelTimer, isTimerActive }) {
  const { theme } = useTheme();
  const [selected, setSelected] = useState('30');
  const selectedOption = TIMER_OPTIONS.find((opt) => opt.id === selected);

  const handleSelect = (id) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelected(id);
  };

  return (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionHeader}>
        <Feather name="clock" size={15} color={theme.gold} />
        <Text style={[styles.sectionTitle, { color: theme.textMuted }]}>TIMED INFILTRATION</Text>
      </View>
      <View style={styles.timerGrid}>
        {TIMER_OPTIONS.map((opt) => {
          const active = selected === opt.id;
          return (
            <TouchableOpacity
              key={opt.id}
              disabled={isTimerActive}
              style={[
                styles.timerBox,
                { backgroundColor: theme.cardBg, borderColor: theme.border, borderRadius: theme.radius.xl },
                active && { borderColor: theme.gold, backgroundColor: theme.goldBadgeBg },
                isTimerActive && { opacity: 0.4 },
              ]}
              onPress={() => handleSelect(opt.id)}
            >
              <Text style={[styles.timerMinutes, { color: active ? theme.gold : theme.textPrimary }]}>{opt.minutes}</Text>
              <Text style={[styles.timerLabel, { color: active ? theme.gold : theme.textMuted }]}>{opt.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {isTimerActive ? (
        <TouchableOpacity activeOpacity={0.7} onPress={onCancelTimer} style={[styles.abortBtn, { borderRadius: theme.radius.lg }]}>
          <Text style={styles.abortBtnText}>ABORT OPERATION</Text>
        </TouchableOpacity>
      ) : (
        <Button onPress={() => onStartTimer(parseInt(selectedOption.id, 10), selectedOption.payout)} style={{ marginTop: 14, width: '100%' }}>
          {`START ${selectedOption.minutes} INFILTRATION (+${selectedOption.payout} GOLD)`}
        </Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: { paddingHorizontal: 24 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  sectionTitle: { fontSize: 11, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 2 },
  timerGrid: { flexDirection: 'row', gap: 12 },
  timerBox: { 
    flex: 1, 
    alignItems: 'center', 
    gap: 4, 
    borderWidth: 1, 
    paddingVertical: 18, 
    paddingHorizontal: 8,
  },
  timerMinutes: { fontSize: 22, fontWeight: '700', fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif' },
  timerLabel: { fontSize: 9, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 1, textAlign: 'center' },
  abortBtn: { marginTop: 14, height: 44, borderWidth: 1, borderColor: '#E24953', backgroundColor: 'rgba(226, 73, 83, 0.15)', justifyContent: 'center', alignItems: 'center', width: '100%' },
  abortBtnText: { color: '#E24953', fontSize: 12, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1.5 },
});