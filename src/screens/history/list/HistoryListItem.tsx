import React, {useMemo, useCallback} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import AudiobookProvider from 'lib/audiobooks/provider';
import {AudioFile} from 'lib/audiobooks/type';
import {HistoryEntry} from 'lib/history/type';
import TrackPlayManager from 'lib/trackplaymanager/TrackPlayManager';
import DDFText from 'lib/view/DDFText';
import DDFImage from 'lib/view/image/DDFImage';
import colors from 'res/colors';

type listItemType = {
  item: HistoryEntry;
};

const HistoryListItem = (props: listItemType) => {
  const item = props.item;
  const timeBeautifier = useCallback((date: string) => {
    const timePart = date.split(' ')[1];
    const parts = timePart.split(':');

    const hour = parseInt(parts[0], 10);
    const minute = parseInt(parts[1], 10);

    const hourText = hour >= 10 ? hour.toString() : `0${hour}`;
    const minuteText = minute >= 10 ? minute.toString() : `0${minute}`;

    return `${hourText}:${minuteText}`;
  }, []);

  const file: AudioFile | null = useMemo(
    () => AudiobookProvider.getById(item.id),
    [item.id],
  );

  let content = (
    <DDFText>
      {item.id}: {item.date}
    </DDFText>
  );
  if (file !== null) {
    content = (
      <TouchableOpacity
        style={styles.subContainer}
        onPress={() => TrackPlayManager.playNew([file])}>
        <View style={styles.imageContainer}>
          <DDFImage source={file.image()} resizeMode="contain" />
        </View>
        <View style={styles.textContainer}>
          <DDFText>{file.title()}</DDFText>
          <DDFText style={styles.itemTimeText}>{`Added at: ${timeBeautifier(
            item.date,
          )}`}</DDFText>
        </View>
      </TouchableOpacity>
    );
  }
  return <View style={styles.listItem}>{content}</View>;
};

const styles = StyleSheet.create({
  listItem: {
    height: 90,
    borderWidth: 2,
    borderColor: colors.white,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: colors.primaryLightest,
    marginLeft: 5,
    marginRight: 10,
    elevation: 10,
  },
  subContainer: {
    height: '100%',
    flexDirection: 'row',
    width: '100%',
    //borderWidth: 2,
    //borderColor: colors.blue,
  },
  textContainer: {
    height: '100%',
    width: '70%',
    justifyContent: 'center',
  },
  itemTimeText: {
    fontSize: 12,
    color: colors.primaryDarkest,
  },
  imageContainer: {
    height: '100%',
    width: '30%',
    //borderWidth: 2,
    //borderColor: colors.red,
  },
});

export default HistoryListItem;
