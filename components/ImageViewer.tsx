import { ImageSourcePropType, StyleSheet } from 'react-native';
/**
 * ImageSourcePropType represents any valid image source in React Native.
 * It accepts:
 * 1. Local static files via require() or import: require('./assets/sticker.png')
 * 2. Remote network images via URI objects: { uri: 'https://example.com/image.png' }
 * 
 * Pass this directly to the 'source' prop of a React Native <Image /> component.
 */
import { Image } from 'expo-image';

type Props = {
  imgSource: ImageSourcePropType;
  selectedImage?: string;
};

export default function ImageViewer({ imgSource , selectedImage }: Props) {
const imageSource = selectedImage ? { uri: selectedImage } : imgSource;
return <Image source={imageSource} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});
