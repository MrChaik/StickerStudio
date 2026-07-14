import { Text, View, StyleSheet } from "react-native";
import ImageViewer from "@/components/ImageViewer";
import Button from "@/components/Button";
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import CircleButton from '@/components/CircleButton';
import IconButton from '@/components/IconButton';

const PlaceholderImage = require('@/assets/images/background-image.png');

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({ //The launchImageLibraryAsync() receives an object to specify different options. This object is the ImagePickerOptions object, which we are passing when invoking the method.
      mediaTypes: ['images'], //The mediaTypes property is used to specify the type of media that can be selected. In this case, we are allowing both videos and images to be selected.
      allowsMultipleSelection: false, //The allowMultipleSelection property is used to specify whether the user can select multiple images or not. In this case, we are allowing only one image to be selected.
      allowsEditing: true, // When allowsEditing is set to true, the user can crop the image during the selection process on Android and iOS.
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert('You did not select any image.');
    }
  };
  const onAddSticker = () => {
  }
  const onReset = () => {
    setShowAppOptions(false);
  }
  const onSaveImageAsync = () => {
  }
   return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
      </View>
      {showAppOptions ? (
         <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
          </View>
        </View>
      ) : (
      <View style={styles.footerContainer}>
        <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
        <Button label="Use this photo" onPress={() => setShowAppOptions(true)} />
      </View>
)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
  },
   footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  
});
