import {
  PanResponder,
  PanResponderGestureState,
  GestureResponderEvent,
} from 'react-native';
import {ANIMATED, HEIGHTS, animatedStartPosition} from './constants';
import animateMove from './animateMove';

const movementValue = (gestureState: PanResponderGestureState) => {
  return HEIGHTS.PARENT_VIEW - gestureState.moveY;
};

const isSwipeUp = (startPoint: number, endPoint: number) => {
  return startPoint - endPoint < 0;
};

const onMoveShouldSetPanResponder = (
  _event: GestureResponderEvent,
  gestureState: PanResponderGestureState,
) => {
  return gestureState.dy >= 10 || gestureState.dy <= -10;
};

function onPanResponderRelease(
  _event: GestureResponderEvent,
  gestureState: PanResponderGestureState,
) {
  const movement = movementValue(gestureState);
  const thirdOf = ANIMATED.FULL_OPEN / 3;

  if (isSwipeUp(gestureState.moveY, gestureState.y0)) {
    const isMovedMoreThenThird = movement > thirdOf;
    if (isMovedMoreThenThird) {
      animateMove(2);
      return;
    }
    return;
  }
  // @ts-ignore
  if (animatedStartPosition._value === 2) {
    const isMovedMoreThenThird = movement < thirdOf;
    if (isMovedMoreThenThird) {
      animateMove(1);
      return;
    }
  }
  //TODO ; HANDLE FROM LEVEL 1 TO 0
  //animateMove(0);
}

const panResponder = PanResponder.create({
  onPanResponderRelease,
  onMoveShouldSetPanResponder,
  onMoveShouldSetPanResponderCapture: onMoveShouldSetPanResponder,
  onStartShouldSetPanResponderCapture: () => false,
  onStartShouldSetPanResponder: () => {
    return false;
  },
});

export {panResponder};
