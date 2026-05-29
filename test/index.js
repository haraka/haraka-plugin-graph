'use strict'

const assert = require('node:assert/strict')
const { beforeEach, describe, it } = require('node:test')

const { makePlugin } = require('haraka-test-fixtures')

describe('load_graph_ini', () => {
  let plugin

  beforeEach(() => {
    plugin = makePlugin('graph', { register: false })
  })

  it('filters plugin list with the configured ignore_re', () => {
    plugin.config.get = (name, type) => {
      if (name === 'graph.ini') return { main: { ignore_re: 'queue|graph' } }
      if (name === 'plugins')
        return ['queue/smtp_forward', 'graph', 'access', 'dkim']
      return undefined
    }
    const registry = plugin.load_graph_ini()
    assert.ok('access' in registry)
    assert.ok('dkim' in registry)
    assert.ok(!('queue/smtp_forward' in registry))
    assert.ok(!('graph' in registry))
    // canonical buckets still exist
    assert.equal(registry.accepted, 0)
    assert.equal(registry.disconnect_early, 0)
  })

  it('falls back to grapher.ignore_re when graph.ini does not define one', () => {
    plugin.config.get = (name) => {
      if (name === 'graph.ini') return { main: {} }
      if (name === 'grapher.ignore_re') return 'foo|bar'
      if (name === 'plugins') return ['foo', 'bar', 'baz']
      return undefined
    }
    const registry = plugin.load_graph_ini()
    assert.ok('baz' in registry)
    assert.ok(!('foo' in registry))
    assert.ok(!('bar' in registry))
  })

  it('uses the documented default when neither knob is set', () => {
    plugin.config.get = (name) => {
      if (name === 'graph.ini') return { main: {} }
      if (name === 'plugins') return ['queue/smtp_forward', 'access', 'graph']
      return undefined
    }
    const registry = plugin.load_graph_ini()
    assert.ok('access' in registry)
    assert.ok(!('queue/smtp_forward' in registry))
    assert.ok(!('graph' in registry))
  })

  it('passes a watchCb to config.get for hot-reload (C1)', () => {
    let captured
    plugin.config.get = (name, opts) => {
      if (typeof opts === 'function') captured = opts
      if (name === 'graph.ini') return { main: { ignore_re: 'queue' } }
      if (name === 'plugins') return ['queue/smtp_forward', 'access']
      return undefined
    }
    plugin.load_graph_ini()
    assert.equal(typeof captured, 'function', 'expected reload callback')
  })
})
