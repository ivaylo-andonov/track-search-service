import { PrismaClient, Track } from '@prisma/client';
import { Config } from '../config';
import { HttpClient } from '../utils/httpClient';
import { CreateTrackInput, UpdateTrackInput } from '../types';
import { MetadataApiTrackResponse } from './types';
import * as v from 'validator';

export const trackServiceFactory = (
  db: PrismaClient,
  httpClient: HttpClient,
  config: Config,
) => ({
  tracks: async (): Promise<Track[]> => {
    const tracks: Track[] = await db.track.findMany();
    return tracks;
  },
  trackById: async (id: string): Promise<Track> => {
    if (!v.isUUID(id)) throwInvalidUuidError(id);

    const track = await db.track.findFirst({
      where: {
        id,
      },
    });
    if (!track) return throwNotFoundError(id);
    return track;
  },
  trackByName: async (
    name: string,
    artistName: string,
  ): Promise<Track | null> => {
    const track = await db.track.findFirst({
      where: {
        AND: [
          {
            name: {
              contains: name,
              mode: 'insensitive',
            },
          },
          {
            artistName: {
              contains: artistName,
              mode: 'insensitive',
            },
          },
        ],
      },
    });
    return track;
  },
  saveTrack: async (track: CreateTrackInput): Promise<Track> => {
    return await db.track.create({ data: track });
  },
  updateTrack: async (id: string, track: UpdateTrackInput): Promise<Track> => {
    if (!v.isUUID(id)) throwInvalidUuidError(id);
    try {
      const updatedTrack = await db.track.update({
        where: {
          id,
        },
        data: track,
      });
      return updatedTrack;
    } catch (error) {
      return throwNotFoundError(id);
    }
  },
  deleteTrack: async (id: string): Promise<string> => {
    if (!v.isUUID(id)) throwInvalidUuidError(id);
    try {
      const deletedId = (
        await db.track.delete({
          where: {
            id,
          },
        })
      ).id;
      return deletedId;
    } catch (error) {
      return throwNotFoundError(id);
    }
  },
  fetchTrackFromMetadataApi: async (name: string, artistName: string) => {
    try {
      const data = await httpClient.get<MetadataApiTrackResponse>({
        method: 'get',
        maxBodyLength: Infinity,
        url: config.metadataApiUrl,
        params: {
          query: JSON.stringify({
            track: name,
            artists: [artistName],
          }),
          format: 'json',
        },
        headers: {
          Authorization: `Bearer ${config.metadataApiAuthToken}`,
        },
      });
      return data;
    } catch (e: any) {
      throw new Error(
        `Failed to fetch track metadata from ${config.metadataApiUrl}.Error message: ${e.message}`,
      );
    }
  },
});

const throwNotFoundError = (id: string) => {
  throw new Error(`The track with id ${id} was not found`);
};

const throwInvalidUuidError = (id: string) => {
  throw new Error(`The track with id ${id} is not a valid UUID`);
};

export type TrackService = ReturnType<typeof trackServiceFactory>;
