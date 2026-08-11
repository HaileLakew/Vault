import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';

// TODO: A subtle metal sheen or shadow?

export function Button({ 
  onPress, 
  children, 
  variant = 'default', // 'default', 'secondary', 'outline'
  disabled = false, 
  style,
  textStyle
}) {
  const { theme } = useTheme();

  // Determine styles based on variant
  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return {
          backgroundColor: theme.btnSecondaryBg,
          borderColor: theme.border,
          textColor: theme.btnSecondaryText,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderColor: theme.gold,
          textColor: theme.gold,
        };
      case 'default':
      default:
        return {
          backgroundColor: theme.gold,
          borderColor: 'transparent',
          textColor: theme.goldForeground,
        };
    }
  };

  const variantStyle = getVariantStyles();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      style={[
        styles.baseButton,
        {
          backgroundColor: variantStyle.backgroundColor,
          borderColor: variantStyle.borderColor,
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
            { color: disabled ? theme.textMuted : variantStyle.textColor },
            textStyle,
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
  baseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    height: 44,
    paddingHorizontal: 16,
  },
  baseText: {
    fontWeight: '700',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    fontSize: 12,
  },
  disabled: {
    opacity: 0.5,
  },
});