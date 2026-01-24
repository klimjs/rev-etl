export interface ColumnMapping {
  column: string
  path: string // user.name.first
}

export interface JsonPreviewInput {
  connectionString: string
  table: string
  limit?: number
  mapping: ColumnMapping[]
}

export type TableRow = Record<string, unknown>
