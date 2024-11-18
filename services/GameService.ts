import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationProp} from '@react-navigation/native';

export const loadPoints = async (): Promise<string> => {
  try {
    const value = await AsyncStorage.getItem('points');
    if (value !== null) {
      return value; // Return saved hero
    } else {
      // If no hero is saved, set and return the default hero
      await AsyncStorage.setItem('points', '0');
      return '0';
    }
  } catch (error) {
    console.log('Error loading hero from storage', error);
    return '0'; // Return default hero on error
  }
};

export const addPoints = async (points: any) => {
  try {
    let value = await AsyncStorage.getItem('points');
    let currentPoints = value ? parseInt(value) : 0;
    currentPoints += parseInt(points);

    await AsyncStorage.setItem('points', currentPoints.toString());
  } catch (error) {
    console.log('Error adding points', error);
  }
};

export const initialIcons4x4 = [
  [
    {
      id: '1',
      iconNum: 1,
      icon: require('../Images/Game/CascadeGameIcon1.png'),
    },
    {
      id: '2',
      iconNum: 2,
      icon: require('../Images/Game/CascadeGameIcon2.png'),
    },
    {
      id: '3',
      iconNum: 3,
      icon: require('../Images/Game/CascadeGameIcon3.png'),
    },
    {
      id: '4',
      iconNum: 4,
      icon: require('../Images/Game/CascadeGameIcon4.png'),
    },
  ],
  [
    {
      id: '5',
      iconNum: 7,
      icon: require('../Images/Game/CascadeGameIcon7.png'),
    },
    {
      id: '6',
      iconNum: 1,
      icon: require('../Images/Game/CascadeGameIcon1.png'),
    },
    {
      id: '7',
      iconNum: 7,
      icon: require('../Images/Game/CascadeGameIcon7.png'),
    },
    {
      id: '8',
      iconNum: 4,
      icon: require('../Images/Game/CascadeGameIcon4.png'),
    },
  ],
  [
    {
      id: '9',
      iconNum: 1,
      icon: require('../Images/Game/CascadeGameIcon1.png'),
    },
    {
      id: '10',
      iconNum: 2,
      icon: require('../Images/Game/CascadeGameIcon2.png'),
    },
    {
      id: '11',
      iconNum: 3,
      icon: require('../Images/Game/CascadeGameIcon3.png'),
    },
    {
      id: '12',
      iconNum: 2,
      icon: require('../Images/Game/CascadeGameIcon2.png'),
    },
  ],
  [
    {
      id: '13',
      iconNum: 3,
      icon: require('../Images/Game/CascadeGameIcon3.png'),
    },
    {
      id: '14',
      iconNum: 4,
      icon: require('../Images/Game/CascadeGameIcon4.png'),
    },
    {
      id: '15',
      iconNum: 3,
      icon: require('../Images/Game/CascadeGameIcon3.png'),
    },
    {
      id: '16',
      iconNum: 7,
      icon: require('../Images/Game/CascadeGameIcon7.png'),
    },
  ],
];

export const initialIcons5x5 = [
  [
    {
      id: '1',
      iconNum: 1,
      icon: require('../Images/Game/CascadeGameIcon1.png'),
    },
    {
      id: '2',
      iconNum: 2,
      icon: require('../Images/Game/CascadeGameIcon2.png'),
    },
    {
      id: '3',
      iconNum: 2,
      icon: require('../Images/Game/CascadeGameIcon2.png'),
    },
    {
      id: '4',
      iconNum: 4,
      icon: require('../Images/Game/CascadeGameIcon4.png'),
    },
    {
      id: '5',
      iconNum: 4,
      icon: require('../Images/Game/CascadeGameIcon4.png'),
    },
  ],
  [
    {
      id: '6',
      iconNum: 7,
      icon: require('../Images/Game/CascadeGameIcon7.png'),
    },
    {
      id: '7',
      iconNum: 7,
      icon: require('../Images/Game/CascadeGameIcon7.png'),
    },
    {
      id: '8',
      iconNum: 4,
      icon: require('../Images/Game/CascadeGameIcon4.png'),
    },
    {
      id: '9',
      iconNum: 1,
      icon: require('../Images/Game/CascadeGameIcon1.png'),
    },
    {
      id: '10',
      iconNum: 4,
      icon: require('../Images/Game/CascadeGameIcon4.png'),
    },
  ],
  [
    {
      id: '11',
      iconNum: 3,
      icon: require('../Images/Game/CascadeGameIcon3.png'),
    },
    {
      id: '12',
      iconNum: 3,
      icon: require('../Images/Game/CascadeGameIcon3.png'),
    },
    {
      id: '13',
      iconNum: 4,
      icon: require('../Images/Game/CascadeGameIcon4.png'),
    },
    {
      id: '14',
      iconNum: 7,
      icon: require('../Images/Game/CascadeGameIcon7.png'),
    },
    {
      id: '15',
      iconNum: 7,
      icon: require('../Images/Game/CascadeGameIcon7.png'),
    },
  ],
  [
    {
      id: '16',
      iconNum: 3,
      icon: require('../Images/Game/CascadeGameIcon3.png'),
    },
    {
      id: '17',
      iconNum: 4,
      icon: require('../Images/Game/CascadeGameIcon4.png'),
    },
    {
      id: '18',
      iconNum: 3,
      icon: require('../Images/Game/CascadeGameIcon3.png'),
    },
    {
      id: '19',
      iconNum: 7,
      icon: require('../Images/Game/CascadeGameIcon7.png'),
    },
    {
      id: '20',
      iconNum: 7,
      icon: require('../Images/Game/CascadeGameIcon7.png'),
    },
  ],
  [
    {
      id: '21',
      iconNum: 1,
      icon: require('../Images/Game/CascadeGameIcon1.png'),
    },
    {
      id: '22',
      iconNum: 1,
      icon: require('../Images/Game/CascadeGameIcon1.png'),
    },
    {
      id: '23',
      iconNum: 2,
      icon: require('../Images/Game/CascadeGameIcon2.png'),
    },
    {
      id: '24',
      iconNum: 3,
      icon: require('../Images/Game/CascadeGameIcon3.png'),
    },
    {
      id: '25',
      iconNum: 2,
      icon: require('../Images/Game/CascadeGameIcon2.png'),
    },
  ],
];

export const initialIcons5x6 = [
  [
    {
      id: '1',
      iconNum: 4,
      icon: require('../Images/Game/CascadeGameIcon4.png'),
    },
    {
      id: '2',
      iconNum: 4,
      icon: require('../Images/Game/CascadeGameIcon4.png'),
    },
    {
      id: '3',
      iconNum: 8,
      icon: require('../Images/Game/CascadeGameIcon8.png'),
    },
    {
      id: '4',
      iconNum: 2,
      icon: require('../Images/Game/CascadeGameIcon2.png'),
    },
    {
      id: '5',
      iconNum: 8,
      icon: require('../Images/Game/CascadeGameIcon8.png'),
    },
  ],
  [
    {
      id: '6',
      iconNum: 7,
      icon: require('../Images/Game/CascadeGameIcon7.png'),
    },
    {
      id: '7',
      iconNum: 7,
      icon: require('../Images/Game/CascadeGameIcon7.png'),
    },
    {
      id: '8',
      iconNum: 9,
      icon: require('../Images/Game/CascadeGameIcon9.png'),
    },
    {
      id: '9',
      iconNum: 3,
      icon: require('../Images/Game/CascadeGameIcon3.png'),
    },
    {
      id: '10',
      iconNum: 9,
      icon: require('../Images/Game/CascadeGameIcon9.png'),
    },
  ],
  [
    {
      id: '11',
      iconNum: 3,
      icon: require('../Images/Game/CascadeGameIcon3.png'),
    },
    {
      id: '12',
      iconNum: 8,
      icon: require('../Images/Game/CascadeGameIcon8.png'),
    },
    {
      id: '13',
      iconNum: 9,
      icon: require('../Images/Game/CascadeGameIcon9.png'),
    },
    {
      id: '14',
      iconNum: 7,
      icon: require('../Images/Game/CascadeGameIcon7.png'),
    },
    {
      id: '15',
      iconNum: 7,
      icon: require('../Images/Game/CascadeGameIcon7.png'),
    },
  ],
  [
    {
      id: '16',
      iconNum: 3,
      icon: require('../Images/Game/CascadeGameIcon3.png'),
    },
    {
      id: '17',
      iconNum: 4,
      icon: require('../Images/Game/CascadeGameIcon4.png'),
    },
    {
      id: '18',
      iconNum: 6,
      icon: require('../Images/Game/CascadeGameIcon6.png'),
    },
    {
      id: '19',
      iconNum: 3,
      icon: require('../Images/Game/CascadeGameIcon3.png'),
    },
    {
      id: '20',
      iconNum: 6,
      icon: require('../Images/Game/CascadeGameIcon6.png'),
    },
  ],
  [
    {
      id: '21',
      iconNum: 1,
      icon: require('../Images/Game/CascadeGameIcon1.png'),
    },
    {
      id: '22',
      iconNum: 5,
      icon: require('../Images/Game/CascadeGameIcon5.png'),
    },
    {
      id: '23',
      iconNum: 3,
      icon: require('../Images/Game/CascadeGameIcon3.png'),
    },
    {
      id: '24',
      iconNum: 5,
      icon: require('../Images/Game/CascadeGameIcon5.png'),
    },
    {
      id: '25',
      iconNum: 5,
      icon: require('../Images/Game/CascadeGameIcon5.png'),
    },
  ],
  [
    {
      id: '26',
      iconNum: 1,
      icon: require('../Images/Game/CascadeGameIcon1.png'),
    },
    {
      id: '27',
      iconNum: 1,
      icon: require('../Images/Game/CascadeGameIcon1.png'),
    },
    {
      id: '28',
      iconNum: 2,
      icon: require('../Images/Game/CascadeGameIcon2.png'),
    },
    {
      id: '29',
      iconNum: 3,
      icon: require('../Images/Game/CascadeGameIcon3.png'),
    },
    {
      id: '30',
      iconNum: 2,
      icon: require('../Images/Game/CascadeGameIcon2.png'),
    },
  ],
];

export const rouleteProps1 = [
  {
    src: require('../Images/Game/RouleteSections/rouleteSection1.png'),
    value: '35',
  },
  {
    src: require('../Images/Game/RouleteSections/rouleteSection2.png'),
    value: '75',
  },
  {
    src: require('../Images/Game/RouleteSections/rouleteSection3.png'),
    value: '100',
  },
  {
    src: require('../Images/Game/RouleteSections/rouleteSection4.png'),
    value: '50',
  },
  {
    src: require('../Images/Game/RouleteSections/rouleteSection5.png'),
    value: '0.50',
  },
  {
    src: require('../Images/Game/RouleteSections/rouleteSection6.png'),
    value: 'LOSE',
  },
  {
    src: require('../Images/Game/RouleteSections/rouleteSection7.png'),
    value: '0',
  },
  {
    src: require('../Images/Game/RouleteSections/rouleteSection8.png'),
    value: '15',
  },
];

export const rouleteProps2 = [
  {
    src: require('../Images/Game/RouleteSections/rouleteSection1.png'),
    value: 'LOSE',
  },
  {
    src: require('../Images/Game/RouleteSections/rouleteSection2.png'),
    value: '75',
  },
  {
    src: require('../Images/Game/RouleteSections/rouleteSection3.png'),
    value: '100',
  },
  {
    src: require('../Images/Game/RouleteSections/rouleteSection4.png'),
    value: 'LOSE',
  },
  {
    src: require('../Images/Game/RouleteSections/rouleteSection5.png'),
    value: '0.50',
  },
  {
    src: require('../Images/Game/RouleteSections/rouleteSection6.png'),
    value: 'LOSE',
  },
  {
    src: require('../Images/Game/RouleteSections/rouleteSection7.png'),
    value: '0',
  },
  {
    src: require('../Images/Game/RouleteSections/rouleteSection8.png'),
    value: '15',
  },
];

export const rouleteProps3 = [
  {
    src: require('../Images/Game/RouleteSections/rouleteSection1.png'),
    value: 'LOSE',
  },
  {
    src: require('../Images/Game/RouleteSections/rouleteSection2.png'),
    value: '75',
  },
  {
    src: require('../Images/Game/RouleteSections/rouleteSection3.png'),
    value: 'LOSE',
  },
  {
    src: require('../Images/Game/RouleteSections/rouleteSection4.png'),
    value: 'LOSE',
  },
  {
    src: require('../Images/Game/RouleteSections/rouleteSection5.png'),
    value: '15',
  },
  {
    src: require('../Images/Game/RouleteSections/rouleteSection6.png'),
    value: 'LOSE',
  },
  {
    src: require('../Images/Game/RouleteSections/rouleteSection7.png'),
    value: '25',
  },
  {
    src: require('../Images/Game/RouleteSections/rouleteSection8.png'),
    value: 'LOSE',
  },
];

export interface NavProps {
  navigation: NavigationProp<any>;
}

export interface Icon {
  id: string;
  iconNum: number;
  icon: any;
}

export interface IconPosition {
  row: number | null;
  col: number | null;
}

export const gameClick = (navigation: any) => {
  // const randomNumber = Math.floor(Math.random() * 6) + 1;
  const randomNumber = 4;
  switch (randomNumber) {
    // case 1:
    //   navigation.navigate('Game4x4');
    //   break;
    // case 2:
    //   navigation.navigate('Game5x5');
    //   break;
    // case 3:
    //   navigation.navigate('Game5x6');
    //   break;
    case 4:
      navigation.navigate('Roulete1');
      break;
    // case 5:
    //   navigation.navigate('Roulete2');
    //   break;
    // case 6:
    //   navigation.navigate('Roulete3');
    //   break;
  }
};
