import clsx, { type ClassArray } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cx = (...inputs: ClassArray) => {
  return twMerge(clsx(...inputs))
}
