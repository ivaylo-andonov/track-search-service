export type MetadataApiTrackResponse = {
  data: MetadataApiTrack[];
};

export type MetadataApiTrack = {
  name: string;
  isrc: string;
  duration_ms: number;
  release_date: string;
  artists: [
    {
      name: string;
    },
  ];
  album: {
    release_date: string;
  };
};
