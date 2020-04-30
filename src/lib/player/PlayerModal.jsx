import React, {useState, useEffect} from 'react';
import {Animated, View, Text, StyleSheet, SafeAreaView} from 'react-native';
import {ANIMATED, animatedStartPosition} from './constants';
import {panResponder} from './panResponder';
import animateMove from './animateMove';
import PlayerControl from './playerControl/PlayerControl';
import {usePlayerEvents} from 'lib/trackplaymanager/TrackPlayManager';
import {EVENTS} from 'lib/trackplaymanager/events';
import {STATES} from 'lib/trackplaymanager/states';
import PlayerProgress from 'lib/player/playerProgress/PlayerProgress';
import colors from 'res/colors';

const PlayerModal = ({isOpen}) => {
  const [isVisible, setVisibility] = useState(isOpen);

  useEffect(() => {
    console.log(
      'USE_EFFECT: VISIBILITY CHANGES FROM ' + !isVisible + ' TO ' + isVisible,
    );
    console.log(animatedStartPosition);
    if (isVisible) {
      animateMove(1);
      return;
    }

    animateMove(0);
  }, [isVisible]);

  usePlayerEvents([EVENTS.CHANGE_PLAYBACK_STATE], event => {
    //console.log(`PLAYERMODAL: TRACKPLAYER EVENT FIRED!!!! => ${event.type}`);

    if (event.type === EVENTS.CHANGE_PLAYBACK_STATE) {
      setVisibility(
        event.state !== STATES.NONE && event.state !== STATES.STOPPED,
      );
    }
  });

  const interpolation = animatedStartPosition.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [ANIMATED.HIDDEN, ANIMATED.VISIBLE, ANIMATED.FULL_OPEN],
  });

  return (
    <Animated.View
      style={[styles.container, {transform: [{translateY: interpolation}]}]}>
      <View style={styles.subContainer}>
        <View style={styles.gestureArea} {...panResponder.panHandlers}>
          <View style={styles.progressBarContainer}>
            <PlayerProgress />
          </View>
          <View style={styles.playControlContainer}>
            <PlayerControl />
          </View>
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

    backgroundColor: colors.primary,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,

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
  progressBarContainer: {
    width: '100%',
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playControlContainer: {
    width: '100%',
    height: '60%',
    justifyContent: 'center',
    alignItems: 'center',
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
