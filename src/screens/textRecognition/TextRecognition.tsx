// import React, {useState} from 'react';
// import {View, Text, Image, Button, ScrollView} from 'react-native';
// import {launchImageLibrary} from 'react-native-image-picker';
// import TextRecognition from '@react-native-ml-kit/text-recognition';
// import {
//   Tensor,
//   TensorflowModel,
//   useTensorflowModel,
// } from 'react-native-fast-tflite'
// const TextRecognitionScreen = () => {
//   const [imageUri, setImageUri] = useState(
//     'https://in.images.search.yahoo.com/images/view;_ylt=AwrKBJRVY8VnhYgkvji9HAx.;_ylu=c2VjA3NyBHNsawNpbWcEb2lkA2NiMmQyNGI3ZTQ3ZmY4OTQ1Yzg1MmQ4Yzg3NjQwZmFjBGdwb3MDMzkEaXQDYmluZw--?back=https%3A%2F%2Fin.images.search.yahoo.com%2Fsearch%2Fimages%3Fp%3Dimage%26type%3DE210IN826G0%26fr%3Dmcafee%26fr2%3Dpiv-web%26tab%3Dorganic%26ri%3D39&w=1080&h=1080&imgurl=blog.hootsuite.com%2Fwp-content%2Fuploads%2F2023%2F03%2FLinkedIn-image-sizes.jpg&rurl=https%3A%2F%2Famplitudemktg.com%2Fsocial-media%2F2024-social-media-image-sizes-for-all-networks-cheatsheet%2F&size=84KB&p=image&oid=cb2d24b7e47ff8945c852d8c87640fac&fr2=piv-web&fr=mcafee&tt=2024+Social+Media+Image+Sizes+for+All+Networks+%5BCHEATSHEET%5D+-+Amplitude+...&b=0&ni=21&no=39&ts=&tab=organic&sigr=F8kYWWvvRNop&sigb=veiCVSF.Ee3M&sigi=1xFDnc9sDxUO&sigt=eHNKUHYBUYjv&.crumb=A/LcqUqxfCR&fr=mcafee&fr2=piv-web&type=E210IN826G0',
//   );
//   const [recognizedText, setRecognizedText] = useState('');

//   const pickImage = () => {
//     launchImageLibrary({mediaType: 'photo'}, async response => {
//       if (response.didCancel || response.errorCode) {
//         console.warn('User cancelled image picker or error occurred');
//         return;
//       }

//       const uri = response.assets?.[0]?.uri;
//       if (uri) {
//         setImageUri(uri);
//         recognizeText(uri);
//       }
//     });
//   };

//   const recognizeText = async uri => {
//     try {
//       const result = await TextRecognition.recognize(uri);

//       if (result.blocks) {
//         const lines = [];

//         result.blocks.forEach(block => {
//           block.lines.forEach(line => {
//             lines.push(line.text); // Add each line separately
//           });
//         });

//         setRecognizedText(lines.join('\n')); // Keep line-by-line order
//       } else {
//         setRecognizedText('No text recognized.');
//       }
//     } catch (error) {
//       console.error('Text recognition error:', error);
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={{padding: 20, alignItems: 'center'}}>
//       <Button title="Pick an Image" onPress={pickImage} />
//       {imageUri && (
//         <Image
//           source={{uri: imageUri}}
//           style={{width: 300, height: 300, marginVertical: 10}}
//         />
//       )}
//       <Text style={{fontSize: 16, fontWeight: 'bold'}}>Recognized Text:</Text>
//       <Text>{recognizedText || 'No text recognized yet'}</Text>
//     </ScrollView>
//   );
// };

// export default TextRecognitionScreen;

// import React, { useState } from 'react';
// import { View, Text, Button, Image, ScrollView } from 'react-native';
// import MlkitOcr from 'react-native-mlkit-ocr';
// import { launchImageLibrary } from 'react-native-image-picker';

// export default function App() {
//   const [recognizedText, setRecognizedText] = useState([]);
//   const [imageUri, setImageUri] = useState('');

//   const pickImageAndRecognizeText = async () => {
//     const result = await launchImageLibrary({ mediaType: 'photo' });

//     if (result.assets?.length) {
//       const filePath = result.assets[0].uri;
//       setImageUri(filePath);

//       try {
//         const ocrResult = await MlkitOcr.detectFromFile(filePath);
//         setRecognizedText(ocrResult);
//       } catch (error) {
//         console.error('OCR Error:', error);
//       }
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={{ alignItems: 'center', padding: 20 }}>
//       <Button title="Pick Image & Recognize Text" onPress={pickImageAndRecognizeText} />

//       {imageUri ? <Image source={{ uri: imageUri }} style={{ width: 200, height: 200, marginVertical: 10 }} /> : null}

//       <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Recognized Text:</Text>
//       {recognizedText.length > 0 ? (
//         recognizedText.map((block, index) => <Text key={index}>{block.text}</Text>)
//       ) : (
//         <Text>No text detected.</Text>
//       )}
//     </ScrollView>
//   );
// }

// import React, {useState} from 'react';
// import {Image, Text} from 'react-native';
// import {launchImageLibrary} from 'react-native-image-picker';
// import axios from 'axios';
// import AppButton from '../../common/button/AppButton';
// import AppView from '../../common/view/AppView';

// // Replace with your actual API Key
// const API_KEY = 'AIzaSyCtFRppghb_4cAF3Pplgfd-lxth57odoxs';
// const GOOGLE_CLOUD_VISION_API = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`;

// const App = () => {

//   const [imageUri, setImageUri] = useState(null);
//   const [extractedText, setExtractedText] = useState('');

//   // Function to select an image
//   const selectImage = async () => {
//     launchImageLibrary({mediaType: 'photo'}, response => {
//       if (response.didCancel || response.error) {
//         console.log('User cancelled image selection or error occurred');
//         return;
//       }
//       if (response.assets) {
//         const imageUri = response.assets[0].uri;
//         setImageUri(imageUri);
//         processImage(imageUri);
//       }
//     });
//   };

//   // Convert image to base64 and send it to Google Cloud Vision API
//   const processImage = async imagePath => {
//     const base64Image = await convertToBase64(imagePath);
//     console.log('path', base64Image);

//     const requestPayload = {
//       requests: [
//         {
//           image: {content: base64Image},
//           features: [{type: 'TEXT_DETECTION'}],
//         },
//       ],
//     };

//     try {
//       const response = await axios.post(
//         GOOGLE_CLOUD_VISION_API,
//         requestPayload,
//       );
//       console.log('resp', response);

//       const detectedText = response.data.responses[0].fullTextAnnotation.text;
//       setExtractedText(detectedText);
//     } catch (error) {
//       console.error('Error recognizing text:', error);
//     }
//   };

//   // Convert image to base64 format
//   const convertToBase64 = async uri => {
//     const response = await fetch(uri);
//     const blob = await response.blob();
//     return new Promise(resolve => {
//       const reader = new FileReader();
//       reader.onloadend = () => resolve(reader.result.split(',')[1]);
//       reader.readAsDataURL(blob);
//     });
//   };

//   return (
//     <AppView>
//       <AppButton title="Select Image" onPress={selectImage} />
//       {imageUri && (
//         <Image
//           source={{uri: imageUri}}
//           style={{width: 300, height: 300, margin: 10}}
//         />
//       )}
//       <Text>Recognized Text: {extractedText}</Text>
//     </AppView>
//   );
// };

// export default App;
/* eslint-disable @typescript-eslint/no-var-requires */

import React, {useState} from 'react';
import {View, Button, Image, Text, ScrollView} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import TextRecognition from '@react-native-ml-kit/text-recognition';
import ImageEditor from '@react-native-community/image-editor';
import ImageColors from 'react-native-image-colors';

const HandwritingRecognition = () => {
  const [imageUri, setImageUri] = useState(null);
  const [recognizedText, setRecognizedText] = useState([]);
  const [backgroundColors, setBackgroundColors] = useState([]);
  const [colors, setColors] = React.useState(null);

  // Pick Image from Gallery
  const pickImage = () => {
    launchImageLibrary({mediaType: 'photo'}, async response => {
      if (!response.didCancel && response.assets) {
        const uri = response.assets[0].uri;
        setImageUri(uri);
        recognizeText(uri);
      }
    });
  };

  // Recognize Handwritten Text and Get Position
  const recognizeText = async uri => {
    try {
      const result = await TextRecognition.recognize(uri);

      // Extract text and bounding box
      const textBlocks = result.blocks.map(block => ({
        text: block.text,
        frame: block.frame, // {left, top, width, height}
      }));

      console.log('Recognized Text:', textBlocks);
      setRecognizedText(textBlocks);

      // Extract background colors from cropped images
      extractBackgroundColors(uri, textBlocks);
    } catch (error) {
      console.error('Text recognition error:', error);
    }
  };

  // Crop Text Area and Extract Background Color
  const extractBackgroundColors = async (uri, textBlocks) => {
    let colorsArray = [];

    for (let block of textBlocks) {
      const {left, top, width, height} = block.frame;

      try {
        // Crop the text area
        const cropData = {
          offset: {x: left, y: top},
          size: {width, height},
        };
        const croppedUri = await ImageEditor.cropImage(uri, cropData);
        if (!croppedUri) {
          return;
        }
        // Extract colors from the cropped image
        const result = await ImageColors.getColors(croppedUri, {
          fallback: '#ffffff', // Default color
          cache: true,
          // key: croppedUri, // Unique key
        });

        // Store dominant background color
        // colorsArray.push(result.dominant || '#ffffff');
      } catch (error) {
        console.error('Error extracting background color:', error);
        colorsArray.push('#ffffff'); // Default to white if an error occurs
      }
    }

    setBackgroundColors(colorsArray);
  };

  console.log('Background Colors: ==>', colors);

  return (
    <ScrollView contentContainerStyle={{padding: 20}}>
      <Button title="Pick an Image" onPress={pickImage} />
      {imageUri && (
        <Image
          source={{uri: imageUri}}
          style={{width: 200, height: 200, marginTop: 10}}
        />
      )}

      {recognizedText.length > 0 && (
        <View style={{marginTop: 10}}>
          <Text>Recognized Text with Background Colors:</Text>
          {recognizedText.map((item, index) => (
            <Text
              key={index}
              style={{
                backgroundColor: `rgb(${backgroundColors[index]?.join(',')})`,
              }}>
              "{item.text}" at {JSON.stringify(item.frame)} | Background:
              {JSON.stringify(backgroundColors[index])}
            </Text>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default HandwritingRecognition;
