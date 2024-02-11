import { ApolloServer } from '@apollo/server';
import prisma from './prisma/client';
import typeDefs from './typeDefs';
import resolversFactory from './resolvers';
import { httpClientFactory } from './utils/httpClient';
import { trackServiceFactory } from './services';
import config from './config';
import { Logger } from 'ts-log';
import { formatError } from './utils/formatError';

const logger: Logger = console;
const httpClient = httpClientFactory(logger);
const trackService = trackServiceFactory(prisma, httpClient, config);
const resolvers = resolversFactory(trackService);

export const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError,
});
