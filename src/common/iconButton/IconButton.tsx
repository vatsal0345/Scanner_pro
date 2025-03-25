import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

interface IconButtonProps {
  name: string;
  size: number;
  color: string;
  onPress: () => void;
  activeOpacity?: number;
}

const IconButton: React.FC<IconButtonProps> = ({
  name,
  size,
  color,
  onPress,
  activeOpacity = 0,
}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={activeOpacity}>
      <Icon name={name} size={size} color={color} />
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({});
