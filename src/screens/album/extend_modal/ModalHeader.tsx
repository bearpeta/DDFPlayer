import React from 'react';
import {
  View,
  ImageBackground,
  StyleSheet,
  ImageSourcePropType,
  TouchableOpacity,
} from 'react-native';
import colors from 'res/colors';
import DDFText from 'lib/view/DDFText';

type headerProps = {
  imgSource: ImageSourcePropType;
  onPlayAll: () => void;
};
const ModalHeader = (props: headerProps): JSX.Element => {
  return (
    <View style={styles.imageContainer}>
      <ImageBackground
        style={styles.albumImage}
        source={props.imgSource}
        resizeMode={'cover'}>
        <TouchableOpacity onPress={props.onPlayAll} style={styles.playAllBtn}>
          <DDFText style={styles.btnText}>{'Play all'}</DDFText>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: '30%',
  },
  albumImage: {
    flex: 1,
    alignSelf: 'stretch',
    width: undefined,
    height: undefined,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingVertical: 10,
  },
  playAllBtn: {
    width: 100,
    height: 40,
    backgroundColor: colors.red,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontWeight: '400',
    //color: 'white',
  },
});

export default ModalHeader;
