import * as Query from './Query.graphql';
import * as Mutation from './Mutation.graphql';
import * as Track from './Track.graphql';
import { DateTimeTypeDefinition } from 'graphql-scalars';
import { parse } from 'graphql';

const schemaDefinition = [
  Query,
  Mutation,
  Track,
  parse(DateTimeTypeDefinition),
];

export type SchemaDefinition = typeof schemaDefinition;
export default schemaDefinition;
