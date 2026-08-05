/* eslint-disable no-underscore-dangle */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-shadow */
/* eslint-disable no-restricted-syntax */
import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import { fileURLToPath, pathToFileURL } from 'url';

import config from '../core/config.js';
import loggerFactory from '../core/logger.js';

const logger = loggerFactory('app');

const connectionString = new URL(config.database.connection);
connectionString.pathname += config.database.name;

try {
  await mongoose.connect(connectionString.toString());
  logger.info('Successfully connected to MongoDB');
  // logger.info(`Connecting to: ${connectionString.toString()}`);
} catch (err) {
  logger.error('MongoDB connection failed:', err);
  process.exit(1);
}

const db = mongoose.connection;
db.on('error', (err) => logger.error('MongoDB connection error:', err));

const dbExports = { db };

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);

const files = fs
  .readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
  );

await Promise.all(
  files.map(async (file) => {
    const module = await import(pathToFileURL(path.join(__dirname, file)).href);
    const model = module.default(mongoose);
    dbExports[model.modelName] = model;
  })
);

export default dbExports;
