import React, {useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import EmptyListView from '../../../lib/view/EmptyListView';
import AlbumListItem from './AlbumListItem';

type albumListProps = {
  list: any[];
  keyExtractor: (item: any, index: number) => string;
  onItemPress: (item: any) => void;
  onRefresh: () => Promise<void>;
  itemDescription: (item: any) => JSX.Element;
};

const AlbumList = (props: albumListProps) => {
  const [isRefreshing, setRefreshing] = useState(false);
  return (
    <FlatList
      style={styles.albumList}
      refreshing={isRefreshing}
      onRefresh={() => {
        setRefreshing(true);
        props.onRefresh().finally(() => setRefreshing(false));
      }}
      data={props.list}
      extraData={props.list}
      keyExtractor={props.keyExtractor}
      numColumns={2}
      ListEmptyComponent={
        <EmptyListView infoText="No audiobook albums found" />
      }
      contentContainerStyle={styles.listContentContainer}
      columnWrapperStyle={styles.columnWrapperContainer}
      renderItem={({item, index}) => (
        <AlbumListItem
          imgSource={((): string => {
            let file = item;
            // if it has property '1' it means it's not just one audiofile, it's an object with multiple audiofiles (key, value) used in SpecialAlbumScreen
            if (item.hasOwnProperty('1')) {
              file = item['1'];
            }

            return file.image();
          })()}
          listIndex={index}
          description={props.itemDescription(item)}
          onPress={() => props.onItemPress(item)}
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
