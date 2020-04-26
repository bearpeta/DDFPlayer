import {PanResponder} from 'react-native';
import {ANIMATED, HEIGHTS} from './constants';
import animateMove from './animateMove';

const movementValue = gestureState => {
  return HEIGHTS.PARENTVIEW - gestureState.moveY;
};

const isSwipeUp = (startPoint, endPoint) => {
  return startPoint - endPoint < 0;
};

const onMoveShouldSetPanResponder = (_, gestureState) => {
  return gestureState.dy >= 10 || gestureState.dy <= -10;
};

function onPanResponderMove(_, gestureState) {
  const toValue = Math.min(0, movementValue(gestureState));
  console.log(`gestureState: moveY: ${gestureState.moveY}`);

  //animateMove(toValue);
}

function onPanResponderRelease(_, gestureState) {
  const movement = movementValue(gestureState);
  const thirdOf = ANIMATED.FULL_OPEN / 3;
  /*
  console.log('MOVEMENT VALUE: ' + movement);
  console.log('THIRD HIDDEN: ' + thirdOf);
  console.log(gestureState); */

  if (isSwipeUp(gestureState.moveY, gestureState.y0)) {
    const isMovedMoreThenThird = movement > thirdOf;
    if (isMovedMoreThenThird) {
      animateMove(2);
      return;
    }
    return;
  }
  /*
  console.log('DOWN');
  console.log(gestureState.y0);
  console.log(ANIMATED.VISIBLE);
  console.log(gestureState.y0 < ANIMATED.VISIBLE); */

  // If the y-start point is smaller than animated visible point then that means the modal is in full mode
  if (gestureState.y0 < ANIMATED.VISIBLE) {
    const isMovedMoreThenThird = movement < thirdOf;
    if (isMovedMoreThenThird) {
      animateMove(1);
      return;
    }
  }
  //TODO ; HANDLE FROM LEVEL 1 TO 0
  // animateMove(toValue);
}

const panResponder = PanResponder.create({
  //onPanResponderMove,
  onPanResponderRelease,
  onMoveShouldSetPanResponder,
  onStartShouldSetPanResponderCapture: onMoveShouldSetPanResponder,
});

export {panResponder};
