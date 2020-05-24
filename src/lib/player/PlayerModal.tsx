import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {Animated, View, SafeAreaView} from 'react-native';
import {ANIMATED, animatedStartPosition} from './constants';
import {panResponder} from './panResponder';
import animateMove from './animateMove';
import PlayerControl from './playerControl/PlayerControl';
import TrackPlayManager, {
  usePlayerEvents,
} from 'lib/trackplaymanager/TrackPlayManager';
import {EVENTS} from 'lib/trackplaymanager/events';
import {STATES} from 'lib/trackplaymanager/states';
import PlayerProgress from 'lib/player/playerProgress/PlayerProgress';
import styles from './styles';
import {AudioFile} from 'lib/audiobooks/type';
import {convertFromTrackPlayer} from 'lib/audiobooks/convert';
import PlayerFileInfo from './playerFileInfo/PlayerFileInfo';

type modalProps = {
  isOpen: boolean;
  displayTitle: string;
  file?: AudioFile;
};

const PlayerModal = ({isOpen, displayTitle, file}: modalProps) => {
  const [isVisible, setVisibility] = useState<boolean>(isOpen);
  const [playingTitle, setPlayingTitle] = useState(displayTitle);
  const [playingFile, setPlayingFile] = useState<AudioFile | undefined>(file);

  useEffect(() => setPlayingTitle(displayTitle), [displayTitle]);

  useEffect(() => setVisibility(isOpen), [isOpen]);

  useEffect(() => {
    const moveTo: number = isVisible ? 1 : 0;
    animateMove(moveTo);
  }, [isVisible]);

  const setPlayingFileFromTrackPlayer = useCallback(async (trackId: string) => {
    const track = await TrackPlayManager.getTrack(trackId);
    if (track === null) return;
    setPlayingFile(await convertFromTrackPlayer(track));
  }, []);

  usePlayerEvents(
    [EVENTS.CHANGE_PLAYBACK_STATE, EVENTS.TRACK_CHANGED],
    (event: any) => {
      if (event.type === EVENTS.TRACK_CHANGED) {
        console.log(event);
        if (event.nextTrack === null) return;
        setPlayingFileFromTrackPlayer(event.nextTrack);
        return;
      }

      if (event.type === EVENTS.CHANGE_PLAYBACK_STATE) {
        //if (event.state === STATES.NONE) console.log('NONE: ');
        //if (event.state === STATES.STOPPED) console.log('STOP: ');
        setVisibility(
          event.state !== STATES.NONE && event.state !== STATES.STOPPED,
        );
      }
    },
  );

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
      <View style={styles.subContainer}>
        <View style={styles.gestureArea} {...panResponder.panHandlers}>
          <View style={styles.progressBarContainer}>
            <PlayerProgress playingTitle={playingTitle} />
          </View>
          <View style={styles.playControlContainer}>
            <PlayerControl />
          </View>
        </View>
        <SafeAreaView style={styles.contentContainer}>
          <PlayerFileInfo file={playingFile} />
        </SafeAreaView>
      </View>
    </Animated.View>
  );
};

export default PlayerModal;
