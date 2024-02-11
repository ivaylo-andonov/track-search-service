import 'dotenv/config';
import 'graphql-import-node';
import config from './config';
import { Logger } from 'ts-log';
import { server } from './server';
import prisma from './prisma/client';
import { context } from './utils/context';
import { shutdownFactory } from './utils/shutdownFactory';
import { startStandaloneServer } from '@apollo/server/standalone';

const logger = console;
const gracefulShutdown = shutdownFactory(
  server,
  prisma,
  logger,
  config.waitBeforeShutdown,
);

const bootstrap = async (logger: Logger) => {
  try {
    const { url } = await startStandaloneServer(server, {
      context,
      listen: {
        port: Number(process.env.PORT),
      },
    });

    logger.log(`🚀 Server ready at ${url}`);
    process.on('SIGTERM', gracefulShutdown);
  } catch (error) {
    logger.error({
      message: `Track Search API failed on start: ${error}`,
    });
    await prisma.$disconnect();
    process.exit(1);
  }
};

bootstrap(console);
