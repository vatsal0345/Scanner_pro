import {Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import ImageViewer from 'react-native-image-zoom-viewer';
import Icon from 'react-native-vector-icons/FontAwesome';
import FastImage from 'react-native-fast-image';
import {useTheme} from '../theme/ThemeContext';
interface ImageCardProps {
  imageUri: string;
  onPress?: () => void;
  imagePress?: boolean;
}

const ImageCard: React.FC<ImageCardProps> = ({
  imageUri,
  onPress,
  imagePress,
}) => {
  const {COLORS} = useTheme();
  const [isViewerVisible, setViewerVisible] = useState(false);

  const handleImagePress = () => {
    setViewerVisible(true);
  };

  return (
    <View style={styles.outerContainer}>
      <View style={[styles.close, {backgroundColor: COLORS.red}]}>
        <Icon name={'close'} size={10} onPress={onPress} />
      </View>
      <TouchableOpacity
        onPress={handleImagePress}
        style={[styles.container, {backgroundColor: COLORS.oppositbgc}]}>
        <FastImage source={{uri: imageUri}} style={styles.image} />
      </TouchableOpacity>
      {imagePress && (
        <Modal visible={isViewerVisible} transparent={true}>
          <ImageViewer
            imageUrls={[{url: imageUri}]}
            enableSwipeDown={true}
            onSwipeDown={() => setViewerVisible(false)}
          />
        </Modal>
      )}
    </View>
  );
};

export default ImageCard;

const styles = StyleSheet.create({
  close: {
    position: 'absolute',
    top: 0,
    right: 0,
    borderRadius: 100,
    zIndex: 100,
    height: 15,
    width: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {padding: 2, borderRadius: 12},
  image: {
    height: 60,
    width: 60,
    borderRadius: 10,
    resizeMode: 'contain',
    overflow: 'hidden',
  },
  outerContainer: {
    padding: 5,
  },
});
