import { GraphQLError } from 'graphql/error';
import { verifyToken } from './auth';
import config from '../config';
import { StandaloneServerContextFunctionArgument } from '@apollo/server/standalone';

export const context = async ({
  req,
}: StandaloneServerContextFunctionArgument) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token)
    throw new GraphQLError(
      'Auth token is not provided (`Authorization` : `Bearer AUTH_TOKEN`)',
      {
        extensions: {
          code: 'UNAUTHENTICATED',
          http: { status: 401 },
        },
      },
    );

  verifyToken(token, config.authSecret);
  return {};
};
