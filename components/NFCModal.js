import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

export function NfcModal({ scanningQuest, onClose }) {
  const { theme } = useTheme();

  return (
    <Modal visible={!!scanningQuest} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={[styles.modalCard, { backgroundColor: theme.cardBg, borderColor: theme.gold }]}>
          <Ionicons name="hardware-chip" size={56} color={theme.gold} style={{ marginBottom: 16 }} />
          <Text style={[styles.modalTitle, { color: theme.gold }]}>SCANNING NFC TAG...</Text>
          <Text style={[styles.modalSub, { color: theme.textMuted }]}>
            Hold your device against the [{scanningQuest?.tagLocation}] to deactivate security.
          </Text>
          <TouchableOpacity onPress={onClose} style={{ marginTop: 24 }}>
            <Text style={{ color: '#EF4444', fontWeight: 'bold', letterSpacing: 1 }}>CANCEL</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center', alignItems: 'center', padding: 24 },
  modalCard: { width: '100%', padding: 28, borderRadius: 24, alignItems: 'center', borderWidth: 1 },
  modalTitle: { fontSize: 16, fontWeight: '900', letterSpacing: 1, marginBottom: 8 },
  modalSub: { fontSize: 13, textAlign: 'center', lineHeight: 18 },
});