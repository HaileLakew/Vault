import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Platform, Animated } from 'react-native';
import Svg, { Circle, G, Defs, Filter, FeGaussianBlur, FeMerge, FeMergeNode } from 'react-native-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

import { useTheme } from '../context/ThemeContext';
import { GlassCard } from '../components/GlassCard';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export function VaultStatusCard({
  active = 3,
  total = 4,
  isTimerActive = false,
  timerSeconds = 0,
  isUnlocked = false,
}) {
  const { isDarkMode, theme } = useTheme();

  // Animation value for the pulsing glow
  const pulseAnim = useRef(new Animated.Value(0.12)).current;

  const radius = 78;
  const circumference = 2 * Math.PI * radius;
  const progress = active / total;
  const dash = circumference * progress;

  const formatTime = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const accentColor = isUnlocked ? theme.green : theme.gold;
  const iconName = isTimerActive ? 'clock' : isUnlocked ? 'unlock' : 'lock';

  useEffect(() => {
    // Create a continuous looping pulse animation
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 0.35, // Peak glow opacity
          duration: 1500,
          useNativeDriver: false,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.10, // Dimmer glow opacity
          duration: 1500,
          useNativeDriver: false,
        }),
      ])
    );

    animation.start();

    return () => animation.stop();
  }, [pulseAnim]);

  return (
    <View>
      <GlassCard>
        <View style={styles.cardContent}>
          <Text
            style={[
              styles.vaultCardLabel,
              { color: isUnlocked ? theme.green : theme.textMuted },
            ]}
          >
            {isTimerActive
              ? '/// INFILTRATION IN PROGRESS'
              : isUnlocked
              ? '/// ACCESS GRANTED — PHONE UNLOCKED'
              : 'VAULT LOCK STATUS'}
          </Text>

          {/* SVG Dial with Neon Glow */}
          <View style={styles.dialWrapper}>
            <Svg width={180} height={180} viewBox="0 0 180 180">
              <Defs>
                <Filter id="goldGlow" x="-30%" y="-30%" width="160%" height="160%">
                  <FeGaussianBlur stdDeviation="6" result="coloredBlur" />
                  <FeMerge>
                    <FeMergeNode in="coloredBlur" />
                    <FeMergeNode in="coloredBlur" />
                    <FeMergeNode in="SourceGraphic" />
                  </FeMerge>
                </Filter>
              </Defs>

              <G rotation="-90" origin="90, 90">
                {/* Static / Subtle Ambient Glow Halo Layer */}
                <AnimatedCircle
                  cx="90" 
                  cy="90" 
                  r={radius}
                  fill="none"
                  stroke={accentColor}
                  strokeWidth="6"
                  opacity={pulseAnim}
                  strokeDasharray={[dash, circumference]}
                  strokeLinecap="round"
                />

                {/* Primary Arc with Animated Glow */}
                <AnimatedCircle
                  cx="90" cy="90" r={radius}
                  fill="none"
                  stroke={accentColor}
                  strokeWidth="1.5"
                  strokeDasharray={[dash, circumference]}
                  strokeLinecap="round"
                  opacity={pulseAnim + .25} 
                  filter="url(#goldGlow)"
                />
              </G>
            </Svg>

            {/* Vault Door with Gradient */}
            <LinearGradient
              colors={[theme.cardHeaderBg, theme.bg]}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              style={[
                styles.doorOuter,
                { borderWidth: isDarkMode ? 0 : 1},
                { borderColor: isUnlocked ? 'rgba(16, 185, 129, 0.25)' : 'rgba(226, 169, 58, 0.25)' },
              ]}
            >
              <View
                style={[
                  styles.doorInner,
                  {
                    borderColor: isUnlocked ? 'rgba(16, 185, 129, 0.20)' : 'rgba(226, 169, 58, 0.20)',
                    backgroundColor: isUnlocked ? 'rgba(16, 185, 129, 0.10)' : theme.cardBg,
                  },
                ]}
              >
                <Feather name={iconName} size={32} color={accentColor} />
              </View>
            </LinearGradient>
          </View>

          {/* Status Display & Numbers */}
          {isTimerActive ? (
            <View style={styles.statusDisplay}>
              <Text style={[styles.timerCountdownText, { color: theme.gold }]}>
                {formatTime(timerSeconds)}
              </Text>
              <Text style={[styles.vaultDesc, { color: theme.textMuted }]}>
                TIME REMAINING
              </Text>
            </View>
          ) : isUnlocked ? (
            <View style={styles.statusDisplay}>
              <Text style={[styles.unlockedTitle, { color: theme.green }]}>
                UNLOCKED
              </Text>
              <Text style={[styles.vaultDesc, { color: theme.green }]}>
                FULL ACCESS GRANTED
              </Text>
            </View>
          ) : (
            <>
              <View style={styles.vaultNumbers}>
                <Text style={[styles.serifNumber, { color: theme.textPrimary }]}>
                  {active}
                </Text>
                <Text style={[styles.vaultNumberTotal, { color: theme.textMuted }]}>
                  of {total}
                </Text>
              </View>
              <Text style={[styles.vaultDesc, { color: theme.gold }]}>
                SECURITY LAYERS ACTIVE
              </Text>
            </>
          )}
        </View>
      </GlassCard>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContent: {
    alignItems: 'center',
    position: 'relative',
    padding: 10,
    zIndex: 1,
  },
  vaultCardLabel: {
    marginBottom: 20,
    fontSize: 11,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 2.4,
  },
  dialWrapper: {
    position: 'relative',
    width: 180,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
  doorOuter: {
    position: 'absolute',
    width: 128,
    height: 128,
    borderRadius: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  doorInner: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vaultNumbers: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
    marginTop: 20,
  },
  serifNumber: {
    fontSize: 32,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  vaultNumberTotal: {
    fontSize: 14,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  vaultDesc: {
    marginTop: 4,
    fontSize: 11,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  statusDisplay: {
    alignItems: 'center',
    marginTop: 16,
  },
  unlockedTitle: {
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 2,
  },
  timerCountdownText: {
    fontSize: 36,
    fontWeight: '900',
    letterSpacing: 2,
  },
});