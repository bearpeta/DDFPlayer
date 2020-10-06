import React, {useCallback} from 'react';
import {StyleSheet, SectionList, View} from 'react-native';
import DDFText from 'lib/view/DDFText';
import colors from 'res/colors';
import HistoryListItem from './HistoryListItem';
import {historySectionData} from './type';

type historyListProps = {
  list: historySectionData;
};

const HistoryList = (props: historyListProps) => {
  const dateBeautifier = useCallback((date: string) => {
    const parts = date.split('-');

    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const day = parseInt(parts[2], 10);

    const monthText = month >= 10 ? month.toString() : `0${month}`;
    const dayText = day >= 10 ? day.toString() : `0${day}`;

    return `${dayText}.${monthText}.${year}`;
  }, []);

  return (
    <SectionList
      style={styles.list}
      sections={props.list}
      stickySectionHeadersEnabled={true}
      ItemSeparatorComponent={() => <View style={styles.listItemSeparator} />}
      keyExtractor={(item) => item.id + item.date}
      renderItem={({item}) => <HistoryListItem item={item} />}
      renderSectionHeader={({section: {title}}) => (
        <View style={styles.sectionHeaderContainer}>
          <DDFText style={styles.sectionHeaderText}>
            {dateBeautifier(title)}
          </DDFText>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: 5,
    paddingRight: 5,
    paddingLeft: 5,
  },
  list: {
    flex: 1,
    width: '100%',
    // paddingLeft: 10,
  },
  listItemSeparator: {height: 5},
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
  itemTimeText: {
    fontSize: 12,
    color: colors.primaryDarkest,
  },
  sectionHeaderContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.primaryDark,
    paddingHorizontal: 10,
    paddingVertical: 10,

    borderRadius: 5,
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HistoryList;
