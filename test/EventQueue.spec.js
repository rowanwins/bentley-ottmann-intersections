import test from 'ava';
import EventQueue from '../src/EventQueue'
import Event from '../src/Event'
import Point from '../src/Point'

test('EventQueue is correctly sorted', function (t) {
    const eventQueue = new EventQueue()

    const e1 = new Event(new Point([0, 0]))
    const e2 = new Event(new Point([1, 0]))
    const e3 = new Event(new Point([-1, 0]))

    eventQueue.queue.push(e1)
    eventQueue.queue.push(e3)
    eventQueue.queue.push(e2)

    const firstEvent = eventQueue.queue.pop();
    t.deepEqual([firstEvent.p.x, firstEvent.p.y], [-1, 0])

    const secondEvent = eventQueue.queue.pop();
    t.deepEqual([secondEvent.p.x, secondEvent.p.y], [0, 0])

    const thirdEvent = eventQueue.queue.pop();
    t.deepEqual([thirdEvent.p.x, thirdEvent.p.y], [1, 0])
})
