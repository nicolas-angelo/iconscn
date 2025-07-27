export const iconStyles = [
  'filled',
  'outlined',
  'round',
  'sharp',
  'two-tone',
] as const

export type IconStyle = (typeof iconStyles)[number]
export type IconInfo = { style: IconStyle; name: string; path: string }
