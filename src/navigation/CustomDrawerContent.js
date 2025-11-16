import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, fontSize, fontWeight } from '../shared/theme';

export const CustomDrawerContent = ({ navigation, state }) => {
  const routes = [
    { name: 'Home', label: 'Home', icon: 'home-outline' },
    { name: 'FAQ', label: 'FAQ', icon: 'help-circle-outline' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://i.imgur.com/kHYLq8o.png' }}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Adote PET</Text>
        <Text style={styles.subtitle}>Encontre seu novo amigo</Text>
      </View>

      <View style={styles.menu}>
        {routes.map((route) => {
          const isFocused = state.index === state.routes.findIndex(r => r.name === route.name);

          return (
            <TouchableOpacity
              key={route.name}
              style={[styles.menuItem, isFocused && styles.menuItemActive]}
              onPress={() => navigation.navigate(route.name)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={route.icon}
                size={24}
                color={isFocused ? colors.primary : colors.textLight}
              />
              <Text
                style={[
                  styles.menuText,
                  isFocused && styles.menuTextActive,
                ]}
              >
                {route.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Versão 1.0.0</Text>
        <Text style={styles.footerText}>© 2025 Adote PET</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    backgroundColor: colors.primaryLight,
    padding: spacing.lg,
    paddingTop: spacing.xxl + spacing.md,
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: spacing.md,
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: fontSize.sm,
    color: colors.textLight,
  },
  menu: {
    flex: 1,
    paddingTop: spacing.lg,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  menuItemActive: {
    backgroundColor: colors.primaryLight,
    borderRightWidth: 4,
    borderRightColor: colors.primary,
  },
  menuText: {
    fontSize: fontSize.md,
    color: colors.textLight,
    marginLeft: spacing.md,
    fontWeight: fontWeight.medium,
  },
  menuTextActive: {
    color: colors.primary,
    fontWeight: fontWeight.bold,
  },
  footer: {
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    alignItems: 'center',
  },
  footerText: {
    fontSize: fontSize.xs,
    color: colors.textGray,
  },
});
