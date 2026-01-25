import { test, describe } from 'node:test'
import * as assert from 'node:assert'
import { build } from '../../helper'

describe('POST /warehouse/tables', () => {
  describe('validation', () => {
    test('returns 400 when connectionString is missing', async (t) => {
      const app = await build(t)

      const res = await app.inject({
        method: 'POST',
        url: '/warehouse/tables',
        payload: {},
      })

      assert.strictEqual(res.statusCode, 400)
    })
  })
})
