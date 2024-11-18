import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  Keyboard,
  SafeAreaView,
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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

interface Props {
  navigation: NavigationProp<any>;
}

export const AddPhoto = ({navigation}: Props) => {
  const [location, setLocation] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [header, setHeader] = useState<string>('');
  const [photo, setPhoto] = useState<string | null>(null);
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
    if (location === '' || date === '' || header === '') {
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
          setPhoto(selectedImage.uri); // Set the photo URI
          const savedImagePath = await saveImage(selectedImage.uri); // Save the image and get the path
          if (savedImagePath) {
            setPhoto(savedImagePath); // Update the photo state with the saved path
            const isSaved = await saveDataToStorage(savedImagePath); // Save the card data with the new path
            if (isSaved) {
              navigation.navigate('TravelGallery');
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
      title: header,
      place: location,
      date: date,
      imgPath: imgPath, // Use the saved image path
    };

    try {
      const jsonValue = await AsyncStorage.getItem('cards');
      const existingCards = jsonValue != null ? JSON.parse(jsonValue) : [];
      const updatedCards = [...existingCards, newCard];
      await AsyncStorage.setItem('cards', JSON.stringify(updatedCards));
      console.log('Card saved successfully');
      return true; // Return true if save is successful
    } catch (error) {
      console.error('Error saving card:', error);
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
          <SafeAreaView>
            <Text style={styles.header}>Add a Photo</Text>
            <Text style={styles.description}>Header</Text>
            <View style={styles.inputContainerPlace}>
              <Image
                source={require('../../Images/inputPlaceIcon.png')}
                style={styles.inputPlaceIcon}
              />
              <Text style={styles.inputLine}>|</Text>
              <TextInput
                style={styles.input}
                placeholder="Header"
                value={header}
                onChangeText={setHeader}
              />
            </View>
            <Text style={styles.description}>Location of the place</Text>
            <View style={styles.inputContainerPlace}>
              <Image
                source={require('../../Images/inputPlaceIcon.png')}
                style={styles.inputPlaceIcon}
              />
              <Text style={styles.inputLine}>|</Text>
              <TextInput
                style={styles.input}
                placeholder="Location"
                value={location}
                onChangeText={setLocation}
              />
            </View>

            <Text style={styles.description}>Date the photo was taken</Text>
            <View style={styles.inputContainerDate}>
              <Image
                source={require('../../Images/inputDateIcon.png')}
                style={styles.inputDateIcon}
              />
              <Text style={styles.inputLine}>|</Text>
              <TextInput
                style={styles.input}
                placeholder="Date"
                value={date}
                onChangeText={setDate}
              />
            </View>
            <View style={styles.btnContainer}>
              <BlueGradientBtn
                text="Choose From Gallery"
                onClick={openGallery}
                style={styles.btn}
              />
            </View>
          </SafeAreaView>
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
    marginTop: hp(12),
    fontWeight: '800',
    fontSize: wp(8),
    color: '#E6E6E6',
    marginBottom: hp(5),
  },
  description: {
    fontSize: wp(3),
    color: '#E6E6E6',
    fontWeight: '800',
    marginLeft: wp(7),
    marginBottom: hp(1.5),
  },
  inputPlaceIcon: {width: wp(6), height: wp(6), marginLeft: wp(4)},
  inputDateIcon: {width: wp(5), height: wp(5), marginLeft: wp(4)},
  inputLine: {fontSize: wp(6), fontWeight: '200'},
  input: {
    flex: 1,
    height: hp(5),
    paddingHorizontal: wp(2),
    marginRight: wp(5),
  },
  inputContainerPlace: {
    alignSelf: 'center',
    width: wp(90),
    height: hp(8),
    backgroundColor: '#F5F5F5',
    borderRadius: 30,
    marginBottom: hp(2.5),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  inputContainerDate: {
    alignSelf: 'center',
    width: wp(90),
    height: hp(7),
    backgroundColor: '#F5F5F5',
    borderRadius: 30,
    marginBottom: hp(2.5),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  btnContainer: {alignSelf: 'center', marginTop: hp(5)},
  btn: {height: hp(6), width: wp(85)},
});
