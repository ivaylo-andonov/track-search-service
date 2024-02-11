import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql/error';

export const verifyToken = (token: string, secretKey: string) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (err) {
    throw new GraphQLError('User is not authenticated: Invalid token.', {
      extensions: {
        code: 'UNAUTHENTICATED',
        http: { status: 401 },
      },
    });
  }
};
