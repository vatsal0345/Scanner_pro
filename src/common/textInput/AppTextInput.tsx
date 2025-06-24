import {StyleSheet, TextInput, TextInputProps} from 'react-native';
import React from 'react';
import {useTheme} from '../../theme/ThemeContext';

interface AppTextInputProps extends TextInputProps {}
const AppTextInput: React.FC<AppTextInputProps> = ({...props}) => {
  const {COLORS} = useTheme();
  return <TextInput {...props} style={[styles.input, {color: COLORS.text}]} />;
};

export default AppTextInput;

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});
