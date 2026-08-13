import * as migration_20260812_122837_initial_schema from './20260812_122837_initial_schema';
import * as migration_20260813_065509 from './20260813_065509';

export const migrations = [
  {
    up: migration_20260812_122837_initial_schema.up,
    down: migration_20260812_122837_initial_schema.down,
    name: '20260812_122837_initial_schema',
  },
  {
    up: migration_20260813_065509.up,
    down: migration_20260813_065509.down,
    name: '20260813_065509'
  },
];
