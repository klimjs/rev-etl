import { useQuery } from '@tanstack/react-query'
import { useWarehouseStore } from '@/store/warehouse-store'

const API_URL = import.meta.env.VITE_API_URL

interface TablesResponse {
  tables: string[]
}

async function fetchTables(connectionString: string): Promise<TablesResponse> {
  const res = await fetch(`${API_URL}/warehouse/tables`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ connectionString }),
  })

  if (!res.ok) throw new Error('Failed to fetch tables')

  return res.json()
}

export function useTables(enabled: boolean) {
  const { connectionString, selectedTable, setSelectedTable } =
    useWarehouseStore()

  const { data, isFetching, isSuccess, isError, error } = useQuery({
    // connectionString to invalidate when connection string changes
    queryKey: ['tables', connectionString],
    queryFn: () => fetchTables(connectionString),
    enabled: enabled && !!connectionString,
  })

  return {
    tables: data?.tables ?? [],
    selectedTable,
    setSelectedTable,
    isPending: isFetching,
    isSuccess,
    isError,
    error,
  }
}
