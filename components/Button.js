import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context/ThemeContext';

export function Button({ 
  onPress, 
  children, 
  variant = 'default', // 'default', 'secondary', 'outline'
  disabled = false, 
  style,
  textStyle
}) {
  const { theme } = useTheme();
  const isDark = theme.statusBarStyle === 'light-content';

  // Determine base background color and text color per variant
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

  // Subtle metallic sheen gradient colors (lighter at the top, solid in middle, slightly shaded at bottom)
  const sheenColors = isDark 
    ? ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)', 'rgba(0, 0, 0, 0.1)'] 
    : ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.1)', 'rgba(0, 0, 0, 0.1)'];

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
      <LinearGradient
        colors={sheenColors}
        start={{ x: 1, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.gradientOverlay}
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
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  baseButton: {
    overflow: 'hidden',
    borderWidth: 1,
    height: 44,
    // Subtle shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  gradientOverlay: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    width: '100%',
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