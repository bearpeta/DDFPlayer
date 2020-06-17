import React, {useState, useEffect, useMemo} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {getCurrentPosition} from 'lib/audiobooks/currentPosition';
import {
  getTimerPosition,
  saveTimerPosition,
} from 'lib/audiobooks/timerPosition';
import {AudioFile} from 'lib/audiobooks/type';
import TrackPlayManager from 'lib/trackplaymanager/TrackPlayManager';
import DDFText from 'lib/view/DDFText';
import colors from 'res/colors';
import PositionInfo from './PositionInfo';
import cancelTimer from './timer/cancelTimer';
import InfoStorage from './timer/notification/InfoStorage';
import startTimer from './timer/startTimer';
import TimerModal from './timer/views/TimerModal';

type infoProps = {
  file?: AudioFile;
};

const PlayerFileInfo = (props: infoProps): JSX.Element => {
  const [showCancelBtn, setShowCancelBtn] = useState(false);
  const [currentPosition, setCurrentPos] = useState(0);
  const [lastTimerPosition, setLastTimerPosition] = useState(0);
  const [modalIsVisible, setModalVisibility] = useState(false);

  useEffect(() => {
    InfoStorage.get('background_timeout_id').then((value) => {
      if (value === null) {
        setShowCancelBtn(false);
        return;
      }

      setShowCancelBtn(true);
    });
  }, []);

  useEffect(() => {
    if (props.file === undefined) {
      return;
    }

    getTimerPosition(props.file.id()).then((pos) => {
      setLastTimerPosition(pos);
    });

    getCurrentPosition(props.file).then((pos) => {
      setCurrentPos(pos);
    });
  }, [props.file]);

  const beginTimer = (timerInSec: number) => {
    if (props.file === undefined) {
      return;
    }
    const fileId = props.file.id();
    TrackPlayManager.getPosition().then((position: number) => {
      saveTimerPosition(fileId, position);
      cancelTimer().finally(() => startTimer(timerInSec));
      setModalVisibility(false);
      setShowCancelBtn(true);
      setLastTimerPosition(position);
    });
  };

  const timerFinishCurrent = () => {
    if (props.file === undefined) {
      return;
    }
    const fileId = props.file.id();
    const duration = props.file.duration();
    TrackPlayManager.getPosition().then((position: number) => {
      const diff = duration - position;
      saveTimerPosition(fileId, position);
      cancelTimer().finally(() => startTimer(diff));
      setModalVisibility(false);
      setShowCancelBtn(true);
      setLastTimerPosition(position);
    });
  };

  const cancelTimerBtn = useMemo((): JSX.Element => {
    if (!showCancelBtn) {
      return <View />;
    }

    return (
      <TouchableOpacity
        style={styles.cancelBtn}
        onPress={() => {
          cancelTimer(true);
          setShowCancelBtn(false);
        }}>
        <DDFText style={styles.timerButtonText}>Cancel Timer</DDFText>
      </TouchableOpacity>
    );
  }, [showCancelBtn]);

  return (
    <View style={styles.content}>
      <View style={styles.positionContainer}>
        <PositionInfo
          pos={currentPosition}
          labelText={'Last saved position'}
          onPress={() => TrackPlayManager.seekTo(currentPosition)}
        />
        <PositionInfo
          pos={lastTimerPosition}
          labelText={'Timer started at'}
          onPress={() => TrackPlayManager.seekTo(lastTimerPosition)}
        />
      </View>
      <View style={styles.timerContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisibility(true)}>
          <DDFText style={styles.timerButtonText}>Set Timer</DDFText>
        </TouchableOpacity>
        {cancelTimerBtn}
        <TimerModal
          isVisible={modalIsVisible}
          onRequestClose={() => {
            setModalVisibility(false);
          }}
          setTimer={beginTimer}
          setFinishCurrTimer={timerFinishCurrent}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    //paddingVertical: 10,
  },
  positionContainer: {
    paddingTop: 10,
    height: '70%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  timerContainer: {
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  button: {
    borderWidth: 2,
    borderColor: colors.red,
    padding: 10,
    backgroundColor: colors.red,
    borderRadius: 10,
    marginBottom: 20,
  },
  timerButtonText: {},
  cancelBtn: {
    borderWidth: 2,
    borderColor: colors.white,
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    marginLeft: 15,
  },
});

export default PlayerFileInfo;
