import { CreateTrackInput } from '../types';
import { MetadataApiTrack } from './types';

export const mapToCreateTrackInput = (
  data: MetadataApiTrack,
): CreateTrackInput => ({
  name: data.name,
  isrc: data.isrc,
  duration: data.duration_ms,
  releaseDate: new Date(data.album.release_date),
  artistName: data.artists.length ? data.artists[0].name : '',
});
