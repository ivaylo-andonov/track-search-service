import { PrismaClient } from '@prisma/client';
import { Logger } from 'ts-log';

interface StoppableServer {
  stop: () => Promise<void>;
}

export const shutdownFactory =
  (
    server: StoppableServer,
    prisma: PrismaClient,
    logger: Logger,
    waitBeforeShutdown: number,
  ) =>
  (signal?: string) => {
    logger.warning({
      message: `Received termination signal ${signal}. Waiting for ${waitBeforeShutdown} seconds before closing.`,
    });

    setTimeout(async () => {
      await server.stop();
      await prisma.$disconnect();
      logger.warning({ message: 'Server closed gracefully!' });
      process.exit(0);
    }, waitBeforeShutdown * 1000);
  };
