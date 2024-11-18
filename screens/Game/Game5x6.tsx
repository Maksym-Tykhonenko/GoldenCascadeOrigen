import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
  SafeAreaView,
} from 'react-native';
import {Bonus} from './Bonus';
import {BottomBar} from '../../components/BottomBar';
import {GameTopBar} from '../../components/GameTopBar';
import {
  addPoints,
  Icon,
  IconPosition,
  initialIcons5x6,
  loadPoints,
  NavProps,
} from '../../services/GameService';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ITEM_SIZE = wp(15); // Для адаптивного размера иконок
const ITEM_MARGIN = wp(2); // Для адаптивных отступов между иконками

const Game5x6Screen = ({navigation}: NavProps) => {
  const [icons, setIcons] = useState<Icon[][]>(initialIcons5x6);
  const [selectedIcon, setSelectedIcon] = useState<IconPosition>({
    row: null,
    col: null,
  });
  const scaleValue = useRef(new Animated.Value(1)).current;
  const shakeAnimation = useRef(new Animated.Value(0)).current;
  const [gameOver, setGameOver] = useState(false);
  const [points, setPoints] = useState<string>('');

  const handleIconTap = (row: number, col: number) => {
    if (selectedIcon.row === null && selectedIcon.col === null) {
      setSelectedIcon({row, col});
      Animated.spring(scaleValue, {
        toValue: 1.2,
        friction: 3,
        useNativeDriver: true,
      }).start();
    } else {
      if (isAdjacent(selectedIcon.row, selectedIcon.col, row, col)) {
        swapIcons(selectedIcon.row, selectedIcon.col, row, col);
        setTimeout(checkForMatches, 0);
      } else {
        shakeIcons();
      }
      setSelectedIcon({row: null, col: null});
      Animated.spring(scaleValue, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }).start();
    }
  };

  const isAdjacent = (
    row1: number,
    col1: number,
    row2: number,
    col2: number,
  ) => {
    return (
      (row1 === row2 && Math.abs(col1 - col2) === 1) ||
      (col1 === col2 && Math.abs(row1 - row2) === 1)
    );
  };

  const shakeIcons = () => {
    const shakeAnimationDuration = 200;

    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: shakeAnimationDuration / 4,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: shakeAnimationDuration / 4,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: shakeAnimationDuration / 4,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: shakeAnimationDuration / 4,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const swapIcons = (
    row1: number,
    col1: number,
    row2: number,
    col2: number,
  ) => {
    const newIcons = icons.map(row => [...row]);
    [newIcons[row1][col1], newIcons[row2][col2]] = [
      newIcons[row2][col2],
      newIcons[row1][col1],
    ];
    setIcons(newIcons);
  };

  const checkForMatches = () => {
    let foundMatch = false;
    for (let row = 0; row < icons.length; row++) {
      for (let col = 0; col < icons[row].length - 2; col++) {
        if (
          icons[row][col].iconNum === icons[row][col + 1].iconNum &&
          icons[row][col + 1].iconNum === icons[row][col + 2].iconNum
        ) {
          console.log(
            `Горизонтальное совпадение в строке ${row} с индексами ${col}, ${
              col + 1
            }, ${col + 2}`,
          );
          foundMatch = true;
          break;
        }
      }
      if (foundMatch) {
        break;
      }
    }

    if (!foundMatch) {
      for (let col = 0; col < icons[0].length; col++) {
        for (let row = 0; row < icons.length - 2; row++) {
          if (
            icons[row][col].iconNum === icons[row + 1][col].iconNum &&
            icons[row + 1][col].iconNum === icons[row + 2][col].iconNum
          ) {
            console.log(
              `Вертикальное совпадение в колонке ${col} с индексами ${row}, ${
                row + 1
              }, ${row + 2}`,
            );
            foundMatch = true;
            break;
          }
        }
        if (foundMatch) {
          break;
        }
      }
    }

    if (foundMatch) {
      console.log('Совпадение найдено, игра окончена.');
      addPoints(150);
      setGameOver(true);
    }
  };

  useEffect(() => {
    loadPoints().then(data => setPoints(data ?? '100'));
    checkForMatches();
  }, [icons]);

  return (
    <>
      <View style={styles.container}>
        <SafeAreaView>
          <GameTopBar navigation={navigation} points={points} />
          <Text style={styles.title}>Cascade Game</Text>
          <Text style={styles.subtitle}>Collect more bonuses</Text>
          <View style={styles.grid}>
            {icons.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.row}>
                {row.map((item, colIndex) => {
                  const isSelected =
                    selectedIcon.row === rowIndex &&
                    selectedIcon.col === colIndex;
                  return (
                    <TouchableOpacity
                      key={item.id}
                      style={styles.iconContainer}
                      onPress={() => handleIconTap(rowIndex, colIndex)}>
                      <Animated.View
                        style={{
                          transform: [
                            {scale: isSelected ? scaleValue : 1},
                            {translateX: shakeAnimation},
                          ],
                        }}>
                        <Image source={item.icon} style={styles.icon} />
                      </Animated.View>
                      {isSelected && <View style={styles.selectedOverlay} />}
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))}
          </View>
        </SafeAreaView>
      </View>
      <BottomBar active="game" navigation={navigation} />
      {gameOver && <Bonus navigation={navigation} />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B2034',
    paddingHorizontal: wp(4), // Адаптивный горизонтальный отступ
    alignItems: 'center',
  },
  title: {
    fontSize: wp(8), // Адаптивный размер шрифта для заголовка
    color: '#E6E6E6',
    textAlign: 'center',
    marginTop: hp(3), // Адаптивный отступ сверху
    fontWeight: '800',
  },
  subtitle: {
    fontSize: wp(4), // Адаптивный размер шрифта для подзаголовка
    color: '#E6E6E6',
    textAlign: 'center',
    marginTop: hp(2), // Адаптивный отступ сверху
    marginBottom: hp(3), // Адаптивный отступ снизу
  },
  grid: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  iconContainer: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    margin: ITEM_MARGIN,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1F2439',
    borderRadius: wp(2), // Адаптивный радиус скругления
    borderWidth: wp(0.2), // Адаптивная ширина границы
    borderColor: '#373E5D',
  },
  icon: {
    width: 50,
    height: 50,
  },
  selectedOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: wp(2),
  },
});

export default Game5x6Screen;
