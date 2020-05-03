import React from 'react';
import {View, StyleSheet} from 'react-native';
import AudiobookProvider from 'lib/audiobooks/provider';
import PlayerModal from 'lib/player/PlayerModal';
import AlbumList from 'lib/view/AlbumList';
import TrackPlayManager from 'lib/trackplaymanager/TrackPlayManager';
import {EVENTS} from 'lib/trackplaymanager/events';
import colors from 'res/colors';

export default class NumberedAlbumScreen extends React.Component {
  state = {
    audiobookList: [],
    isPlayerModalOpen: false,
  };

  componentDidMount() {
    AudiobookProvider.getNumbered()
      .then(audiobooks => {
        this.setState({audiobookList: Object.values(audiobooks)});
      })
      .catch(e => console.log(e));

    TrackPlayManager.setup();
    TrackPlayManager.addEventListener(EVENTS.PLAY, event => {
      console.log(event);
    });
  }

  resumeMusic = async () => {
    TrackPlayManager.resume();
  };

  stopMusic = async () => {
    TrackPlayManager.stop();
  };

  pauseMusic = async () => {
    TrackPlayManager.pause();
  };

  _onAlbumPress(album) {
    this.setState({isPlayerModalOpen: true});
    TrackPlayManager.playNew(album);
  }

  render() {
    return (
      <View style={styles.root}>
        <AlbumList
          list={this.state.audiobookList}
          keyExtractor={item => item.audiobookNumber()}
          onItemPress={albumItem => this._onAlbumPress(albumItem)}
          itemTitleFnc={albumItem =>
            `${albumItem.audiobookNumber()} - ${albumItem.title()}`
          }
        />
        <PlayerModal
          isOpen={this.state.isPlayerModalOpen}
          onClosed={() => {
            this.setState({isPlayerModalOpen: false});
            this.stopMusic();
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.primaryLight,
    //alignItems: 'center',
    // justifyContent: 'flex-end',
  },
});
