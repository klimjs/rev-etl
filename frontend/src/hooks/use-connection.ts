import { useMutation } from '@tanstack/react-query'
import { useWarehouseStore } from '@/store/warehouse-store'

const API_URL = import.meta.env.VITE_API_URL

interface ConnectionTestResponse {
  ok: boolean
}

// TODO: fetch -> axios
async function testConnection(
  connectionString: string,
): Promise<ConnectionTestResponse> {
  const res = await fetch(`${API_URL}/warehouse/connection-test`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ connectionString }),
  })

  if (!res.ok) throw new Error('Connection failed')

  return res.json()
}

export function useConnection() {
  const {
    connectionString,
    connectionStatus,
    setConnectionString,
    setConnectionStatus,
  } = useWarehouseStore()

  const { mutate, isPending } = useMutation({
    mutationFn: () => testConnection(connectionString),
    onSuccess: () => setConnectionStatus('success'),
    onError: () => setConnectionStatus('error'),
  })

  return {
    connectionString,
    setConnectionString,
    testConnection: mutate,
    isPending,
    isSuccess: connectionStatus === 'success',
    isError: connectionStatus === 'error',
  }
}
