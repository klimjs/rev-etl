import { useQuery } from '@tanstack/react-query'
import { useWarehouseStore } from '@/store/warehouse-store'

const API_URL = import.meta.env.VITE_API_URL

interface ColumnsResponse {
  columns: string[]
}

async function fetchColumns(
  connectionString: string,
  table: string | null,
): Promise<ColumnsResponse> {
  const res = await fetch(`${API_URL}/warehouse/columns`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ connectionString, table }),
  })

  if (!res.ok) throw new Error('Failed to fetch columns')

  return res.json()
}

export function useColumns() {
  const { connectionString, selectedTable } = useWarehouseStore()

  const enabled = !!connectionString && !!selectedTable

  const { data, isFetching, isSuccess, isError, error } = useQuery({
    queryKey: ['columns', connectionString, selectedTable],
    queryFn: () => fetchColumns(connectionString, selectedTable),
    enabled,
  })

  return {
    columns: data?.columns ?? [],
    isPending: isFetching,
    isSuccess,
    isError,
    error,
  }
}
