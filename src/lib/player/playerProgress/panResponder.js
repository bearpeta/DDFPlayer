import {PanResponder} from 'react-native';

const getTouchPanResponder = ({onGrant, onMove, onRelease, onTerminate}) => {
  // The PanRespond
  return PanResponder.create({
    onPanResponderTerminationRequest: (evt, gestureState) => false,
    onStartShouldSetPanResponder: (evt, _gestureState) => {
      console.warn('PLAYERPROGESS: onStartShouldSetPanResponder');
      return true;
    },
    onMoveShouldSetPanResponder: (_evt, _gestureState) => {
      console.warn('PLAYERPROGESS: onMoveShouldSetPanResponder');
      return true;
    },
    //onMoveShouldSetPanResponderCapture: (_evt, _gestureState) => false,
    onPanResponderGrant: (evt, _gestureState) => {
      const releasedPosition = evt.nativeEvent.locationX;
      /*console.log(
        `getTouchPanResponder: ONGRANT: ${releasedPosition} / ${
          _gestureState.moveX
        }`
      ); */
      onGrant(releasedPosition);
    },
    onPanResponderMove: (evt, _gestureState) => {
      console.warn('PLAYERPROGESS: onMoveShouldSetPanResponder: ON MOVE');

      // We have to use the moveX variable here because the locationX variable gave false results back while moving.
      const releasedPosition = _gestureState.moveX;
      //console.log(`getTouchPanResponder: ONMOVE: ${releasedPosition}`);
      onMove(releasedPosition);
    },
    onPanResponderRelease: (_evt, _gestureState) => {
      onRelease();
    },
    onPanResponderTerminate: () => {
      console.log('ONTERMINATE');
      onTerminate();
    },
  });
};

export {getTouchPanResponder};
