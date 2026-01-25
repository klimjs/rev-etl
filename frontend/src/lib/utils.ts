import type { Mapping } from '@/store/warehouse-store'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getMappingKey(mapping: Mapping[]): string {
  const sorted = [...mapping].sort((a, b) => a.column.localeCompare(b.column))

  return JSON.stringify(sorted)
}
