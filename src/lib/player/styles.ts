import {StyleSheet} from 'react-native';
import colors from 'res/colors';
import {HEIGHTS} from './constants';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',

    left: 0,
    width: '100%',
    height: HEIGHTS.PLAYER_MODAL,

    backgroundColor: colors.primary,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,

    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 10,
  },
  subContainer: {position: 'relative', width: '100%', height: '100%'},
  gestureArea: {
    width: '100%',
    height: HEIGHTS.PLAYER_CONTROL,
  },
  progressBarContainer: {
    width: '100%',
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playControlContainer: {
    width: '100%',
    height: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    paddingHorizontal: 10,
    height: HEIGHTS.PLAYER_FEATURE,
    backgroundColor: colors.primaryLight,
  },
});

export default styles;
