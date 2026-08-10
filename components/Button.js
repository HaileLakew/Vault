import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export function Button({ onPress, children, variant = 'default', disabled = false, style }) {
  const { theme } = useTheme();
  const isDefault = variant === 'default';

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      style={[
        styles.baseButton,
        {
          backgroundColor: isDefault ? theme.gold : theme.btnSecondaryBg,
          borderColor: isDefault ? 'transparent' : theme.border,
          borderRadius: theme.radius.lg,
        },
        disabled && styles.disabled,
        style,
      ]}
    >
      {typeof children === 'string' ? (
        <Text
          style={[
            styles.baseText,
            { color: isDefault ? theme.goldForeground : theme.btnSecondaryText },
            disabled && { color: theme.textMuted },
          ]}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  baseButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderWidth: 1, height: 44, paddingHorizontal: 16 },
  baseText: { fontWeight: '700', textAlign: 'center', textTransform: 'uppercase', letterSpacing: 1.5, fontSize: 12 },
  disabled: { opacity: 0.5 },
});