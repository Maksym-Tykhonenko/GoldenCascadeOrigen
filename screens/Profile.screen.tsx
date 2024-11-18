import React, {useState, useEffect} from 'react';
import {
  Alert,
  Image,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BottomBar} from '../components/BottomBar';
import {NavigationProp} from '@react-navigation/native';
import {BlueGradientBtn} from '../components/BlueGradientBtn';
import RNFS from 'react-native-fs';
import {
  Asset,
  ImageLibraryOptions,
  launchImageLibrary,
  MediaType,
} from 'react-native-image-picker';
import {ScrollView} from 'react-native-gesture-handler';

interface Props {
  navigation: NavigationProp<any>;
}

export const ProfileScreen = ({navigation}: Props) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [imgPath, setImgPath] = useState<string>('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    loadUserData();
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

  const loadUserData = async () => {
    try {
      const savedName = await AsyncStorage.getItem('name');
      const savedEmail = await AsyncStorage.getItem('email');
      const savedDate = await AsyncStorage.getItem('date');
      const sevedImgPath = await AsyncStorage.getItem('imgPath');
      if (savedName) {
        setName(savedName);
      }
      if (savedEmail) {
        setEmail(savedEmail);
      }
      if (savedDate) {
        setDate(savedDate);
      }
      if (sevedImgPath) {
        setImgPath(sevedImgPath);
      }
    } catch (error) {
      console.log('Error loading user data:', error);
    }
  };

  const saveUserData = async () => {
    try {
      await AsyncStorage.setItem('name', name);
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('date', date);
      await AsyncStorage.setItem('accountImage', imgPath);
    } catch (error) {
      console.log('Error saving user data:', error);
    }
  };

  const deleteUserData = async () => {
    try {
      await AsyncStorage.removeItem('name');
      await AsyncStorage.removeItem('email');
      await AsyncStorage.removeItem('date');
      await AsyncStorage.removeItem('accountImage');
      setName('');
      setEmail('');
      setDate('');
      setImgPath('');
      Alert.alert(
        'Account Deleted',
        'Your account data has been successfully deleted.',
      );
    } catch (error) {
      console.log('Error deleting user data:', error);
    }
  };

  const handleNameChange = (text: string) => {
    setName(text);
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  const handleDateChange = (text: string) => {
    setDate(text);
  };

  const openGallery = () => {
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
          const savedImagePath = await saveImage(selectedImage.uri); // Save the image to local storage
          if (savedImagePath) {
            setImgPath(savedImagePath); // Update `imgPath` with the saved path
            await AsyncStorage.setItem('imgPath', savedImagePath); // Save `imgPath` in AsyncStorage
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

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={[
              styles.container,
              isKeyboardVisible && styles.shiftedContainer,
            ]}>
            <Text style={styles.title}>Account</Text>
            <View style={styles.imgContainer}>
              <TouchableOpacity onPress={openGallery}>
                <Image
                  style={styles.img}
                  source={
                    imgPath
                      ? {uri: imgPath}
                      : require('../Images/AccountImage.png')
                  }
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.description}>Your Name</Text>
            <View style={styles.inputContainer}>
              <Image
                source={require('../Images/NameIcon.png')}
                style={styles.inputIcon}
              />
              <Text style={styles.inputLine}>|</Text>
              <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={handleNameChange}
              />
            </View>
            <Text style={styles.description}>Your Email</Text>
            <View style={styles.inputContainer}>
              <Image
                source={require('../Images/EmailIcon.png')}
                style={styles.inputIcon}
              />
              <Text style={styles.inputLine}>|</Text>
              <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={handleEmailChange}
              />
            </View>
            <Text style={styles.description}>Your Date of Birth</Text>
            <View style={styles.inputContainer}>
              <Image
                source={require('../Images/inputDateIcon.png')}
                style={styles.inputIcon}
              />
              <Text style={styles.inputLine}>|</Text>
              <TextInput
                style={styles.input}
                placeholder="DD/MM/YY"
                value={date}
                onChangeText={handleDateChange}
              />
            </View>
            <BlueGradientBtn
              text="Change"
              onClick={saveUserData}
              style={styles.btn}
            />
            <View style={styles.btnDeleteAccContainer}>
              <Pressable onPress={() => deleteUserData()}>
                <Text style={styles.btnDeleteAcc}>Delete Account?</Text>
              </Pressable>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
      <BottomBar active="profile" navigation={navigation} />
    </>
  );
};

const styles = StyleSheet.create({
  shiftedContainer: {marginTop: -140},
  btnDeleteAccContainer: {alignItems: 'center', marginTop: 10},
  btnDeleteAcc: {fontSize: 14, color: '#F5F5F5'},
  btn: {marginHorizontal: 'auto', width: 340, height: 50, marginTop: 10},
  imgContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 32,
  },
  container: {
    backgroundColor: '#1B2034',
    width: '100%',
    height: '1000%',
    marginBottom: '20%',
  },
  img: {width: 150, height: 150, borderRadius: 100},
  title: {
    textAlign: 'center',
    marginTop: 89,
    fontSize: 32,
    fontWeight: '800',
    color: '#E6E6E6',
  },
  inputContainer: {
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
  inputLine: {fontSize: 24, fontWeight: '200', marginBottom: 5, marginLeft: 5},
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    marginRight: 20,
  },
  inputIcon: {width: 18, height: 18, marginLeft: 18},
  description: {
    fontSize: 12,
    color: '#E6E6E6',
    marginLeft: 30,
    marginBottom: 12,
  },
});
