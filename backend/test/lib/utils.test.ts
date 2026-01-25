import { test, describe } from 'node:test'
import * as assert from 'node:assert'
import { transformRows, getErrorMessage } from '../../src/lib/utils'

describe('getErrorMessage', () => {
  test('extracts message from Error instance', () => {
    const error = new Error('Test error message')
    assert.strictEqual(getErrorMessage(error), 'Test error message')
  })

  test('returns "Unknown error" for non-Error objects', () => {
    assert.strictEqual(getErrorMessage('string error'), 'Unknown error')
    assert.strictEqual(getErrorMessage(null), 'Unknown error')
    assert.strictEqual(getErrorMessage(undefined), 'Unknown error')
    assert.strictEqual(
      getErrorMessage({ message: 'not an error' }),
      'Unknown error',
    )
  })
})

describe('transformRows', () => {
  test('transforms simple flat mapping', () => {
    const rows = [{ id: 1, name: 'Alice' }]
    const mapping = [
      { column: 'id', path: 'userId' },
      { column: 'name', path: 'userName' },
    ]

    const result = transformRows(rows, mapping)

    assert.deepStrictEqual(result, [{ userId: 1, userName: 'Alice' }])
  })

  test('transforms nested paths', () => {
    const rows = [{ first_name: 'Alice', last_name: 'Smith' }]
    const mapping = [
      { column: 'first_name', path: 'user.name.first' },
      { column: 'last_name', path: 'user.name.last' },
    ]

    const result = transformRows(rows, mapping)

    assert.deepStrictEqual(result, [
      { user: { name: { first: 'Alice', last: 'Smith' } } },
    ])
  })

  test('handles multiple rows', () => {
    const rows = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ]
    const mapping = [{ column: 'name', path: 'userName' }]

    const result = transformRows(rows, mapping)

    assert.deepStrictEqual(result, [{ userName: 'Alice' }, { userName: 'Bob' }])
  })

  test('skips columns not present in row', () => {
    const rows = [{ id: 1 }]
    const mapping = [
      { column: 'id', path: 'userId' },
      { column: 'missing', path: 'missingField' },
    ]

    const result = transformRows(rows, mapping)

    assert.deepStrictEqual(result, [{ userId: 1 }])
  })

  test('returns empty array for empty rows', () => {
    const result = transformRows([], [{ column: 'id', path: 'userId' }])
    assert.deepStrictEqual(result, [])
  })

  test('returns array of empty objects for empty mapping', () => {
    const rows = [{ id: 1 }, { id: 2 }]
    const result = transformRows(rows, [])
    assert.deepStrictEqual(result, [{}, {}])
  })

  test('handles deeply nested paths', () => {
    const rows = [{ value: 42 }]
    const mapping = [{ column: 'value', path: 'a.b.c.d.e' }]

    const result = transformRows(rows, mapping)

    assert.deepStrictEqual(result, [{ a: { b: { c: { d: { e: 42 } } } } }])
  })

  test('handles null values', () => {
    const rows = [{ id: 1, name: null }]
    const mapping = [
      { column: 'id', path: 'userId' },
      { column: 'name', path: 'userName' },
    ]

    const result = transformRows(rows, mapping)

    assert.deepStrictEqual(result, [{ userId: 1, userName: null }])
  })
})
