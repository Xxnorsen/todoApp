import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../constants/index";

interface InputProps extends TextInputProps {
  onSubmit?: () => void;
  buttonLabel?: string;
}

const Input: React.FC<InputProps> = ({
  onSubmit,
  buttonLabel = "Add",
  ...props
}) => {
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.row}>
      <TextInput
        style={[styles.input, focused && styles.inputFocused]}
        placeholderTextColor={COLORS.gray400}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onSubmitEditing={onSubmit}
        returnKeyType="done"
        {...props}
      />
      {onSubmit && (
        <TouchableOpacity
          style={styles.btn}
          onPress={onSubmit}
          activeOpacity={0.8}
        >
          <Text style={styles.btnText}>{buttonLabel}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.gray50,
    borderWidth: 2,
    borderColor: COLORS.gray200,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.gray800,
  },
  inputFocused: {
    borderColor: COLORS.primaryMid,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  btn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 13,
    borderRadius: 12,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 5,
  },
  btnText: {
    color: COLORS.white,
    fontWeight: "800",
    fontSize: 15,
  },
});

export default Input;
