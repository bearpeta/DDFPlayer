class Audiobook {
  _filePath = '';
  _title = '';
  _author = 'Die Drei Fragezeichen';
  _album = '';
  _track = 1;

  constructor(filePath, title, album) {
    this._filePath = filePath;
    this._title = title;
    this._album = album;
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

const createFromFilePath = filePath => {
  const filename = filePath.substr(filePath.lastIndexOf('/') + 1);
  const filenameParts = filename.split('.');
  const album = filenameParts[0];
  const extension = filenameParts[1];

  const parts = album.split(' - ');

  // Every filename should have at least three parts (more are possible with special albums)
  // 1. Album number|"Special"
  // 2. "Die Drei ???"
  // 3. album title
  if (parts.length < 3) {
    console.log(`FILENAME WRONG FORMATTED: ${parts}`);
  }
  var title = parts[parts.length - 1];

  if (!isNaN(parts[0])) {
    const number = parseInt(parts[0], 10);
    //console.log(`${title} is numbered: ${number}`);
    return new NumberedAudiobook(filePath, title, album, number);
  }

  /*console.log(filename);
  console.log(title);
  console.log(extension);
  console.log('SPECIAL AUDIOBOOK NOT HANDLED YET'); */

  return new SpecialAudiobook(filePath, title, album);
};

export {createFromFilePath, NumberedAudiobook};
