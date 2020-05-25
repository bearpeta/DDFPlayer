import React from 'react';
import {
  Modal,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import colors from 'res/colors';

type modalProps = {
  isVisible: boolean;
  onRequestClose: () => void;
  children: JSX.Element | JSX.Element[];
  style?: ViewStyle;
};
const DDFModal = (props: modalProps): JSX.Element => {
  return (
    <Modal
      transparent={true}
      onRequestClose={props.onRequestClose}
      hardwareAccelerated={true}
      visible={props.isVisible}>
      <TouchableWithoutFeedback onPress={props.onRequestClose}>
        <View style={styles.overlay}>
          <View style={[styles.container, props.style]}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <View style={styles.contentContainer}>{props.children}</View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.70)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '80%',
    height: '80%',
    backgroundColor: colors.primaryLight,
    borderRadius: 10,
    elevation: 10,
    overflow: 'hidden',
  },
  contentContainer: {
    position: 'relative',
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',

    //backgroundColor: colors.primaryLight,
  },
});

export default DDFModal;
