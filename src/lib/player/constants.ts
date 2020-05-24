import {Animated, Dimensions} from 'react-native';

const DEVICE = Dimensions.get('screen');

const withoutTab = DEVICE.height - 175;

const modalHeight = withoutTab * 0.7;
const playerControlHeight = modalHeight * 0.25;
const playerVisibleFeatureHeight = modalHeight * 0.5;
const playerTotalFeatureHeight = modalHeight * 0.75;

const HEIGHTS = {
  DEVICE: DEVICE.height,
  PARENT_VIEW: withoutTab,
  PLAYER_MODAL: modalHeight,
  PLAYER_CONTROL: playerControlHeight,
  PLAYER_FEATURE: playerVisibleFeatureHeight,
};

const ANIMATED = {
  HIDDEN: withoutTab,
  FULL_OPEN: withoutTab - playerTotalFeatureHeight,
  VISIBLE: withoutTab - playerControlHeight,
};

const animatedStartPosition = new Animated.Value(0);

export {ANIMATED, HEIGHTS, animatedStartPosition};
