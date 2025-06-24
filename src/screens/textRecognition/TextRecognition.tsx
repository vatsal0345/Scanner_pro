import React, {useState} from 'react';
import {View, Text, StyleSheet, Modal, TouchableOpacity} from 'react-native';
import AppView from '../../common/view/AppView';
import TextRecognition from '@react-native-ml-kit/text-recognition';
import FastImage from 'react-native-fast-image';
import CommonFooter from '../../components/CommonFooter';
import {useTheme} from '../../theme/ThemeContext';
import ImageViewer from 'react-native-image-zoom-viewer';
import {ScrollView} from 'react-native-gesture-handler';
import IconButton from '../../common/iconButton/IconButton';

const TextRecognitionScreen = () => {
  const {COLORS} = useTheme();
  const [pickedImage, setPickedImage] = useState<any>({});
  const [recognizedText, setRecognizedText] = useState<string>('');
  const [isViewerVisible, setViewerVisible] = useState(false);
  const handleImagePress = () => {
    if (Object.keys(pickedImage).length > 0) setViewerVisible(true);
  };

  const getText = async () => {
    try {
      const result = await TextRecognition.recognize(pickedImage.uri);
      setRecognizedText(result.text);
    } catch (e) {
      console.log('Error while recognizing text: ', e);
    }
  };

  return (
    <AppView>
      <View style={{flex: 1}}>
        {Object.keys(pickedImage).length > 0 ? (
          <TouchableOpacity onPress={handleImagePress}>
            <FastImage
              source={{uri: pickedImage.uri}}
              style={style.container}
            />
          </TouchableOpacity>
        ) : (
          <View>
            <Text style={[style.title, {color: COLORS.text}]}>
              Text Recognition
            </Text>
          </View>
        )}
        {recognizedText && (
          <>
            <View>
              <IconButton
                name="copy"
                onPress={() => {}}
                size={24}
                color={COLORS.oppositbgc}
              />
            </View>
            <ScrollView style={style.textContainer}>
              <Text style={{color: COLORS.text}}>{recognizedText}</Text>
            </ScrollView>
          </>
        )}
      </View>
      <CommonFooter
        title="Get Text"
        onPress={getText}
        pickedImages={pickedImage}
        setPickedImages={setPickedImage}
        multiImage={false}
      />
      <Modal visible={isViewerVisible} transparent={true}>
        <ImageViewer
          imageUrls={[{url: pickedImage.uri}]}
          enableSwipeDown={true}
          onSwipeDown={() => setViewerVisible(false)}
        />
      </Modal>
    </AppView>
  );
};
export default TextRecognitionScreen;

const style = StyleSheet.create({
  container: {
    height: 200,
    width: 200,
    alignSelf: 'center',
    borderRadius: 10,
  },
  textContainer: {
    marginVertical: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
