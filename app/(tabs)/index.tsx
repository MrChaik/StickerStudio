import { Text, View, StyleSheet, ImageSourcePropType } from "react-native";
import ImageViewer from "@/components/ImageViewer";
import * as MediaLibrary from 'expo-media-library';
import Button from "@/components/Button";
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState, useRef } from 'react';
import CircleButton from '@/components/CircleButton';
import IconButton from '@/components/IconButton';
import EmojiPicker from '@/components/EmojiPicker';
import EmojiList from "@/components/EmojiList";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import EmojiSticker from "@/components/EmojiSticker";
import { captureRef } from 'react-native-view-shot';

const PlaceholderImage = require('@/assets/images/background-image.png');

export default function Index() {
  const imageRef = useRef<View>(null);
  const [permissionResponse, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [pickedEmoji, setPickedEmoji] = useState<ImageSourcePropType | undefined>(undefined);

  useEffect(() => {
    if (!permissionResponse?.granted) {
      requestPermission();
    }
  }, []);

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
    setIsModalVisible(true);
  }
   const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onReset = () => {
    setShowAppOptions(false);
  }
   const onSaveImageAsync = async () => {
    try {
      const localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1,
      });

      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri) {
        alert('Saved!');
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
  <GestureHandlerRootView style={styles.container}>
    <View style={styles.container}>
       <View ref={imageRef} collapsable={false}>
          <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
          {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />}
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
<EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
    <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
    </View>
        </GestureHandlerRootView>
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
