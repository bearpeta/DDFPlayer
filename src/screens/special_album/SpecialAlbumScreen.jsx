import React from 'react';
import {View, StyleSheet} from 'react-native';
import AudiobookProvider from 'lib/audiobooks/provider';
import AlbumList from 'lib/view/AlbumList';

export default class SpecialAlbumScreen extends React.Component {
  state = {
    audiobookList: [],
  };

  componentDidMount() {
    AudiobookProvider.getSpecial()
      .then(audiobooks => {
        this.setState({audiobookList: Object.values(audiobooks)});
      })
      .catch(e => console.log(e));
  }

  _onAlbumPress(album) {
    this.playMusic(album);
  }

  render() {
    return (
      <View style={styles.root}>
        <AlbumList
          list={this.state.audiobookList}
          keyExtractor={item => item.album()}
          onItemPress={albumItem => this._onAlbumPress(albumItem)}
          itemTitleFnc={albumItem => `${albumItem.title()}`}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#262629',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
