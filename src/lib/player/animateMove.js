import {Animated} from 'react-native';
import {animatedStartPosition} from 'lib/player/constants';

const animateMove = toValue => {
  Animated.spring(animatedStartPosition, {
    toValue,
    friction: 6,
    useNativeDriver: true,
  }).start(() => animatedStartPosition.setValue(toValue));
};

export default animateMove;
