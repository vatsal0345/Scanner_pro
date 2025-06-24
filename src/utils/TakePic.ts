import { Alert, Platform } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import {
  openSettings,
  PERMISSIONS,
  request,
  RESULTS,
} from 'react-native-permissions';

interface handleTakePicProps {
  setPickedImages: any;
  multiImage: boolean;
}

const requestCameraPermission = async () => {
  try {
    const cameraPermission = await request(
      Platform.OS === 'android'
        ? PERMISSIONS.ANDROID.CAMERA
        : PERMISSIONS.IOS.CAMERA,
    );

    let storagePermissionKey;

    const androidVersion = Platform.OS === 'android' ? Platform.Version : null;

    if (Platform.OS === 'android') {
      storagePermissionKey =
        androidVersion && androidVersion >= 33
          ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
          : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
    } else {
      storagePermissionKey = PERMISSIONS.IOS.PHOTO_LIBRARY;
    }

    const storagePermission = await request(storagePermissionKey);

    if (
      cameraPermission !== RESULTS.GRANTED ||
      storagePermission !== RESULTS.GRANTED
    ) {
      console.log('Camera or Storage permission denied');

      if (storagePermission === RESULTS.BLOCKED) {
        Alert.alert(
          'Storage Permission Blocked',
          'Please enable storage access from settings to proceed.',
          [
            { text: 'Cancel', style: 'cancel' },
            {
              text: 'Open Settings',
              onPress: () => openSettings(),
            },
          ],
        );
      }

      return false;
    }

    return true;
  } catch (error) {
    console.error('Permission error:', error);
    return false;
  }
};

export const handleTakePic = async ({
  setPickedImages,
  multiImage,
}: handleTakePicProps) => {
  const hasPermission = await requestCameraPermission();
  if (!hasPermission) return;
  try {
    const response = await launchCamera({
      mediaType: 'photo',
      cameraType: 'back',
      saveToPhotos: false,
    });
    if (multiImage) {
      setPickedImages((prev: any) => [
        ...prev,
        response.assets && response.assets[0].uri,
      ]);
    } else {
      setPickedImages({ uri: response?.assets?.[0].uri });
    }
  } catch (e) {
    console.log('Error taking picture:', e);
  }
};
