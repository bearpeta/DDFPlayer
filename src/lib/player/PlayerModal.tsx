import React, {useEffect, useMemo} from 'react';
import {Animated, View} from 'react-native';
import {ANIMATED, animatedStartPosition} from './constants';
import {panResponder} from './panResponder';
import animateMove from './animateMove';
import PlayerControl from './playerControl/PlayerControl';
import PlayerProgress from 'lib/player/playerProgress/PlayerProgress';
import styles from './styles';
import {AudioFile} from 'lib/audiobooks/type';
import PlayerFileInfo from './playerFileInfo/PlayerFileInfo';

type modalProps = {
  isOpen: boolean;
  displayTitle: string;
  file?: AudioFile;
};

const PlayerModal = ({isOpen, displayTitle, file}: modalProps) => {
  useEffect(() => {
    const moveTo: number = isOpen ? 1 : 0;
    animateMove(moveTo);
  }, [isOpen]);

  const interpolation = useMemo(
    () =>
      animatedStartPosition.interpolate({
        inputRange: [0, 1, 2],
        outputRange: [ANIMATED.HIDDEN, ANIMATED.VISIBLE, ANIMATED.FULL_OPEN],
      }),
    [],
  );

  return (
    <Animated.View
      style={[styles.container, {transform: [{translateY: interpolation}]}]}>
      <View style={styles.subContainer} {...panResponder.panHandlers}>
        <View style={styles.gestureArea}>
          <View style={styles.progressBarContainer}>
            <PlayerProgress playingTitle={displayTitle} />
          </View>
          <View style={styles.playControlContainer}>
            <PlayerControl />
          </View>
        </View>
        <View style={styles.contentContainer}>
          <PlayerFileInfo file={file} />
        </View>
      </View>
    </Animated.View>
  );
};

export default PlayerModal;
