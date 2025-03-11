import {StyleSheet, Text} from 'react-native';
import React from 'react';
import AppView from '../../common/view/AppView';
import {useTheme} from '../../theme/ThemeContext';
import AppButton from '../../common/button/AppButton';
import {useNavigation} from '@react-navigation/native';
import {Screen} from 'react-native-screens';
const LoginScreen = () => {
  const {theme} = useTheme();
  const navigation = useNavigation<any>();
  const handleLogin = () => {
    navigation.navigate('PrivateTabRoutes');
  };
  return (
    <AppView>
      <AppButton title="Login" onPress={handleLogin} />
    </AppView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
