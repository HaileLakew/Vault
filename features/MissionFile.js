import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { Button } from '../components/Button';
import { GoldBar } from '../components/GoldBadge';

export function MissionFile({ mission, index, onBypass, cleared }) {
  const { theme } = useTheme();

  return (
    <View style={[styles.missionItem, { 
      backgroundColor: 'rgba(255, 255, 255, 0.04)', borderColor: theme.border, borderRadius: theme.radius.xl }, cleared && styles.missionCleared]}>
      <View style={styles.missionTop}>
        <View style={[styles.missionIconBox, { backgroundColor: theme.bg, borderRadius: theme.radius.md }]}>
          <MaterialIcons name="fingerprint" size={22} color={theme.gold} />
        </View>
        <View style={styles.missionInfo}>
          <Text style={[styles.missionIndex, { color: theme.textMuted }]}>TARGET {String(index + 1).padStart(2, '0')}</Text>
          <Text style={[styles.missionTarget, { color: theme.textPrimary }]} numberOfLines={1}>{mission.target}</Text>
          <View style={styles.missionPayout}>
            <GoldBar />
            <Text style={[styles.missionPayoutValue, { color: theme.gold }]}>{mission.payout}</Text>
            <Text style={[styles.missionPayoutLabel, { color: theme.textMuted }]}>GOLD PAYOUT</Text>
          </View>
        </View>
      </View>
      <View style={[styles.missionActionArea, { borderTopColor: theme.border }]}>
        <Button variant={cleared ? 'secondary' : 'default'} disabled={cleared} onPress={() => onBypass(mission)} style={{ width: '100%' }}>
          {cleared ? (
            'LAYER BREACHED'
          ) : (
            <View style={styles.btnContent}>
              <MaterialCommunityIcons name="rss" size={16} color={theme.goldForeground} style={{ marginRight: 6 }} />
              <Text style={[styles.btnText, { color: theme.goldForeground }]}>{mission.action}</Text>
            </View>
          )}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  missionItem: { borderWidth: 1, overflow: 'hidden', marginVertical:10 },
  missionCleared: { opacity: 0.4 },
  missionTop: { flexDirection: 'row', alignItems: 'center', gap: 16, padding: 16 },
  missionIconBox: { width: 44, height: 44, borderWidth: 1, borderColor: 'rgba(226, 169, 58, 0.25)', justifyContent: 'center', alignItems: 'center' },
  missionInfo: { flex: 1 },
  missionIndex: { fontSize: 10, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 2 },
  missionTarget: { marginTop: 2, fontSize: 14, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 },
  missionPayout: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 },
  missionPayoutValue: { fontSize: 13, fontWeight: '700' },
  missionPayoutLabel: { fontSize: 10, fontWeight: '500', textTransform: 'uppercase', letterSpacing: 1.2 },
  missionActionArea: { borderTopWidth: 1, padding: 12 },
  btnContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  btnText: { fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1.5, fontSize: 12 },
});