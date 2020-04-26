import {Animated, Dimensions} from 'react-native';

const DEVICE = Dimensions.get('screen');

const withoutTab = DEVICE.height - 120;

const modalHeight = withoutTab * 0.5;
const playerControlHeight = modalHeight * 0.3;
const playerFeatureHeight = modalHeight * 0.7;

const HEIGHTS = {
  DEVICE: DEVICE.height,
  PARENTVIEW: withoutTab,
  PLAYERMODAL: modalHeight,
  PLAYERCONTROL: playerControlHeight,
  PLAYERFEATURE: playerFeatureHeight,
};

const ANIMATED = {
  HIDDEN: withoutTab,
  FULL_OPEN: withoutTab - modalHeight,
  VISIBLE: withoutTab - playerControlHeight,
};

const animatedStartPosition = new Animated.Value(0);

export {ANIMATED, HEIGHTS, animatedStartPosition};
