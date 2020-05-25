import {PanResponder} from 'react-native';

type simpleOnActionType = () => void;
type onActionType = (releasedPosition: number) => void;

interface touchActions {
  onGrant: onActionType;
  onMove: onActionType;
  onRelease: simpleOnActionType;
  onTerminate: simpleOnActionType;
}

const getTouchPanResponder = ({
  onGrant,
  onMove,
  onRelease,
  onTerminate,
}: touchActions) => {
  // The PanRespond
  return PanResponder.create({
    onPanResponderTerminationRequest: (_evt, _gestureState) => false,
    onStartShouldSetPanResponder: (_evt, _gestureState) => {
      return true;
    },
    onMoveShouldSetPanResponder: (_evt, _gestureState) => {
      //const shouldMove = gestureState.dx >= 10 || gestureState.dx <= -10;
      return false;
    },
    onStartShouldSetPanResponderCapture: (_evt, _gestureState) => true,
    onMoveShouldSetPanResponderCapture: (_evt, _gestureState) => false,
    onPanResponderGrant: (evt, _gestureState) => {
      const releasedPosition = evt.nativeEvent.locationX;
      onGrant(releasedPosition);
    },
    onPanResponderMove: (evt, _gestureState) => {
      // We have to use the moveX variable here because the locationX variable gave false results back while moving.
      const releasedPosition = _gestureState.moveX;
      onMove(releasedPosition);
    },
    onPanResponderRelease: (_evt, _gestureState) => {
      onRelease();
    },
    onPanResponderTerminate: () => {
      onTerminate();
    },
  });
};

export {getTouchPanResponder};
