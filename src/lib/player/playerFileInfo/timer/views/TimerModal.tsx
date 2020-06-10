import React, {useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import DDFButton from 'lib/view/button/DDFButton';
import DDFModal from 'lib/view/DDFModal';
import colors from 'res/colors';
import TimerPicker from './TimerPicker';

type modalProps = {
  isVisible: boolean;
  onRequestClose: () => void;
  setTimer: (timerInSec: number) => void;
  setFinishCurrTimer: () => void;
};

const TimerModal = (props: modalProps): JSX.Element => {
  const timerInSec = useRef(0);

  return (
    <DDFModal
      style={styles.modal}
      isVisible={props.isVisible}
      onRequestClose={props.onRequestClose}>
      <View style={styles.modalContentContainer}>
        <View style={styles.modalPickerContainer}>
          <TimerPicker
            onChange={(timeInSec) => (timerInSec.current = timeInSec)}
          />
          <DDFButton
            text={'Start Timer'}
            onPress={() => props.setTimer(timerInSec.current)}
            style={styles.modalSetBtn}
          />
        </View>
        <View style={styles.modalActionBtnContainer}>
          <DDFButton
            text={'Cancel'}
            onPress={props.onRequestClose}
            style={styles.modalCancelBtn}
          />
          <DDFButton
            style={styles.modalFinishCurrBtn}
            text={'Finish current audiobook'}
            onPress={props.setFinishCurrTimer}
          />
        </View>
      </View>
    </DDFModal>
  );
};

const styles = StyleSheet.create({
  modal: {
    height: '40%',
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  modalContentContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  modalActionBtnContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  modalPickerContainer: {
    height: '75%',
    width: '100%',
    // height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 2,
    //  borderColor: 'red',
    //borderRadius: 20,
    //paddingHorizontal: 10,
  },
  modalCancelBtn: {
    backgroundColor: colors.red,
    marginTop: 10,
  },
  modalSetBtn: {
    backgroundColor: colors.blue,
    marginTop: 10,
  },
  modalFinishCurrBtn: {
    backgroundColor: colors.primaryLightest,
    marginTop: 15,
  },
});

export default TimerModal;
