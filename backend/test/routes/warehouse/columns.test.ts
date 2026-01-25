import { test, describe } from 'node:test'
import * as assert from 'node:assert'
import { build } from '../../helper'

describe('POST /warehouse/columns', () => {
  describe('validation', () => {
    test('returns 400 when connectionString is missing', async (t) => {
      const app = await build(t)

      const res = await app.inject({
        method: 'POST',
        url: '/warehouse/columns',
        payload: { table: 'users' },
      })

      assert.strictEqual(res.statusCode, 400)
    })

    test('returns 400 when table is missing', async (t) => {
      const app = await build(t)

      const res = await app.inject({
        method: 'POST',
        url: '/warehouse/columns',
        payload: {
          connectionString: 'postgresql://test:test@localhost:5432/test',
        },
      })

      assert.strictEqual(res.statusCode, 400)
    })

    test('returns 400 when table is empty', async (t) => {
      const app = await build(t)

      const res = await app.inject({
        method: 'POST',
        url: '/warehouse/columns',
        payload: {
          connectionString: 'postgresql://test:test@localhost:5432/test',
          table: '',
        },
      })

      assert.strictEqual(res.statusCode, 400)
    })
  })
})
