import { create } from 'zustand'

export type Mapping = {
  sourceColumn: string
  targetPath: string
}

type WarehouseStore = {
  connectionString: string
  selectedTable: string | null
  mapping: Mapping[]

  setConnectionString: (v: string) => void
  setSelectedTable: (v: string | null) => void
  setMapping: (v: Mapping[]) => void

  resetConnection: () => void
  resetTable: () => void
  resetMapping: () => void
}

export const useWarehouseStore = create<WarehouseStore>((set) => ({
  connectionString: '',
  selectedTable: null,
  mapping: [],

  setConnectionString: (connectionString) =>
    set(() => ({
      connectionString,
      selectedTable: null,
      mapping: [],
    })),

  setSelectedTable: (selectedTable) =>
    set(() => ({
      selectedTable,
      mapping: [],
    })),

  setMapping: (mapping) => set({ mapping }),

  resetConnection: () =>
    set({ connectionString: '', selectedTable: null, mapping: [] }),
  resetTable: () => set({ selectedTable: null, mapping: [] }),
  resetMapping: () => set({ mapping: [] }),
}))
