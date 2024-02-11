import { DateTimeResolver } from 'graphql-scalars';
import {
  GetTrackByIdArgs,
  GetTrackByNameArgs,
  Track,
  TrackTrackByIdArgs,
  UpdateTrackArgs,
} from '../types';
import { TrackService } from '../services';
import { mapToCreateTrackInput } from '../services/mapper';

const rootResolversFactory = (trackService: TrackService) => ({
  Query: {
    tracks: async (): Promise<Track[]> => {
      const tracks: Track[] = await trackService.tracks();
      return tracks;
    },
    trackById: async (_: unknown, { id }: GetTrackByIdArgs): Promise<Track> => {
      const track = await trackService.trackById(id);
      return track;
    },
    trackByName: async (
      _: unknown,
      { input: { name, artistName } }: GetTrackByNameArgs,
    ): Promise<Track> => {
      const track = await trackService.trackByName(name, artistName);
      if (track === null) {
        const [fetchedTrackMetadata] = (
          await trackService.fetchTrackFromMetadataApi(name, artistName)
        ).data;

        if (fetchedTrackMetadata) {
          const createTrackInput = mapToCreateTrackInput(fetchedTrackMetadata);
          return await trackService.saveTrack(createTrackInput);
        } else {
          throw new Error(
            `The track with name ${name} and artist ${artistName} was not found in system, neither in external API.`,
          );
        }
      }
      return track;
    },
  },
  Mutation: {
    updateTrack: async (
      _: unknown,
      { id, track }: UpdateTrackArgs,
    ): Promise<Track> => {
      return await trackService.updateTrack(id, track);
    },
    deleteTrack: async (
      _: unknown,
      { id }: TrackTrackByIdArgs,
    ): Promise<string> => {
      return trackService.deleteTrack(id);
    },
  },
  DateTime: DateTimeResolver,
});

export type RootResolvers = ReturnType<typeof rootResolversFactory>;
export default rootResolversFactory;
