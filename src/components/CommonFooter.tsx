import {StyleSheet, View} from 'react-native';
import React, {FC} from 'react';
import AppButton from '../common/button/AppButton';
import IconButton from '../common/iconButton/IconButton';
import {handlePickImages} from '../utils/SelectImage';
import {handleTakePic} from '../utils/TakePic';
interface CommonFooterProps {
  title: string;
  onPress: () => void;
  pickedImages: String[];
  setPickedImages: any;
  is_disabled?: boolean;
  multiImage?: boolean;
}
const CommonFooter: FC<CommonFooterProps> = ({
  title,
  onPress,
  pickedImages,
  setPickedImages,
  is_disabled = false,
  multiImage = true,
}) => {
  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <AppButton
          title={title}
          onPress={onPress}
          disabled={pickedImages.length === 0 && is_disabled}
        />
      </View>
      <IconButton
        name="camera"
        color="gray"
        size={24}
        onPress={() => handleTakePic({setPickedImages, multiImage})}
      />
      <IconButton
        name="image"
        color="gray"
        size={24}
        onPress={() => handlePickImages({setPickedImages, multiImage})}
      />
    </View>
  );
};

export default CommonFooter;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
});
