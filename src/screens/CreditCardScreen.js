import React, { useState, useRef } from 'react';
import { View, Text, Animated, PanResponder, Dimensions, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import FingerPrint from '../assets/fingerprint.svg';
import FlightTakeOff from '../assets/flight_takeoff.svg';
import WaterDrop from '../assets/water_drop.svg';
import HealthSafety from '../assets/health_and_safety.svg';
import HistoryEdu from '../assets/history_edu.svg';
import CardMemberShip from '../assets/card_membership.svg';
import Header from '../components/Header';
import CreditCard from '../components/CreditCard';
import { dummyData } from '../utils/dummyData';

const { width } = Dimensions.get('window');

const CreditCardScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cardsPan = useRef(new Animated.ValueXY()).current;

  const cardsPanResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: cardsPan.x }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (event, gestureState) => {
        if (Math.abs(gestureState.dx) > width * 0.25) {
          Animated.timing(cardsPan, {
            toValue: { x: gestureState.dx > 0 ? width : -width, y: 0 },
            duration: 200,
            useNativeDriver: false,
          }).start(() => {
            cardsPan.setValue({ x: 0, y: 0 });
            setCurrentIndex(prevIndex => (prevIndex + 1) % dummyData.length);
          });
        } else {
          Animated.spring(cardsPan, {
            toValue: { x: 0, y: 0 },
            friction: 5,
            useNativeDriver: false,
          }).start();
        }
      },
    }),
  ).current;

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>All your credit cards</Text>
        <Text style={styles.subtitle}>Find all your credit cards here</Text>
      </View>
      <View style={styles.iconContainer}>
        <FingerPrint height={42} width={42} />
        <FlightTakeOff height={30} width={30} />
        <WaterDrop height={30} width={30} />
        <HealthSafety height={30} width={30} />
        <HistoryEdu height={30} width={30} />
        <CardMemberShip height={30} width={30} />
      </View>
      <View style={styles.innerContainer}>
        {dummyData.map((card, index) => (
          <CreditCard
            key={card.id}
            card={card}
            index={index}
            currentIndex={currentIndex}
            cardsPan={cardsPan}
            cardsPanResponder={cardsPanResponder}
            width={width}
          />
        ))}
      </View>
      <View style={styles.addButtonContainer}>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#252525',
  },
  titleContainer: {
    padding: 15,
    backgroundColor: '#000',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  title: {
    fontSize: 26,
    color: '#F5F6F7',
    fontWeight: 'bold',
    fontFamily: 'Helvetica65-Medium',
  },
  subtitle: {
    fontSize: 16,
    color: '#F5F6F7',
    fontFamily: 'Helvetica65-Medium',
    paddingVertical: 25,
  },
  iconContainer: {
    backgroundColor: '#252525',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  addButton: {
    height: 70,
    width: 70,
    borderRadius: 35,
    backgroundColor: 'white',
    margin: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#868A99',
    fontSize: 24,
    fontWeight: '500',
  },
});

export default CreditCardScreen;