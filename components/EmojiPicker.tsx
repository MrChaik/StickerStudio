import { Modal, View, Text, Pressable, StyleSheet } from 'react-native'; //Modal : A temporary overlay screen that pops up on top of the main app UI.It uses a boolean state (e.g., visible={isOpen}) to show or hide itself.
import { PropsWithChildren } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

/**
 * 1. PropsWithChildren :
 * This is a TypeScript helper from React. By wrapping our custom props 
 * object with PropsWithChildren<{ ... }>, it automatically injects a hidden 
 * 'children' prop into our type definition. 
 * 
 * Without this helper, TypeScript would throw an error saying:
 * "Property 'children' does not exist on type 'Props'".
 */
type Props = PropsWithChildren<{
  isVisible: boolean;
  onClose: () => void;
}>;

export default function EmojiPicker({ isVisible, children, onClose }: Props) { 
  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={isVisible}>
        <View style={styles.modalContent}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Choose a sticker</Text>
            <Pressable onPress={onClose}>
              <MaterialIcons name="close" color="#fff" size={22} />
            </Pressable>
          </View>
          {/* PLUG/PLACEHOLDER: This holds the parent's nested UI (like <EmojiList />). 
              EmojiPicker doesn't know what's inside it; it just renders it here. */}
          {children}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    height: '25%',
    width: '100%',
    backgroundColor: '#25292e',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: 'absolute',
    bottom: 0,
  },
  titleContainer: {
    height: '16%',
    backgroundColor: '#464C55',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: '#fff',
    fontSize: 16,
  },
});
