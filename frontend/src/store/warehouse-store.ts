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

  updateMapping: ({ sourceColumn, targetPath }: Mapping) =>
    set((state) => {
      // If the target path is empty, remove the mapping
      if (!targetPath.trim()) {
        return {
          mapping: state.mapping.filter((m) => m.sourceColumn !== sourceColumn),
        }
      }

      // If the mapping already exists, update the target path
      const existing = state.mapping.find(
        (m) => m.sourceColumn === sourceColumn,
      )
      if (existing) {
        return {
          mapping: state.mapping.map((m) =>
            m.sourceColumn === sourceColumn ? { ...m, targetPath } : m,
          ),
        }
      }

      // If the mapping does not exist, add it
      return { mapping: [...state.mapping, { sourceColumn, targetPath }] }
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
