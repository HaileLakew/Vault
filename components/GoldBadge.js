import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export function GoldBar() {
  return <View style={styles.goldBar} />;
}

export function GoldBadge({ amount }) {
  const { theme } = useTheme();
  return (
    <View style={[styles.badgeContainer, { backgroundColor: theme.goldBadgeBg, borderColor: theme.goldBadgeBorder }]}>
      <GoldBar />
      <Text style={[styles.badgeAmount, { color: theme.gold }]}>{amount.toLocaleString()}</Text>
      <Text style={[styles.badgeLabel, { color: theme.gold }]}>Gold Bars</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badgeContainer: { flexDirection: 'row', alignItems: 'center', gap: 8, borderRadius: 99, borderWidth: 1, paddingHorizontal: 12, paddingVertical: 6 },
  goldBar: { width: 12, height: 8, backgroundColor: '#E2A93A', borderRadius: 2, transform: [{ rotate: '-8deg' }] },
  badgeAmount: { fontSize: 13, fontWeight: '700' },
  badgeLabel: { fontSize: 10, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 1.5 },
});