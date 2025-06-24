import {Text, ScrollView, Alert, Platform} from 'react-native';
import React, {useState} from 'react';
import {createPdf} from 'react-native-images-to-pdf';
import AppView from '../../common/view/AppView';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import ImageCard from '../../components/ImageCard';
import {useTheme} from '../../theme/ThemeContext';
import RNFS from 'react-native-fs';
import CommonFooter from '../../components/CommonFooter';

const ImageToPdf = () => {
  const {theme} = useTheme();
  const [pickedImages, setPickedImages] = useState<any>([]);

  const requestStoragePermissions = async () => {
    let permission;

    if (Platform.OS === 'android') {
      const androidVersion = Platform.Version;

      if (androidVersion >= 33) {
        permission = PERMISSIONS.ANDROID.READ_MEDIA_IMAGES;
      } else {
        permission = PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE;
      }
    } else {
      permission = PERMISSIONS.IOS.PHOTO_LIBRARY;
    }

    const result = await request(permission);

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
      Alert.alert('No images selected', 'Please select at least one image.');
      return;
    }
    const fileName = `Scanner_Pro_${Date.now()}`;
    const outputPath =
      Platform.OS === 'android'
        ? `${RNFS.DownloadDirectoryPath}/${fileName}.pdf`
        : `${RNFS.DocumentDirectoryPath}/${fileName}.pdf`;

    const options = {
      pages: pickedImages.map((imagePath: any) => ({imagePath})),
      outputPath,
    };
    try {
      const pdfPath = await createPdf(options);
      Alert.alert('PDF Created', `Saved at:\n${pdfPath}`);
    } catch (error) {
      Alert.alert('Error', 'Failed to create PDF.');
    }
  };
  return (
    <AppView>
      <Text
        style={{
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
            <ImageCard
              key={index}
              imageUri={imageUri}
              imagePress
              onPress={() => {
                const filteredImage = pickedImages.filter(
                  (image: string) => imageUri !== image,
                );
                setPickedImages(filteredImage);
              }}
            />
          ))
        ) : (
          <Text style={{color: theme.colors.text}}>No images selected</Text>
        )}
      </ScrollView>
      <CommonFooter
        title="Create PDF"
        onPress={myAsyncPDFFunction}
        pickedImages={pickedImages}
        setPickedImages={setPickedImages}
      />
    </AppView>
  );
};

export default ImageToPdf;
