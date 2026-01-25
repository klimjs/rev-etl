import { test, describe } from 'node:test'
import * as assert from 'node:assert'
import { build } from '../../helper'

describe('POST /warehouse/json-preview', () => {
  describe('validation', () => {
    test('returns 400 when connectionString is missing', async (t) => {
      const app = await build(t)

      const res = await app.inject({
        method: 'POST',
        url: '/warehouse/json-preview',
        payload: {
          table: 'users',
          mapping: [{ column: 'id', path: 'userId' }],
        },
      })

      assert.strictEqual(res.statusCode, 400)
    })

    test('returns 400 when table is missing', async (t) => {
      const app = await build(t)

      const res = await app.inject({
        method: 'POST',
        url: '/warehouse/json-preview',
        payload: {
          connectionString: 'postgresql://test:test@localhost:5432/test',
          mapping: [{ column: 'id', path: 'userId' }],
        },
      })

      assert.strictEqual(res.statusCode, 400)
    })

    test('returns 400 when mapping is missing', async (t) => {
      const app = await build(t)

      const res = await app.inject({
        method: 'POST',
        url: '/warehouse/json-preview',
        payload: {
          connectionString: 'postgresql://test:test@localhost:5432/test',
          table: 'users',
        },
      })

      assert.strictEqual(res.statusCode, 400)
    })

    test('returns 400 when mapping is empty array', async (t) => {
      const app = await build(t)

      const res = await app.inject({
        method: 'POST',
        url: '/warehouse/json-preview',
        payload: {
          connectionString: 'postgresql://test:test@localhost:5432/test',
          table: 'users',
          mapping: [],
        },
      })

      assert.strictEqual(res.statusCode, 400)
    })
  })
})
