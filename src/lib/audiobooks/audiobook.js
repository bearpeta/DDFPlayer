class Audiobook {
  _filePath = '';
  _title = ''; // example: 004 - Die Drei ??? - Die Schwarze Katze
  _author = 'Die Drei Fragezeichen';
  _album = ''; // Die Schwarze Katze
  _track = 1;
  _base64Image = '';

  constructor(filePath, album, title) {
    this._filePath = filePath;
    this._title = title;
    this._album = album;
  }

  setImage(base64Image) {
    if (!base64Image.startsWith('data:image')) {
      base64Image = `data:image/jpeg;base64,${base64Image}`;
    }
    this._base64Image = base64Image;
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

  isNumbered() {
    return this.hasOwnProperty('_number');
  }
}

class NumberedAudiobook extends Audiobook {
  _number;

  constructor(filePath, album, title, number) {
    super(filePath, album, title);
    this._number = number;
  }

  audiobookNumber() {
    return this._number;
  }
}

class SpecialAudiobook extends Audiobook {}

export {NumberedAudiobook, SpecialAudiobook};
