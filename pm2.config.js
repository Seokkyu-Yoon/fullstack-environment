module.exports = {
  apps: [{
    name: 'Daedeok-ReShare-Platform',
    script: './bin/server.js',
    env: {
      DEBUG: false,
      PORT: 5070,
    },
  }],
};
