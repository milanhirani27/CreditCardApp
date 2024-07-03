import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import LightBulb from '../assets/lightbulb.svg';

const Header = () => {
  return (
    <View style={styles.header}>
      <LinearGradient
        colors={['#FAFF00', '#FB5CD8']}
        locations={[0, 1]}
        start={{x: 1, y: 0}}
        end={{x: 0, y: 1}}
        style={styles.headerGradient}
      />
      <View style={styles.tipsContainer}>
        <LightBulb height={20} width={20} />
        <Text style={styles.tipsText}>Tips</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  headerGradient: {
    height: 55,
    width: 55,
    borderRadius: 27,
  },
  tipsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#252525',
    paddingHorizontal: 10,
    height: 36,
    borderRadius: 5,
  },
  tipsText: {
    color: '#fff',
    fontSize: 16,
    paddingLeft: 5,
    fontFamily: 'Roboto-Regular',
  },
});

export default Header;
