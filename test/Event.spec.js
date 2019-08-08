import test from 'ava';
import Event from '../src/Event'
import Point from '../src/Point'

test('Event has correct properties', function (t) {
    const p = new Point([0, 1])
    const e1 = new Event(p)

    t.is(e1.p.x, 0)
    t.is(e1.p.y, 1)
    t.is(e1.otherEvent, null)
})

test('Event can check against other event for duplicate points', function (t) {
    const e1 = new Event(new Point([0, 0]))
    const e2 = new Event(new Point([0, 0]))

    t.is(e1.isSamePoint(e2), true)
})
