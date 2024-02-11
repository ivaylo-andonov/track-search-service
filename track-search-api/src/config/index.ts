const {
  PORT,
  ENV,
  AUTH_SECRET,
  METADATA_API_URL,
  METADATA_API_AUTH_TOKEN,
  WAIT_BEFORE_SHUTDOWN,
} = process.env;

const config = {
  env: ENV,
  port: PORT || 4000,
  authSecret: AUTH_SECRET || '',
  metadataApiUrl: METADATA_API_URL,
  metadataApiAuthToken: METADATA_API_AUTH_TOKEN,
  waitBeforeShutdown: parseInt(WAIT_BEFORE_SHUTDOWN || '5', 10),
};

export type Config = typeof config;
export default config;
