import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useLayoutEffect,
} from 'react';
import {Animated, View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {ANIMATED, animatedStartPosition} from './constants';
import {panResponder} from './panResponder';
import animateMove from 'lib/player/animateMove';
import PlayerControl from 'lib/player/playerControl/PlayerControl';

const PlayerModal = ({isOpen, onClosed}) => {
  useEffect(() => {
    console.log(
      'USE_EFFECT: VISIBILITY CHANGES FROM ' + !isOpen + ' TO ' + isOpen,
    );
    console.log(animatedStartPosition);
    if (isOpen) {
      animateMove(1);
      return;
    }

    animateMove(0);
  }, [isOpen]);

  const interpolation = animatedStartPosition.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [ANIMATED.HIDDEN, ANIMATED.VISIBLE, ANIMATED.FULL_OPEN],
  });

  return (
    <Animated.View
      style={[styles.container, {transform: [{translateY: interpolation}]}]}>
      <View style={styles.subContainer}>
        <View style={styles.gestureArea} {...panResponder.panHandlers}>
          <PlayerControl />
        </View>
        <SafeAreaView style={styles.contentContainer}>
          <View style={styles.content}>
            <Text style={styles.text}>Your awesome content</Text>
          </View>
        </SafeAreaView>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',

    left: 0,
    width: '100%',
    height: '50%',

    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1,
    borderColor: 'red',

    backgroundColor: 'orange',

    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  subContainer: {position: 'relative', width: '100%', height: '100%'},
  gestureArea: {
    width: '100%',
    height: '30%',
  },
  contentContainer: {
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: 'green',
    height: '70%',
    backgroundColor: 'yellow',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
});

export default PlayerModal;
