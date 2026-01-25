import { describe, it, expect, beforeEach } from 'vitest'
import { useWarehouseStore } from './warehouse-store'

describe('useWarehouseStore', () => {
  beforeEach(() => {
    useWarehouseStore.setState({
      connectionString: '',
      connectionStatus: 'idle',
      selectedTable: null,
      mapping: [],
    })
  })

  describe('setConnectionString', () => {
    it('updates connection string and resets dependent state', () => {
      useWarehouseStore.setState({
        connectionStatus: 'success',
        selectedTable: 'users',
        mapping: [{ column: 'id', path: 'id' }],
      })

      useWarehouseStore.getState().setConnectionString('postgres://new')

      const state = useWarehouseStore.getState()
      expect(state.connectionString).toBe('postgres://new')
      expect(state.connectionStatus).toBe('idle')
      expect(state.selectedTable).toBeNull()
      expect(state.mapping).toEqual([])
    })
  })

  describe('setSelectedTable', () => {
    it('updates table and resets mapping', () => {
      useWarehouseStore.setState({
        mapping: [{ column: 'id', path: 'id' }],
      })

      useWarehouseStore.getState().setSelectedTable('orders')

      const state = useWarehouseStore.getState()
      expect(state.selectedTable).toBe('orders')
      expect(state.mapping).toEqual([])
    })
  })

  describe('updateMapping', () => {
    it('adds new mapping', () => {
      useWarehouseStore
        .getState()
        .updateMapping({ column: 'id', path: 'user.id' })

      expect(useWarehouseStore.getState().mapping).toEqual([
        { column: 'id', path: 'user.id' },
      ])
    })

    it('updates existing mapping', () => {
      useWarehouseStore.setState({
        mapping: [{ column: 'id', path: 'old.path' }],
      })

      useWarehouseStore
        .getState()
        .updateMapping({ column: 'id', path: 'new.path' })

      expect(useWarehouseStore.getState().mapping).toEqual([
        { column: 'id', path: 'new.path' },
      ])
    })

    it('removes mapping when path is empty', () => {
      useWarehouseStore.setState({
        mapping: [
          { column: 'id', path: 'user.id' },
          { column: 'name', path: 'user.name' },
        ],
      })

      useWarehouseStore.getState().updateMapping({ column: 'id', path: '' })

      expect(useWarehouseStore.getState().mapping).toEqual([
        { column: 'name', path: 'user.name' },
      ])
    })

    it('removes mapping when path is whitespace', () => {
      useWarehouseStore.setState({
        mapping: [{ column: 'id', path: 'user.id' }],
      })

      useWarehouseStore.getState().updateMapping({ column: 'id', path: '   ' })

      expect(useWarehouseStore.getState().mapping).toEqual([])
    })
  })

  describe('reset functions', () => {
    it('resetConnection clears all state', () => {
      useWarehouseStore.setState({
        connectionString: 'postgres://test',
        connectionStatus: 'success',
        selectedTable: 'users',
        mapping: [{ column: 'id', path: 'id' }],
      })

      useWarehouseStore.getState().resetConnection()

      const state = useWarehouseStore.getState()
      expect(state.connectionString).toBe('')
      expect(state.connectionStatus).toBe('idle')
      expect(state.selectedTable).toBeNull()
      expect(state.mapping).toEqual([])
    })

    it('resetTable clears table and mapping', () => {
      useWarehouseStore.setState({
        connectionString: 'postgres://test',
        selectedTable: 'users',
        mapping: [{ column: 'id', path: 'id' }],
      })

      useWarehouseStore.getState().resetTable()

      const state = useWarehouseStore.getState()
      expect(state.connectionString).toBe('postgres://test')
      expect(state.selectedTable).toBeNull()
      expect(state.mapping).toEqual([])
    })

    it('resetMapping clears only mapping', () => {
      useWarehouseStore.setState({
        selectedTable: 'users',
        mapping: [{ column: 'id', path: 'id' }],
      })

      useWarehouseStore.getState().resetMapping()

      const state = useWarehouseStore.getState()
      expect(state.selectedTable).toBe('users')
      expect(state.mapping).toEqual([])
    })
  })
})
