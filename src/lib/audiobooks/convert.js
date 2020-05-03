const convertForTrackPlayer = audiobook => {
  // resolving path from file uri has problems if special chars like '?' aren't encoded properly
  const filePath = audiobook.filePath().replace('???', '%3F%3F%3F');

  return {
    id: audiobook.title(), // Must be a string, required
    url: `file://${filePath}`, // Load media from storage

    title: audiobook.title(),
    artist: audiobook.author(),
    album: audiobook.album(),
    genre: 'Audiobook',
    //date: '2014-05-20T07:00:00+00:00', // RFC 3339
    artwork: audiobook.image(), // Load artwork from the network
  };
};

export {convertForTrackPlayer};
