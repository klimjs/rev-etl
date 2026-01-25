import { test, describe } from 'node:test'
import * as assert from 'node:assert'
import { build } from '../../helper'

describe('POST /warehouse/connection-test', () => {
  describe('validation', () => {
    test('returns 400 when connectionString is missing', async (t) => {
      const app = await build(t)

      const res = await app.inject({
        method: 'POST',
        url: '/warehouse/connection-test',
        payload: {},
      })

      assert.strictEqual(res.statusCode, 400)
    })

    test('returns 400 when connectionString is empty', async (t) => {
      const app = await build(t)

      const res = await app.inject({
        method: 'POST',
        url: '/warehouse/connection-test',
        payload: { connectionString: '' },
      })

      assert.strictEqual(res.statusCode, 400)
    })
  })
})
