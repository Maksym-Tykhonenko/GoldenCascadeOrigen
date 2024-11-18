import React from 'react';
import {Text} from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';

interface GradientTextProps {
  colors: string[]; // Array of colors for the gradient
  style?: any; // Additional styles for the text
  children: React.ReactNode; // Text to display
}

const GradientText: React.FC<GradientTextProps> = ({
  colors,
  style,
  children,
}) => {
  return (
    <MaskedView
      maskElement={
        <Text style={[style, {backgroundColor: 'transparent'}]}>
          {children}
        </Text>
      }>
      <LinearGradient colors={colors} start={{x: 0, y: 0}} end={{x: 1, y: 0}}>
        {/* Render invisible text to fill the gradient */}
        <Text style={[style, {opacity: 0}]}>{children}</Text>
      </LinearGradient>
    </MaskedView>
  );
};

export default GradientText;
