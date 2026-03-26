import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import { COLORS } from "../constants/index";

interface ButtonProps extends TouchableOpacityProps {
  label: string;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  style?: ViewStyle;
}

const Button: React.FC<ButtonProps> = ({
  label,
  variant = "primary",
  size = "md",
  style,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[styles.base, styles[variant], styles[size], style]}
      activeOpacity={0.8}
      {...props}
    >
      <Text style={[styles.text, styles[`${variant}Text`]]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  primary: {
    backgroundColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  secondary: {
    backgroundColor: COLORS.primaryLight,
  },
  danger: {
    backgroundColor: "#fee2e2",
  },
  ghost: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: COLORS.gray200,
  },
  sm: { paddingHorizontal: 12, paddingVertical: 7 },
  md: { paddingHorizontal: 18, paddingVertical: 11 },
  lg: { paddingHorizontal: 24, paddingVertical: 14 },
  text: { fontWeight: "800", fontSize: 14 },
  primaryText: { color: COLORS.white },
  secondaryText: { color: COLORS.primary },
  dangerText: { color: COLORS.red },
  ghostText: { color: COLORS.gray600 },
});

export default Button;
