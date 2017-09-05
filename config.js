const config = {
  environment: process.env.NODE_ENV || 'dev',
  server: {
    port: process.env.PORT || 8001
  },
  mongo: {
    url: process.env.MONGO_DB_URI || 'mongodb://localhost/webservice'
  },
  jtwSecret: 'MyS3cr3tK3Y',
  jtwSession: {session: false}
};

module.exports = config;
