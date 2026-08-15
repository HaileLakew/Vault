import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../context/ThemeContext';

export function BottomNav({ active, onChange, onIslandPress }) {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  const bottomInset = insets?.bottom || 0;
  const navHeight = 64 + bottomInset;

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
        styles.container,
        {
          height: navHeight,
          paddingBottom: Math.max(bottomInset, 12),
        },
      ]}
    >
      {/* SVG Background with Center Concave Notch */}
      <View style={StyleSheet.absoluteFillObject}>
        <Svg height="100%" width="100%" viewBox="0 0 375 72" preserveAspectRatio="none">
          <Path
            d="M0,0 
               L132,0 
               C148,0 156,22 187,22 
               C218,22 226,0 243,0 
               L375,0 
               L375,72 
               L0,72 
               Z"
            fill={theme.navBg}
            stroke={theme.border}
            strokeWidth="1"
          />
        </Svg>
      </View>

      {/* Tabs and Island Content */}
      <View style={styles.navContent}>
        {/* Left Tab */}
        {renderTab(TABS[0], active === TABS[0].id, handlePress, theme)}

        {/* Central Island Button Container */}
        <View style={styles.islandContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              onIslandPress?.();
            }}
            style={[
              styles.islandButton,
              { 
                backgroundColor: theme.cardBg, 
                borderColor: theme.border, 
                shadowColor: '#000',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.25), 0px 0px 8px rgba(207, 157, 120, 0.8)',
              },
            ]}
          >
            <Feather name="shield" size={25} color={theme.gold} />
          </TouchableOpacity>
        </View>

        {/* Right Tab */}
        {renderTab(TABS[1], active === TABS[1].id, handlePress, theme)}
      </View>
    </View>
  );
}

function renderTab(tab, isActive, handlePress, theme) {
  const activeColor = isActive ? theme.gold : theme.textMuted;

  return (
    <TouchableOpacity
      key={tab.id}
      activeOpacity={0.7}
      onPress={() => handlePress(tab.id)}
      style={styles.tabButton}
    >
      {isActive && (
        <View style={styles.indicatorWrapper}>
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
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'flex-end',
    overflow: 'visible',
    backgroundColor: 'transparent',
    zIndex: 100,
  },
  navContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    gap: 2,
    position: 'relative',
  },
  islandContainer: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 99,
    overflow: 'visible',
  },
  islandButton: {
    position: 'absolute',
    top: -55,
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // shadowOffset: { width: 0, height: 10 },
    // shadowOpacity: 0.5,
    // shadowRadius: 5,
    elevation: 4,
  },
  indicatorWrapper: {
    position: 'absolute',
    top: -4,
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
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
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