class Audiobook {
  _filePath = '';
  _title = '';
  _author = 'Die Drei Fragezeichen';
  _album = '';
  _track = 1;
  _base64Image = '';

  constructor(filePath, title, album) {
    this._filePath = filePath;
    this._title = title;
    this._album = album;
  }

  setImage(base64Image) {
    this._base64Image = `data:image/jpeg;base64,${base64Image}`;
  }

  image() {
    return this._base64Image;
  }

  setTrackNumber(number) {
    this._track = number;
  }

  filePath() {
    return this._filePath;
  }

  title() {
    return this._title;
  }

  album() {
    return this._album;
  }

  author() {
    return this._author;
  }

  trackNumber() {
    return this._track;
  }
}

class NumberedAudiobook extends Audiobook {
  _number;

  constructor(filePath, title, album, number) {
    super(filePath, title, album);
    this._number = number;
  }

  audiobookNumber() {
    return this._number;
  }
}

class SpecialAudiobook extends Audiobook {}

export {NumberedAudiobook, SpecialAudiobook};
