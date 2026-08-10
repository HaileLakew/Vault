import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { Button } from '../components/Button';
import { GoldBar } from '../components/GoldBadge';

export function RewardCard({ reward, affordable, onClaim }) {
  const { theme } = useTheme();

  return (
    <View style={styles.rewardItem}>
      <View style={[styles.rewardHeader, { backgroundColor: theme.cardHeaderBg, borderColor: theme.border, borderTopLeftRadius: theme.radius.xl, borderTopRightRadius: theme.radius.xl }]}>
        <View style={styles.rewardTicket}>
          <MaterialCommunityIcons name="ticket-confirmation-outline" size={14} color={theme.gold} />
          <Text style={[styles.rewardTicketText, { color: theme.gold }]}>VIP TICKET</Text>
        </View>
      </View>
      <View style={[styles.rewardBody, { backgroundColor: theme.cardBg, borderColor: theme.border, borderBottomLeftRadius: theme.radius.xl, borderBottomRightRadius: theme.radius.xl }]}>
        <View style={[styles.rewardIconBox, { backgroundColor: theme.bg, borderRadius: theme.radius.md }]}>
          <MaterialCommunityIcons name={reward.icon} size={20} color={theme.gold} />
        </View>
        <Text style={[styles.rewardTitle, { color: theme.textPrimary }]}>{reward.title}</Text>
        <Text style={[styles.rewardSubtitle, { color: theme.textMuted }]}>{reward.subtitle}</Text>
        <View style={styles.rewardCost}>
          <GoldBar />
          <Text style={[styles.rewardCostValue, { color: theme.gold }]}>{reward.cost.toLocaleString()}</Text>
          <Text style={[styles.rewardCostLabel, { color: theme.textMuted }]}>GOLD</Text>
        </View>
        <Button variant={affordable ? 'default' : 'secondary'} disabled={!affordable} onPress={() => onClaim(reward)} style={{ marginTop: 16, width: '100%' }}>
          {affordable ? 'CLAIM VOUCHER' : 'INSUFFICIENT GOLD'}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rewardItem: { width: '50%', padding: 6 },
  rewardHeader: { borderBottomWidth: 1, borderStyle: 'dashed', paddingHorizontal: 16, paddingVertical: 12, borderWidth: 1,  },
  rewardTicket: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  rewardTicketText: { fontSize: 9, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 2.2 },
  rewardBody: { flex: 1, padding: 16, borderWidth: 1, borderTopWidth: 0 },
  rewardIconBox: { marginBottom: 12, width: 44, height: 44, borderWidth: 1, borderColor: 'rgba(226, 169, 58, 0.25)', justifyContent: 'center', alignItems: 'center' },
  rewardTitle: { fontSize: 14, fontWeight: '700' },
  rewardSubtitle: { marginTop: 4, fontSize: 11 },
  rewardCost: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 12 },
  rewardCostValue: { fontSize: 13, fontWeight: '700' },
  rewardCostLabel: { fontSize: 10, textTransform: 'uppercase', letterSpacing: 1.5 },
});