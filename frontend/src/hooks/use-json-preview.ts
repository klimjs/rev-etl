import { useQuery } from '@tanstack/react-query'
import { type Mapping, useWarehouseStore } from '@/store/warehouse-store'

const API_URL = import.meta.env.VITE_API_URL

type JsonPreviewResponse = Record<string, unknown>[]

async function fetchJsonPreview(
  connectionString: string,
  table: string,
  mapping: Mapping[],
): Promise<JsonPreviewResponse> {
  const res = await fetch(`${API_URL}/warehouse/json-preview`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ connectionString, table, mapping }),
  })

  if (!res.ok) throw new Error('Failed to fetch JSON preview')

  return res.json()
}

export function useJsonPreview() {
  const { connectionString, selectedTable, mapping } = useWarehouseStore()

  const enabled = !!connectionString && !!selectedTable && mapping.length > 0

  const { data, isFetching, isSuccess, isError, error } = useQuery({
    queryKey: ['json-preview', connectionString, selectedTable, mapping],
    queryFn: () => fetchJsonPreview(connectionString, selectedTable!, mapping),
    enabled,
  })

  return {
    data: data ?? [],
    isPending: isFetching,
    isSuccess,
    isError,
    error,
  }
}
