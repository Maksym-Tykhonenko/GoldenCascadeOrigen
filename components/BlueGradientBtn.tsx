import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface BlueGradientBtnProps {
  text: string; // Explicitly define 'text' as a string type
  onClick: any;
  style?: any;
  className?: string;
}

export function BlueGradientBtn({
  text,
  onClick,
  style,
  className,
}: BlueGradientBtnProps) {
  return (
    <TouchableOpacity onPress={onClick}>
      <LinearGradient
        colors={['#AAF7FF', '#5E7CEC']}
        style={[styles.btn, style]}
        className={className}
        start={{x: 0, y: 0}} // Starts the gradient from the bottom (y: 1.0)
        end={{x: 1, y: 0}} // Ends at the top (y: 0.0) to match 0deg gradient
      >
        <Text style={styles.text}>{text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {borderRadius: 24, justifyContent: 'center'},
  text: {
    textAlign: 'center',
    fontFamily: 'Trade Winds',
    margin: 6,
    fontSize: 16,
  },
});
