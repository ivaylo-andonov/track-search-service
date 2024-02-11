export type Track = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  artistName: string;
  duration: number;
  isrc: string;
  releaseDate: Date;
};

export type CreateTrackInput = {
  artistName: string;
  name: string;
  duration: number;
  isrc: string;
  releaseDate: Date;
};

export type GetTrackByNameArgs = {
  input: { name: string; artistName: string };
};

export type GetTrackByIdArgs = {
  id: string;
};

export type TrackTrackByIdArgs = {
  id: string;
};

export type UpdateTrackArgs = { id: string; track: UpdateTrackInput };

export type UpdateTrackInput = Partial<CreateTrackInput>;
