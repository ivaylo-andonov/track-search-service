import { Track } from '../src/types';

export const tracksListMock: Track[] = [
  {
    id: '6fbe024f-2316-4265-aa6e-8d65a837e308',
    createdAt: new Date('2023-03-15T08:17:37.670Z'),
    updatedAt: new Date('2024-02-11T12:35:08.377Z'),
    name: "Take The 'A' Train",
    artistName: 'Franklin Weimann',
    duration: 778390,
    releaseDate: new Date('2024-02-12T17:49:08.626Z'),
    isrc: 'PYSB3OIVVWT3',
  },
  {
    id: 'd0420ea1-96af-4683-9b45-2acd600c9fab',
    createdAt: new Date('2023-11-01T13:54:41.638Z'),
    updatedAt: new Date('2024-02-11T11:53:37.521Z'),
    name: 'A Thousand Miles',
    artistName: 'Julie King',
    duration: 908596,
    releaseDate: new Date('2024-02-12T00:54:34.283Z'),
    isrc: 'AWA44I03OX7W',
  },
  {
    id: '44790999-2f94-4b31-b86f-b7680c80a28c',
    createdAt: new Date('2024-02-01T01:32:27.434Z'),
    updatedAt: new Date('2024-02-11T08:31:25.327Z'),
    name: 'Pony Time',
    artistName: 'Dave King',
    duration: 892136,
    releaseDate: new Date('2024-02-12T17:58:42.896Z'),
    isrc: 'DEJ5NXDCKRMQ',
  },
];

export const tracksServiceFactoryMock = (): jest.Mocked<any> => ({
  tracks: jest.fn(),
});
