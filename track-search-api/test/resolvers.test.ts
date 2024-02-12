import gql from 'graphql-tag';
import typeDefs from '../src/typeDefs';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { print, graphql } from 'graphql';
import rootResolversFactory from '../src/resolvers';
import { tracksServiceFactoryMock, tracksListMock } from './mocks';

const tracksServiceMock = tracksServiceFactoryMock();
const resolvers = rootResolversFactory(tracksServiceMock);
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

describe('Tracks functional tests', () => {
  test('resolve tracks from track service', async () => {
    tracksServiceMock.tracks.mockResolvedValueOnce(tracksListMock);
    const GetAllTracksQuery = print(gql`
      {
        tracks {
          id
          name
          artistName
          duration
          isrc
          releaseDate
          createdAt
          updatedAt
        }
      }
    `);

    const { data } = await graphql({ schema, source: GetAllTracksQuery });
    expect(data).toMatchObject({
      tracks: tracksListMock.map((track) => {
        return {
          id: track.id,
          name: track.name,
          artistName: track.artistName,
          isrc: track.isrc,
          duration: track.duration,
          releaseDate: track.releaseDate,
          createdAt: track.createdAt,
          updatedAt: track.updatedAt,
        };
      }),
    });
  });
});
