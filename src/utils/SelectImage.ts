import { launchImageLibrary } from "react-native-image-picker";
interface handlePickImagesProps {
    setPickedImages: any;
    multiImage: boolean;
}
export const handlePickImages = async ({ setPickedImages, multiImage }: handlePickImagesProps) => {
    try {
        const result = await launchImageLibrary({
            mediaType: 'photo',
            selectionLimit: multiImage ? 5 : 1,
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

        if (imagePaths.length === 0) {
            console.log('No valid images selected');
            return;
        }

        if (multiImage) {
            setPickedImages((prev: any) => [...prev, ...imagePaths]);
        } else {
            setPickedImages({ uri: imagePaths[0] });
        }
    } catch (error) {
        console.error('Error picking images:', error);
    }
};