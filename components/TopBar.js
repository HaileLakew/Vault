import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { GoldBadge } from './GoldBadge';

export function TopBar({ balance }) {
  const { theme } = useTheme();

  return (
    <View style={styles.topBar}>
      {/* Left Group: Security Status */}
      <View style={styles.gridStatus}>
        <View style={styles.gridDotWrapper}>
          <View style={[styles.gridDot, { backgroundColor: theme.gold }]} />
        </View>
        <Feather name="shield" size={14} color={theme.gold} />
        <Text
          style={[styles.gridText, { color: theme.textMuted }]}
          numberOfLines={1}
        >
          SECURITY GRID:{' '}
          <Text style={{ color: theme.textPrimary, fontWeight: '700' }}>
            ACTIVE
          </Text>
        </Text>
      </View>

      {/* Right Group: Currency Badge */}
      <GoldBadge amount={balance} />
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    width: '100%',
  },
  gridStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexShrink: 1,
  },
  gridDotWrapper: {
    width: 8,
    height: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  gridText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
});