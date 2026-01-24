import { create } from 'zustand'

export type Mapping = {
  sourceColumn: string
  targetPath: string
}

export type ConnectionStatus = 'idle' | 'success' | 'error'

type WarehouseStore = {
  connectionString: string
  connectionStatus: ConnectionStatus
  selectedTable: string | null
  mapping: Mapping[]

  setConnectionString: (v: string) => void
  setConnectionStatus: (v: ConnectionStatus) => void
  setSelectedTable: (v: string | null) => void
  setMapping: (v: Mapping[]) => void

  resetConnection: () => void
  resetTable: () => void
  resetMapping: () => void
}

export const useWarehouseStore = create<WarehouseStore>((set) => ({
  connectionString: '',
  connectionStatus: 'idle',
  selectedTable: null,
  mapping: [],

  setConnectionString: (connectionString) =>
    set(() => ({
      connectionString,
      connectionStatus: 'idle',
      selectedTable: null,
      mapping: [],
    })),

  setConnectionStatus: (connectionStatus) => set({ connectionStatus }),

  setSelectedTable: (selectedTable) =>
    set(() => ({
      selectedTable,
      mapping: [],
    })),

  setMapping: (mapping) => set({ mapping }),

  resetConnection: () =>
    set({
      connectionString: '',
      connectionStatus: 'idle',
      selectedTable: null,
      mapping: [],
    }),
  resetTable: () => set({ selectedTable: null, mapping: [] }),
  resetMapping: () => set({ mapping: [] }),
}))
