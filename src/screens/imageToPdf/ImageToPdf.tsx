import {Text, ScrollView, Alert, Platform, View} from 'react-native';
import React, {useState} from 'react';
import {createPdf} from 'react-native-images-to-pdf';
import AppButton from '../../common/button/AppButton';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AppView from '../../common/view/AppView';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import ImageCard from '../../components/ImageCard';
import {useTheme} from '../../theme/ThemeContext';
import IconButton from '../../common/iconButton/IconButton';
const TextRecognition = () => {
  const {theme} = useTheme();
  const [pickedImages, setPickedImages] = useState<any>([]);

  const handlePickImages = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 5,
      });

      if (result.didCancel) {
        console.log('User cancelled image picker');
        return;
      }
      if (result.errorMessage) {
        console.log('Image Picker Error:', result.errorMessage);
        return;
      }

      const imagePaths = result.assets?.map(asset => asset.uri) || [];
      console.log('Selected Images:', imagePaths);

      if (imagePaths.length === 0) {
        console.log('No valid images selected');
        return;
      }

      setPickedImages(imagePaths);
    } catch (error) {
      console.log('Error picking images:', error);
    }
  };
  const requestCameraPermission = async () => {
    const result = await request(
      Platform.OS === 'android'
        ? PERMISSIONS.ANDROID.CAMERA
        : PERMISSIONS.IOS.CAMERA,
    );
    if (result !== RESULTS.GRANTED) {
      console.log('Camera permission denied');
      return false;
    }
    return true;
  };

  const handleTakePic = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return;
    try {
      const response = await launchCamera({
        mediaType: 'photo',
        cameraType: 'back',
        saveToPhotos: false,
      });
      setPickedImages([response.assets && response.assets[0].uri]);
    } catch (e) {
      console.log('Error taking picture:', e);
    }
  };

  const requestStoragePermissions = async () => {
    const result = await request(
      Platform.OS === 'android'
        ? PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
        : PERMISSIONS.IOS.PHOTO_LIBRARY,
    );
    if (result !== RESULTS.GRANTED) {
      console.error('Storage permission denied');
      return false;
    }
    return true;
  };

  const myAsyncPDFFunction = async () => {
    const hasPermission = await requestStoragePermissions();
    if (!hasPermission) return;

    if (pickedImages.length === 0) {
      console.log('No images selected. Cannot create PDF.');
      return;
    }

    const outputPath = `/storage/emulated/0/Download/MyMultiPagePDF.pdf`;

    const options = {
      pages: pickedImages.map((imagePath: any) => ({imagePath})),
      outputPath,
    };

    try {
      const pdfPath = await createPdf(options);
      console.log(`PDF created successfully at: ${pdfPath}`);
      Alert.alert(`PDF saved at: ${pdfPath}`);
    } catch (error) {
      console.log('Failed to create PDF:', error);
    }
  };

  return (
    <AppView>
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          marginBottom: 10,
          color: theme.colors.text,
        }}>
        Multi-Image PDF Generator
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{flexDirection: 'row'}}>
        {pickedImages.length > 0 ? (
          pickedImages.map((imageUri: any, index: any) => (
            <ImageCard key={index} imageUri={imageUri} imagePress />
          ))
        ) : (
          <Text style={{color: theme.colors.text}}>No images selected</Text>
        )}
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          gap: 8,
          alignItems: 'center',
        }}>
        <View style={{flex: 1}}>
          <AppButton
            title="Create PDF"
            onPress={myAsyncPDFFunction}
            disabled={pickedImages.length === 0}
          />
        </View>
        <IconButton
          name="camera"
          color="gray"
          size={24}
          onPress={handleTakePic}
        />
        <IconButton
          name="image"
          color="gray"
          size={24}
          onPress={handlePickImages}
        />
      </View>
    </AppView>
  );
};

export default TextRecognition;
