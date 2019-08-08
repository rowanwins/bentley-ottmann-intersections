import test from 'ava';
import Event from '../src/Event'
import Segment from '../src/Segment'
import Point from '../src/Point'
import Sweepline from '../src/Sweepline'
import EventQueue from '../src/EventQueue'

test('Segment has correct properties', function (t) {

    const e1 = new Event(new Point([-1, 0]))
    const e2 = new Event(new Point([0, 0]))

    e1.otherEvent = e2
    e2.otherEvent = e1
    e1.isLeftEndpoint = true;
    e2.isLeftEndpoint = false;
    const seg = new Segment(e1)

    t.is(seg.leftSweepEvent, e1)
    t.is(seg.rightSweepEvent, e2)
})
