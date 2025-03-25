import React, {useState} from 'react';
import {Platform, View, Text} from 'react-native';
import AppView from '../../common/view/AppView';
import AppButton from '../../common/button/AppButton';
import TextRecognition from '@react-native-ml-kit/text-recognition';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import FastImage from 'react-native-fast-image';
import IconButton from '../../common/iconButton/IconButton';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import getTextFromImage from '../../utils/GoogleVision';

const TextRecognitionScreen = () => {
  const [pickedImage, setPickedImage] = useState<any>({});
  const [recognizedText, setRecognizedText] = useState<string>('');
  const handleImagePick = async () => {
    try {
      const imageOptions = {mediaType: 'photo', includeBase64: true};
      const response = await launchImageLibrary(imageOptions);
      setPickedImage(response.assets && response?.assets[0]);
    } catch (e) {
      console.error('e');
    }
  };

  const requestCameraPermission = async () => {
    const result = await request(
      Platform.OS === 'android'
        ? PERMISSIONS.ANDROID.CAMERA
        : PERMISSIONS.IOS.CAMERA,
    );
    if (result !== RESULTS.GRANTED) {
      console.error('Camera permission denied');
      return false;
    }
    return true;
  };

  const handleImageClick = async () => {
    try {
      const hasPermission = await requestCameraPermission();
      if (!hasPermission) return;

      const imageOptions = {
        mediaType: 'photo',
        cameraType: 'back',
        saveToPhotos: false,
        includeBase64: true,
      };

      const response = await launchCamera(imageOptions);
      setPickedImage(response.assets && response?.assets[0]);
    } catch (e) {
      console.error('Error taking picture:', e);
    }
  };

  const getText = async () => {
    const result = await TextRecognition.recognize(pickedImage.uri);
    console.log(result.text);
    setRecognizedText(result.text);
  };

  return (
    <AppView>
      <View style={{flex: 1}}>
        {pickedImage && (
          <FastImage
            source={{uri: pickedImage.uri}}
            style={{
              height: 200,
              width: 200,
              alignSelf: 'center',
              borderRadius: 10,
            }}
          />
        )}
        <Text>{recognizedText}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          gap: 8,
          alignItems: 'center',
        }}>
        <View style={{flex: 1}}>
          <AppButton title="Get Text" onPress={getText} />
        </View>
        <IconButton
          name="camera"
          color="gray"
          size={24}
          onPress={handleImageClick}
        />
        <IconButton
          name="image"
          color="gray"
          size={24}
          onPress={handleImagePick}
        />
      </View>
    </AppView>
  );
};
export default TextRecognitionScreen;
