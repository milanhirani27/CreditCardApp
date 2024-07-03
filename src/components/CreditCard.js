import React from 'react';
import { View, Text, StyleSheet, Animated, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur';
import Chip from '../assets/chip1.svg';
import ContactLess from '../assets/contactless1.svg';
import VisaSymbol from '../assets/Visa_symbols1.svg';
import { dummyData, colors } from '../utils/dummyData';

const CreditCard = ({ card, index, currentIndex, cardsPan,cardsPanResponder, width }) => {
  const cardIndex = (currentIndex + index) % dummyData.length;
  const isTopCard = index === dummyData.length - 1;
  const panHandlers = isTopCard ? cardsPanResponder.panHandlers : {};
  const animatedStyles = isTopCard
    ? {
        transform: [
          {translateX: cardsPan.x},
          {
            rotate: cardsPan.x.interpolate({
              inputRange: [-width / 2, width / 2],
              outputRange: ['-10deg', '10deg'],
              extrapolate: 'clamp',
            }),
          },
        ],
        zIndex: 3,
      }
    : {
        zIndex: index,
        top: index * 25,
        opacity: 1,
        transform: [{scale: 1}],
      };

  return (
    <Animated.View
      key={card.id}
      {...panHandlers}
      style={[styles.card, animatedStyles]}
    >
      <LinearGradient
        colors={colors[cardIndex % colors.length]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.gradient}
      >
        <Text style={styles.bankName}>{card.bank}</Text>
        <View style={styles.chipContactlessContainer}>
          <Chip height={42} width={42} />
          <ContactLess height={42} width={42} />
        </View>
        <Text style={styles.cardNumber}>{card.number}</Text>
        {Platform.OS === 'android' ? (
          <View
            style={styles.cardInfoContainer}
            blurType="materialDark"
            blurAmount={10}
          >
            <View>
              <Text style={styles.cardInfoLabel}>Card Holder name</Text>
              <Text style={styles.cardInfoValue}>{card.name}</Text>
            </View>
            <View>
              <Text style={styles.cardInfoLabel}>Expiry date</Text>
              <Text style={styles.cardInfoValue}>{card.expiry}</Text>
            </View>
            <VisaSymbol />
          </View>
        ) : (
          <BlurView
            style={styles.cardInfoContainer}
            blurType="materialDark"
            blurAmount={10}
          >
            <View>
              <Text style={styles.cardInfoLabel}>Card Holder name</Text>
              <Text style={styles.cardInfoValue}>{card.name}</Text>
            </View>
            <View>
              <Text style={styles.cardInfoLabel}>Expiry date</Text>
              <Text style={styles.cardInfoValue}>{card.expiry}</Text>
            </View>
            <VisaSymbol />
          </BlurView>
        )}
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    aspectRatio: 1.6,
    borderRadius: 16,
    justifyContent: 'space-between',
    position: 'absolute',
    width: '90%',
  },
  gradient: {
    flex: 1,
    borderRadius: 16,
    justifyContent: 'space-between',
  },
  bankName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'SpaceGrotesk-Medium',
    paddingHorizontal: 15,
    paddingTop: 18,
  },
  chipContactlessContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  cardNumber: {
    color: '#fff',
    fontSize: 23,
    letterSpacing: 1,
    paddingHorizontal: 15,
    fontWeight: 'bold',
    fontFamily: 'SpaceGrotesk-Medium',
  },
  cardInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  cardInfoLabel: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'SpaceGrotesk-Medium',
    paddingVertical: 5,
  },
  cardInfoValue: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'SpaceGrotesk-Medium',
    fontWeight: 'bold',
  },
});

export default CreditCard;
