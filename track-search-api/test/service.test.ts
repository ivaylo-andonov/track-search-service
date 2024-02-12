import { Logger } from 'ts-log';
import { trackServiceFactory } from '../src/services';
import { prismaMock } from './prismaMock';
import { httpClientFactory } from '../src/utils/httpClient';
import config from '../src/config';
import { tracksListMock } from './mocks';

const logger: Logger = console;
const httpClient = httpClientFactory(logger);
const trackService = trackServiceFactory(prismaMock, httpClient, config);

describe('Tracks integration tests', () => {
  test('should get all tracks from db', async () => {
    prismaMock.track.findMany.mockResolvedValue(tracksListMock);

    await expect(trackService.tracks()).resolves.toEqual(tracksListMock);
  });

  test('should get a track by id from db', async () => {
    const id = tracksListMock[0].id;
    prismaMock.track.findFirst.mockResolvedValue(tracksListMock[0]);

    await expect(trackService.trackById(id)).resolves.toEqual(
      tracksListMock[0],
    );
  });

  test('should throw a proper error if track id is not found', async () => {
    const notFoundId = 'd0420ea1-96af-4683-9b45-2acd600c9fab';
    prismaMock.track.findFirst.mockResolvedValue(null);

    await expect(trackService.trackById(notFoundId)).rejects.toEqual(
      new Error(`The track with id ${notFoundId} was not found`),
    );
  });

  test('should throw a proper error if track id is not a valid UUID', async () => {
    const notFoundId = 'invalid id';
    prismaMock.track.findFirst.mockResolvedValue(null);

    await expect(trackService.trackById(notFoundId)).rejects.toEqual(
      new Error(`The track with id ${notFoundId} is not a valid UUID`),
    );
  });
});
