import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {BlueGradientBtn} from '../../components/BlueGradientBtn';
import {BottomBar} from '../../components/BottomBar';
import {NavigationProp} from '@react-navigation/native';
import {
  Asset,
  ImageLibraryOptions,
  launchImageLibrary,
  MediaType,
} from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
  navigation: NavigationProp<any>;
}

export const AddRestaurants = ({navigation}: Props) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const openGallery = () => {
    if (description === '' || title === '') {
      Alert.alert(
        'Ooops...',
        'Header, location, and date are required before selecting a photo.',
      );
      return;
    }

    const options: ImageLibraryOptions = {
      mediaType: 'photo' as MediaType,
      quality: 1,
    };

    launchImageLibrary(options, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const selectedImage: Asset = response.assets[0];
        if (selectedImage.uri) {
          const savedImagePath = await saveImage(selectedImage.uri); // Save the image and get the path
          if (savedImagePath) {
            const isSaved = await saveDataToStorage(savedImagePath); // Save the card data with the new path
            if (isSaved) {
              navigation.navigate('Home');
            } else {
              Alert.alert('Error', 'Failed to save the card');
            }
          }
        }
      }
    });
  };

  const saveImage = async (uri: string) => {
    const dirPath = `${RNFS.DocumentDirectoryPath}/static`;
    const newPath = `${dirPath}/${Date.now()}.jpg`;

    try {
      // Create directory if it doesn't exist
      await RNFS.mkdir(dirPath);

      // Copy file to new path
      await RNFS.copyFile(uri, newPath);
      console.log('Image saved to:', newPath); // Log the new path for debugging
      return newPath; // Return the new path
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to save image');
      return null; // Return null if there's an error
    }
  };

  const saveDataToStorage = async (imgPath: string) => {
    const newCard = {
      id: Date.now(), // Unique identifier
      title: title,
      description: description,
      imgPath: imgPath, // Use the saved image path
    };

    try {
      const jsonValue = await AsyncStorage.getItem('restaurants');
      const existingCards = jsonValue != null ? JSON.parse(jsonValue) : [];
      const updatedCards = [...existingCards, newCard];
      await AsyncStorage.setItem('restaurants', JSON.stringify(updatedCards));
      console.log('restaurants saved successfully');
      return true; // Return true if save is successful
    } catch (error) {
      console.error('Error saving restaurants:', error);
      return false; // Return false if there was an error
    }
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={[
            styles.container,
            isKeyboardVisible && styles.shiftedContainer,
          ]}>
          <Text style={styles.header}>Add a Photo</Text>
          <Text style={styles.description}>Title</Text>
          <View style={styles.inputContainerPlace}>
            <Image
              source={require('../../Images/inputPlaceIcon.png')}
              style={styles.inputPlaceIcon}
            />
            <Text style={styles.inputLine}>|</Text>
            <TextInput
              style={styles.input}
              placeholder="Title"
              value={title}
              onChangeText={setTitle}
            />
          </View>

          <Text style={styles.description}>Description</Text>
          <View style={styles.inputContainerDate}>
            <Image
              source={require('../../Images/inputDateIcon.png')}
              style={styles.inputDateIcon}
            />
            <Text style={styles.inputLine}>|</Text>
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
            />
          </View>
          <View style={styles.btnContainer}>
            <BlueGradientBtn
              text="Choose From Gallery"
              onClick={openGallery}
              style={styles.btn}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
      <BottomBar active="gallery" navigation={navigation} />
    </>
  );
};

const styles = StyleSheet.create({
  shiftedContainer: {marginTop: -120},
  container: {
    width: '100%',
    height: '1000%',
    backgroundColor: '#1B2034',
  },
  header: {
    textAlign: 'center',
    marginTop: '30%',
    fontWeight: '800',
    fontSize: 32,
    color: '#E6E6E6',
    marginBottom: 42,
  },
  description: {
    fontSize: 12,
    color: '#E6E6E6',
    fontWeight: '800',
    marginLeft: 30,
    marginBottom: 12,
  },
  inputPlaceIcon: {width: 24, height: 24, marginLeft: 18},
  inputDateIcon: {width: 18, height: 18, marginLeft: 18},
  inputLine: {fontSize: 24, fontWeight: '200'},
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    marginRight: 20,
  },
  inputContainerPlace: {
    marginHorizontal: 'auto',
    width: 340,
    height: 64,
    backgroundColor: '#F5F5F5',
    borderRadius: 30,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  inputContainerDate: {
    marginHorizontal: 'auto',
    width: 340,
    height: 54,
    backgroundColor: '#F5F5F5',
    borderRadius: 30,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    fontSize: 18,
  },
  status: {
    padding: 10,
    textAlign: 'center',
  },
  btnContainer: {marginHorizontal: 28, marginTop: 100},
  btn: {height: 50},
});
