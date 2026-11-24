// Petits composants partagés par les écrans, pour garder un style cohérent.
import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

export const colors = {
  background: '#F8F9FA',
  card: '#FFFFFF',
  text: '#1A1A1A',
  muted: '#666666',
  primary: '#000000',
  accent: '#0066CC',
  success: '#28A745',
  danger: '#D93025',
  input: '#F1F3F5',
};

export function Button({
  title,
  onPress,
  variant = 'primary',
  disabled,
  testID,
}) {
  return (
    <TouchableOpacity
      testID={testID}
      accessibilityRole="button"
      accessibilityState={{disabled: !!disabled}}
      style={[styles.button, styles[variant], disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}>
      <Text
        style={[styles.buttonText, variant === 'ghost' && styles.ghostText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export function Chip({label, selected, onPress, testID}) {
  return (
    <TouchableOpacity
      testID={testID}
      accessibilityRole="button"
      accessibilityState={{selected: !!selected}}
      style={[styles.chip, selected && styles.chipSelected]}
      onPress={onPress}>
      <Text style={[styles.chipText, selected && styles.chipTextSelected]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 16,
  },
  primary: {backgroundColor: colors.primary},
  success: {backgroundColor: colors.success},
  danger: {backgroundColor: colors.danger},
  ghost: {backgroundColor: 'transparent'},
  disabled: {opacity: 0.4},
  buttonText: {color: '#FFFFFF', fontSize: 16, fontWeight: 'bold'},
  ghostText: {color: colors.accent, fontWeight: 'normal', fontSize: 14},
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.input,
    marginRight: 8,
    marginBottom: 8,
  },
  chipSelected: {backgroundColor: colors.primary},
  chipText: {color: colors.text, fontSize: 14},
  chipTextSelected: {color: '#FFFFFF', fontWeight: '600'},
});
