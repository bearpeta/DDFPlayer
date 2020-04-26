const convertForTrackPlayer = audiobook => ({
  id: audiobook.title(), // Must be a string, required
  url: `file://${audiobook.filePath()}`, // Load media from storage

  title: audiobook.title(),
  artist: audiobook.author(),
  album: audiobook.album(),
  genre: 'Audiobook',
  //date: '2014-05-20T07:00:00+00:00', // RFC 3339
  //artwork: 'http://example.com/avaritia.png', // Load artwork from the network
});

export {convertForTrackPlayer};
