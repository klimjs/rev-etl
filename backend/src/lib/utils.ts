import { setProperty } from 'dot-prop'
import { ColumnMapping } from './types'

/**
 * Transform rows to a nested JSON object based on the mapping.
 * @param rows - The rows to transform.
 * @param mapping - The mapping of columns to paths.
 * @returns The transformed rows.
 */
export const transformRows = (
  rows: Array<Record<string, any>>,
  mapping: ColumnMapping[],
): Array<Record<string, any>> => {
  // TODO: fix types
  return rows.map((row) =>
    mapping.reduce<Record<string, any>>((acc, { column, path }) => {
      if (column in row) {
        setProperty(acc, path, row[column])
      }
      return acc
    }, {}),
  )
}
