import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function LoadingScreen() {
  return (
    <LinearGradient colors={['#43cea2', '#185a9d']} style={styles.gradient}>
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
