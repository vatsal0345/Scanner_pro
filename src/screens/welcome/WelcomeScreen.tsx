import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AppView from '../../common/view/AppView';
import AppButton from '../../common/button/AppButton';

const WelcomeScreen = () => {
  return (
    <AppView>
      <Text>WelcomeScreen</Text>
      <AppButton title="hi"></AppButton>
    </AppView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({});
