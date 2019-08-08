import test from 'ava';
import {fillEventQueue} from '../src/fillQueue'
import EventQueue from '../src/EventQueue'
const loadJsonFile = require('load-json-file')
const path = require('path')

const diamond = loadJsonFile.sync(path.join(__dirname, 'fixtures', 'simple', 'diamond.geojson'))


test('Event queue is filled correctly', function (t) {
    const eq = new EventQueue()

    fillEventQueue(diamond, eq)

    const firstEvent = eq.queue.pop();

    t.deepEqual([firstEvent.p.x, firstEvent.p.y], [-1, 0])

    t.is(firstEvent.isLeftEndpoint, true)
    t.is(firstEvent.otherEvent.isLeftEndpoint, false)
})

test('Event queue - input is not mutated', function (t) {
    const eq = new EventQueue()
    const clonedDiamond = JSON.parse(JSON.stringify(diamond))

    fillEventQueue(diamond, eq)
    t.deepEqual(diamond, clonedDiamond)
})

test('Event queue - length is correct', function (t) {
    const eq = new EventQueue()

    fillEventQueue(diamond, eq)
    t.is(eq.queue.length, 8)
})
