import React, {useEffect, useMemo} from 'react';
import {Animated, View} from 'react-native';
import {AudioFile} from 'lib/audiobooks/type';
import PlayerProgress from 'lib/player/playerProgress/PlayerProgress';
import animateMove from './animateMove';
import {ANIMATED, animatedStartPosition} from './constants';
import {panResponder} from './panResponder';
import PlayerControl from './playerControl/PlayerControl';
import PlayerFileInfo from './playerFileInfo/PlayerFileInfo';
import styles from './styles';

type PlayInfo = {
  displayTitle: string;
  lastSavedPosition: number;
  file?: AudioFile;
};

type modalProps = {
  isOpen: boolean;
  info: PlayInfo;
};

const PlayerModal = ({isOpen, info}: modalProps) => {
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
            <PlayerProgress
              playingTitle={info.displayTitle}
              lastSavedPosition={info.lastSavedPosition}
              duration={info.file ? info.file.duration() : 0}
            />
          </View>
          <View style={styles.playControlContainer}>
            <PlayerControl />
          </View>
        </View>
        <View style={styles.contentContainer}>
          <PlayerFileInfo file={info.file} />
        </View>
      </View>
    </Animated.View>
  );
};

export default PlayerModal;
