import {ImageRequireSource} from 'react-native';

type image = {
  defaultAlbumCover: ImageRequireSource;
  notificationIcon: ImageRequireSource;
};

const images: image = {
  defaultAlbumCover: require('./images/default_cover.jpg'),
  notificationIcon: require('./images/notification_icon.png'),
};

export default images;
