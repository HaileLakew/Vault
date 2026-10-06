import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

export function Summary({
  progress = 0.65,
  tasksCompleted = 4,
  totalTasks = 6,
  streakDays = 5,
  xpEarned = 350,
}) {
  const { theme } = useTheme();

  // Percentage value for bar width (0% - 100%)
  const progressPercent = `${Math.min(Math.max(progress, 0), 1) * 100}%`;

  return (
    <View
      style={[
        styles.cardContainer,
        {
          backgroundColor: theme.cardBg,
          borderColor: theme.border,
        },
      ]}
    >
      {/* Header */}
      <View style={styles.headerRow}>
        <View style={styles.titleGroup}>
          <Text style={[styles.summaryLabel, { color: theme.gold }]}>
            Summary
          </Text>
          <Text style={[styles.subText, { color: theme.textMuted }]}>
            Weekly Progress
          </Text>
        </View>

        <View
          style={[
            styles.badge,
            { backgroundColor: theme.goldBadgeBg, borderColor: theme.goldBadgeBorder },
          ]}
        >
          <Text style={[styles.taskCount, { color: theme.gold }]}>
            {tasksCompleted}/{totalTasks} COMPLETED
          </Text>
        </View>
      </View>

      {/* Progress Bar Container */}
      <View style={styles.progressSection}>
        <View style={[styles.progressTrack, { backgroundColor: theme.btnSecondaryBg }]}>
          {/* Subtle Glow Layer */}
          <View
            style={[
              styles.glowEffect,
              {
                width: progressPercent,
                backgroundColor: theme.gold,
                shadowColor: theme.gold,
              },
            ]}
          />

          {/* Solid Bar Fill */}
          <View
            style={[
              styles.progressFill,
              {
                width: progressPercent,
                backgroundColor: theme.gold,
              },
            ]}
          />
        </View>
      </View>

      {/* Stats Quick Grid */}
      <View style={[styles.statsRow, { borderTopColor: theme.border }]}>
        <View style={styles.statItem}>
          <Feather name="zap" size={14} color={theme.gold} />
          <Text style={[styles.statValue, { color: theme.textPrimary }]}>
            {streakDays} Days
          </Text>
          <Text style={[styles.statLabel, { color: theme.textMuted }]}>
            Active Streak
          </Text>
        </View>

        <View style={[styles.statDivider, { backgroundColor: theme.border }]} />

        <View style={styles.statItem}>
          <Feather name="award" size={14} color={theme.gold} />
          <Text style={[styles.statValue, { color: theme.textPrimary }]}>
            +{xpEarned} XP
          </Text>
          <Text style={[styles.statLabel, { color: theme.textMuted }]}>
            Points Earned
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    gap: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleGroup: {
    gap: 2,
  },
  summaryLabel: {
    fontSize: 20,
    fontWeight: '700',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  subText: {
    fontSize: 12,
    fontWeight: '400',
    letterSpacing: 0.2,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
  },
  taskCount: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.1,
  },
  progressSection: {
    paddingVertical: 2,
  },
  progressTrack: {
    height: 8,
    borderRadius: 4,
    width: '100%',
    overflow: 'visible',
    position: 'relative',
  },
  glowEffect: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    borderRadius: 4,
    opacity: 0.35,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 3,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 14,
    borderTopWidth: 1,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '700',
    marginTop: 2,
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '400',
  },
  statDivider: {
    width: 1,
    height: 28,
  },
});