import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../context/ThemeContext';

//TODO: Middle button to unlock "Master Mode" to edit parameters

export function BottomNav({ active, onChange }) {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  const TABS = [
    {
      id: 'plan',
      label: 'THE PLAN',
      renderIcon: (c) => <Feather name="clipboard" size={20} color={c} />,
    },
    {
      id: 'take',
      label: 'THE TAKE',
      renderIcon: (c) => (
        <MaterialCommunityIcons name="diamond-stone" size={20} color={c} />
      ),
    },
  ];

  const handlePress = (id) => {
    Haptics.selectionAsync();
    onChange(id);
  };

  return (
    <View
      style={[
        styles.navContainer,
        {
          backgroundColor: theme.navBg,
          borderTopColor: theme.border,
          paddingBottom: Math.max(insets?.bottom || 0, 12),
        },
      ]}
    >
      {TABS.map((tab) => {
        const isActive = active === tab.id;
        const activeColor = isActive ? theme.gold : theme.textMuted;

        return (
          <TouchableOpacity
            key={tab.id}
            activeOpacity={0.7}
            onPress={() => handlePress(tab.id)}
            style={styles.tabButton}
          >
            {/* Glowing Indicator Stack */}
            {isActive && (
              <View style={styles.indicatorWrapper}>
                {/* Soft Diffused Halo Layer */}
                <View
                  style={[
                    styles.glowHalo,
                    {
                      backgroundColor: theme.gold,
                      boxShadow: `0px 0px 14px 4px ${theme.gold}`,
                      shadowColor: theme.gold,
                    },
                  ]}
                />
                {/* Sharp Core Bar */}
                <View
                  style={[
                    styles.activeIndicator,
                    { backgroundColor: theme.gold },
                  ]}
                />
              </View>
            )}

            {tab.renderIcon(activeColor)}

            <Text style={[styles.tabLabel, { color: activeColor }]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    flexDirection: 'row',
    borderTopWidth: 1,
    paddingTop: 8,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    gap: 4,
    position: 'relative',
  },
  indicatorWrapper: {
    position: 'absolute',
    top: -8,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 8,
  },
  glowHalo: {
    position: 'absolute',
    width: 32,
    height: 4,
    borderRadius: 2,
    opacity: 0.65,

    // iOS Native
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,

    // Android Native
    elevation: 12,
  },
  activeIndicator: {
    width: 38,
    height: 2,
    borderRadius: 1,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1.8,
  },
});