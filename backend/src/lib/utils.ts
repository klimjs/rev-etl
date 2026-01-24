import { setProperty } from 'dot-prop'
import { ColumnMapping, TableRow } from './types'

/**
 * Transform rows to a nested JSON object based on the mapping.
 * @param rows - The rows to transform.
 * @param mapping - The mapping of columns to paths.
 * @returns The transformed rows.
 */
export const transformRows = (
  rows: TableRow[],
  mapping: ColumnMapping[],
): TableRow[] => {
  return rows.map((row) =>
    mapping.reduce<TableRow>((acc, { column, path }) => {
      if (column in row) {
        setProperty(acc, path, row[column])
      }
      return acc
    }, {}),
  )
}
