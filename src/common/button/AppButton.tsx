import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import React from 'react';
import {useTheme} from '../../theme/ThemeContext';

interface AppButtonProps extends TouchableOpacityProps {
  loading?: boolean;
  title: string;
}

const AppButton: React.FC<AppButtonProps> = ({loading, title, ...props}) => {
  const {COLORS} = useTheme();
  return (
    <TouchableOpacity
      style={[styles.button, {backgroundColor: COLORS.primary}]}
      disabled={loading}
      {...props}>
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
