import { create } from 'zustand'

export type Mapping = {
  column: string
  path: string
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
  updateMapping: (v: Mapping) => void

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

  updateMapping: ({ column, path }: Mapping) =>
    set((state) => {
      // If the target path is empty, remove the mapping
      if (!path.trim()) {
        return {
          mapping: state.mapping.filter((m) => m.column !== column),
        }
      }

      // If the mapping already exists, update the target path
      const existing = state.mapping.find((m) => m.column === column)
      if (existing) {
        return {
          mapping: state.mapping.map((m) =>
            m.column === column ? { ...m, path } : m,
          ),
        }
      }

      // If the mapping does not exist, add it
      return { mapping: [...state.mapping, { column, path }] }
    }),

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
