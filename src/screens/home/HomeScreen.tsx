import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {useTheme} from '../../theme/ThemeContext';
import AppView from '../../common/view/AppView';
import AppButton from '../../common/button/AppButton';
import AppTextInput from '../../common/textInput/AppTextInput';

const HomeScreen: React.FC = () => {
  const {theme, toggleTheme} = useTheme();
  return (
    <AppView>
      <Text style={{color: theme.colors.text}}>
        Welcome to the Home Screen!
      </Text>
      <AppTextInput placeholder="Search..."></AppTextInput>
      <AppButton title="Toggle Theme" onPress={toggleTheme} />
    </AppView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default HomeScreen;
