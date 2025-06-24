import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  ViewProps,
  ViewStyle,
  ScrollView,
} from 'react-native';
import React from 'react';
import {useTheme} from '../../theme/ThemeContext';
interface AppViewProps extends ViewProps {
  children: React.ReactNode;
  additionalStyles?: ViewStyle;
  scrollable?: boolean;
}

const AppView: React.FC<AppViewProps> = ({
  children,
  additionalStyles,
  scrollable = false,
  ...props
}) => {
  const {COLORS} = useTheme();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {scrollable ? (
        <View style={[styles.container, {backgroundColor: COLORS.background}]}>
          <ScrollView
            contentContainerStyle={[additionalStyles]}
            showsVerticalScrollIndicator={false}
            {...props}>
            {children}
          </ScrollView>
        </View>
      ) : (
        <View
          style={[
            styles.container,
            {backgroundColor: COLORS.background},
            {...additionalStyles},
          ]}
          {...props}>
          {children}
        </View>
      )}
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
