const pino = require('pino');

module.exports = (appName) => {
  const options = {
    name: appName,
    formatters: {
      level: (label) => ({ level: label.toUpperCase() }),
    },
    timestamp: pino.stdTimeFunctions.isoTime,
    level: 'trace',
    redact: {
      paths: ['password', '*.password', 'token', 'authorization'],
      censor: '[REDACTED]',
    },
  };

  return process.env.NODE_ENV === 'production'
    ? pino(options)
    : pino(
        options,
        pino.transport({
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:standard',
          },
        })
      );
};