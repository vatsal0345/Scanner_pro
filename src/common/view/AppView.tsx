import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  ViewProps,
  ViewStyle,
} from 'react-native';
import React from 'react';
import { useTheme } from '../../theme/ThemeContext';
interface AppViewProps extends ViewProps {
  children: React.ReactNode;
  additionalStyles?: ViewStyle;
}

const AppView: React.FC<AppViewProps> = ({children,additionalStyles, ...props}) => {
  const {theme} = useTheme();
  console.log('=>',theme);
  
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={[styles.container,{backgroundColor: theme.colors.background},{...additionalStyles}]}
        {...props}>
        {children}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
});
export default AppView;
