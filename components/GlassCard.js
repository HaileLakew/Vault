// components/GlassCard.js
import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../context/ThemeContext';

export function GlassCard({ children, style, intensity = 85 }) {
  const { theme, isDarkMode } = useTheme();

  return (
    <View
      style={[
        styles.paperCard,
        {
          // Milky/semi-opaque paper fill
      backgroundColor: isDarkMode
        ? 'rgba(18, 24, 32, 0.40)' // 40% translucent in dark mode
        : 'rgba(252, 250, 246, 0.65)',
      
      borderColor: isDarkMode
        ? 'rgba(255, 255, 255, 0.15)'
        : 'rgba(255, 255, 255, 0.75)',
          borderRadius: theme.radius['xl'],
        },
        style,
      ]}
    >
      {/* 1. Heavy Backdrop Blur for soft diffuse light */}
      <BlurView
        intensity={intensity}
        tint={isDarkMode ? 'dark' : 'light'}
        style={StyleSheet.absoluteFillObject}
      />

      {/* 2. Paper Texture Light-Diffusion Gradient Overlay */}
      <LinearGradient
        colors={[
          isDarkMode
            ? 'rgba(255, 255, 255, 0.1)'
            : 'rgba(255, 255, 255, 0.95)',
          isDarkMode
            ? 'rgba(255, 255, 255, 0.05)'
            : 'rgba(245, 242, 235, 0.60)',
        ]}
        start={{ x: .5, y: 0 }}
        end={{ x: .5, y: 1 }}
        style={StyleSheet.absoluteFillObject}
        pointerEvents="none"
      />

      {/* 3. Card Content */}
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  paperCard: {
    overflow: 'hidden',
    borderWidth: 1,
    // Soft shadow to elevate the paper surface off the background
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 16 }, // Higher vertical offset
    shadowOpacity: 0.45,                 // Darker/stronger shadow
    shadowRadius: 24,                    // Wider blur spread
    elevation: 16,  
    padding: 10
  },
  content: {
    zIndex: 1,
  },
});