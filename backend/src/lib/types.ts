import { z } from 'zod'

export const columnMappingSchema = z.object({
  column: z.string(),
  path: z.string(), // user.name.first
})

export const connectionStringSchema = z.object({
  connectionString: z.string().min(1, 'Connection string is required'),
})

export const columnsInputSchema = connectionStringSchema.extend({
  table: z.string().min(1, 'Table is required'),
})

export const jsonPreviewInputSchema = columnsInputSchema.extend({
  limit: z.number().optional(),
  mapping: z.array(columnMappingSchema).min(1, 'Mapping is required'),
})

export type ColumnMapping = z.infer<typeof columnMappingSchema>
export type JsonPreviewInput = z.infer<typeof jsonPreviewInputSchema>
export type TableRow = Record<string, unknown>
