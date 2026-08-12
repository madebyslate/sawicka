import type { Menu } from '@payload-types';

export function getMenuItems(menu: number | Menu | null | undefined): NonNullable<Menu['items']> {
  if (!menu || typeof menu === 'number') {
    return [];
  }

  return menu.items ?? [];
}
