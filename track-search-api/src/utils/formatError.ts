import { ApolloServerErrorCode } from '@apollo/server/errors';
import { GraphQLFormattedError } from 'graphql/error';

export const formatError = (formattedError: GraphQLFormattedError) => {
  if (
    formattedError.extensions?.code ===
    ApolloServerErrorCode.GRAPHQL_VALIDATION_FAILED
  ) {
    return {
      ...formattedError,
      message: "Your query doesn't match the schema. Try double-checking it!",
    };
  }
  return formattedError;
};
