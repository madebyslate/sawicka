import * as migration_20260812_122837_initial_schema from './20260812_122837_initial_schema';
import * as migration_20260813_065509 from './20260813_065509';
import * as migration_20260813_145029_add_interface_text from './20260813_145029_add_interface_text';
import * as migration_20260813_160413_add_pain_point_feature_icon_images from './20260813_160413_add_pain_point_feature_icon_images';
import * as migration_20260814_003353_add_post_read_time_hook from './20260814_003353_add_post_read_time_hook';

export const migrations = [
  {
    up: migration_20260812_122837_initial_schema.up,
    down: migration_20260812_122837_initial_schema.down,
    name: '20260812_122837_initial_schema',
  },
  {
    up: migration_20260813_065509.up,
    down: migration_20260813_065509.down,
    name: '20260813_065509',
  },
  {
    up: migration_20260813_145029_add_interface_text.up,
    down: migration_20260813_145029_add_interface_text.down,
    name: '20260813_145029_add_interface_text',
  },
  {
    up: migration_20260813_160413_add_pain_point_feature_icon_images.up,
    down: migration_20260813_160413_add_pain_point_feature_icon_images.down,
    name: '20260813_160413_add_pain_point_feature_icon_images',
  },
  {
    up: migration_20260814_003353_add_post_read_time_hook.up,
    down: migration_20260814_003353_add_post_read_time_hook.down,
    name: '20260814_003353_add_post_read_time_hook'
  },
];
