import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import AlbumListItem from './AlbumListItem';
import EmptyListView from './EmptyListView';

const AlbumList = ({list, keyExtractor, onItemPress, itemTitleFnc}) => {
  return (
    <FlatList
      style={styles.albumList}
      data={list}
      extraData={list}
      keyExtractor={keyExtractor}
      numColumns={2}
      ListEmptyComponent={
        <EmptyListView infoText="No audiobook albums found" />
      }
      contentContainerStyle={styles.listContentContainer}
      columnWrapperStyle={styles.columnWrapperContainer}
      renderItem={({item, index}) => (
        <AlbumListItem
          imgSource={''}
          listIndex={index}
          title={itemTitleFnc(item)}
          onPress={() => onItemPress(item)}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  albumList: {
    flex: 1,
    width: '100%',
  },
  listContentContainer: {
    flexGrow: 1,
  },
  columnWrapperContainer: {
    paddingTop: 5,
    paddingLeft: 5,
    paddingRight: 5,
  },
});

export default AlbumList;
