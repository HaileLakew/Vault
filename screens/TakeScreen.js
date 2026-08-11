import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { GoldBadge } from '../components/GoldBadge';
import { RewardCard } from '../features/RewardCard';
import { REWARDS } from '../constants/data';

export function TakeScreen({ balance, onClaim }) {
  const { theme } = useTheme();

  return (
    <View style={[styles.takeView]}>
      <View style={styles.takeHeader}>
        <Text style={[styles.sectionTitle, { color: theme.textMuted }]}>
          THE TAKE
        </Text>
        
        {/* SERIF HEADING FIX */}
        <Text style={[styles.takeTitle, { color: theme.textPrimary }]}>
          Cash Out Rewards
        </Text>
        
        <View style={styles.takeBalance}>
          <Text style={[styles.takeBalanceLabel, { color: theme.textMuted }]}>
            Available Balance
          </Text>
          <GoldBadge amount={balance} />
        </View>
      </View>

      <View style={styles.rewardsGrid}>
        {REWARDS.map((reward) => (
          <RewardCard
            key={reward.id}
            reward={reward}
            affordable={balance >= reward.cost}
            onClaim={onClaim}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  takeView: { flex: 1, paddingBottom: 16 },
  takeHeader: { paddingHorizontal: 24, paddingTop: 20, paddingBottom: 8 },
  sectionTitle: { fontSize: 11, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 2.4 },
  
  // Applied Georgia / Serif Font Family
  takeTitle: {
    marginTop: 4,
    fontSize: 26,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  
  takeBalance: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 12 },
  takeBalanceLabel: { fontSize: 12 },
  rewardsGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 18, marginTop: 8 },
});