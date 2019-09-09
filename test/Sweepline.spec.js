import test from 'ava';
import Event from '../src/Event'
import Point from '../src/Point'
import Sweepline from '../src/Sweepline'
import EventQueue from '../src/EventQueue'



// test('Sweepline can swap segments', function (t) {
//     const sl = new Sweepline()

//     const e1 = new Event(new Point([-1, 0]))
//     const e2 = new Event(new Point([0, 0]))

//     e1.otherEvent = e2
//     e2.otherEvent = e1
//     e1.isLeftEndpoint = true;
//     e2.isLeftEndpoint = false;

//     const midLine = sl.addSegment(e1)

//     const e3 = new Event(new Point([0, 1]))
//     const e4 = new Event(new Point([1, 1]))
//     e3.otherEvent = e4
//     e4.otherEvent = e3
//     e3.isLeftEndpoint = true;
//     e4.isLeftEndpoint = false;

//     const topLine = sl.addSegment(e3)

//     t.is(midLine.segmentAbove, topLine)
//     t.is(midLine.segmentBelow, null)
//     t.is(topLine.segmentAbove, null)
//     t.is(topLine.segmentBelow, midLine)

//     sl.flipSegments(midLine, topLine)

// })


test('Sweepline can add an endpoint', function (t) {
    const e1 = new Event(new Point([-1, 0]))
    const e2 = new Event(new Point([0, 0]))

    e1.otherEvent = e2
    e2.otherEvent = e1
    e1.isLeftEndpoint = true;
    e2.isLeftEndpoint = false;

    const sl = new Sweepline()
    const midLine = sl.addSegment(e1)

    t.is(midLine.leftSweepEvent, e1)
    t.is(midLine.segmentAbove, null)
    t.is(midLine.segmentBelow, null)

    const e3 = new Event(new Point([-1, 1]))
    const e4 = new Event(new Point([1, 1]))

    e3.otherEvent = e4
    e4.otherEvent = e3
    e3.isLeftEndpoint = true;
    e4.isLeftEndpoint = false;

    const topLine = sl.addSegment(e3)
    t.is(midLine.segmentAbove, topLine)
    t.is(midLine.segmentBelow, null)
    t.is(topLine.segmentAbove, null)
    t.is(topLine.segmentBelow, midLine)

    const e5 = new Event(new Point([-1, -1]))
    const e6 = new Event(new Point([2, -1]))

    e5.otherEvent = e6
    e6.otherEvent = e5
    e5.isLeftEndpoint = true;
    e6.isLeftEndpoint = false;

    const bottomLine = sl.addSegment(e5)

    t.is(midLine.segmentBelow, bottomLine)
    t.is(midLine.segmentAbove, topLine)

    t.is(bottomLine.segmentAbove, midLine)
    t.is(bottomLine.segmentBelow, null)

    t.is(topLine.segmentAbove, null)
    t.is(topLine.segmentBelow, midLine)
})

test('Sweepline can testIntersects', function (t) {
    const eventQueue = new EventQueue()
    const e1 = new Event(new Point([-1, 0]))
    const e2 = new Event(new Point([0, 0]))

    e1.otherEvent = e2
    e2.otherEvent = e1
    e1.isLeftEndpoint = true
    e2.isLeftEndpoint = false
    e1.segmentIndex = 0
    e2.segmentIndex = 0
    e1.p.nextVertice = e2.p

    const sl = new Sweepline()
    const midLine = sl.addSegment(e1)

    const e3 = new Event(new Point([0, 1]))
    const e4 = new Event(new Point([1, 1]))

    e3.otherEvent = e4
    e4.otherEvent = e3
    e3.isLeftEndpoint = true
    e4.isLeftEndpoint = false
    e3.segmentIndex = 1
    e4.segmentIndex = 1
    e3.p.nextVertice = e4.p

    const topLine = sl.addSegment(e3)
    t.is(sl.testIntersect(midLine, topLine, eventQueue), false)

    const e5 = new Event(new Point([-0.5, 0.5]))
    const e6 = new Event(new Point([-0.5, -1]))

    e5.otherEvent = e6
    e6.otherEvent = e5
    e5.isLeftEndpoint = true;
    e6.isLeftEndpoint = false;
    e5.segmentIndex = 2
    e6.segmentIndex = 2
    e5.p.nextVertice = e6.p

    const crossLine = sl.addSegment(e5)
    const ie = sl.testIntersect(midLine, crossLine, eventQueue)
    t.is(ie.p.x, -0.5)
    t.is(ie.p.y, 0)


    t.is(sl.testIntersect(topLine, crossLine, eventQueue), false)

    const e7 = new Event(new Point([0, 0]))
    const e8 = new Event(new Point([0, -1]))

    e7.otherEvent = e8
    e8.otherEvent = e7
    e7.isLeftEndpoint = true;
    e8.isLeftEndpoint = false;
    e7.p.nextVertice = e8.p

    const touchEndpointLine = sl.addSegment(e7)
    t.is(sl.testIntersect(midLine, touchEndpointLine, eventQueue), false)
    t.is(sl.testIntersect(topLine, touchEndpointLine, eventQueue), false)
})

test('Sweepline is correctly sorted', function (t) {
    const e1 = new Event(new Point([-1, 0]))
    const e2 = new Event(new Point([0, 0]))

    e1.otherEvent = e2
    e2.otherEvent = e1
    e1.isLeftEndpoint = true;
    e2.isLeftEndpoint = false;

    const sl = new Sweepline()
    const midLine = sl.addSegment(e1)

    t.is(midLine.leftSweepEvent, e1)
    t.is(midLine.segmentAbove, null)
    t.is(midLine.segmentBelow, null)

    const e3 = new Event(new Point([-1, 0.1]))
    const e4 = new Event(new Point([0.5, 1]))

    e3.otherEvent = e4
    e4.otherEvent = e3
    e3.isLeftEndpoint = true;
    e4.isLeftEndpoint = false;

    const topLine = sl.addSegment(e3)

    t.is(midLine.segmentAbove, topLine)
    t.is(midLine.segmentBelow, null)
    t.is(topLine.segmentAbove, null)
    t.is(topLine.segmentBelow, midLine)

    const e5 = new Event(new Point([-1, -0.1]))
    const e6 = new Event(new Point([0.5, -1]))

    e5.otherEvent = e6
    e6.otherEvent = e5
    e5.isLeftEndpoint = true;
    e6.isLeftEndpoint = false;

    const bottomLine = sl.addSegment(e5)

    t.is(midLine.segmentBelow, bottomLine)
    t.is(midLine.segmentAbove, topLine)

    t.is(bottomLine.segmentAbove, midLine)
    t.is(bottomLine.segmentBelow, null)

    t.is(topLine.segmentAbove, null)
    t.is(topLine.segmentBelow, midLine)

    sl.removeSegmentFromSweepline(midLine)
    t.is(topLine.segmentAbove, null)
    t.is(topLine.segmentBelow, bottomLine)
    t.is(bottomLine.segmentAbove, topLine)
})

test('Sweepline is correctly sorted again', function (t) {
    const e1 = new Event(new Point([-1, 0]))
    const e2 = new Event(new Point([0, 0]))

    e1.otherEvent = e2
    e2.otherEvent = e1
    e1.isLeftEndpoint = true;
    e2.isLeftEndpoint = false;

    const sl = new Sweepline()
    const midLine = sl.addSegment(e1)

    t.is(midLine.leftSweepEvent, e1)
    t.is(midLine.segmentAbove, null)
    t.is(midLine.segmentBelow, null)

    const e3 = new Event(new Point([-1, 1]))
    const e4 = new Event(new Point([0, 0.1]))

    e3.otherEvent = e4
    e4.otherEvent = e3
    e3.isLeftEndpoint = true;
    e4.isLeftEndpoint = false;

    const topLine = sl.addSegment(e3)

    t.is(midLine.segmentAbove, topLine)
    t.is(midLine.segmentBelow, null)
    t.is(topLine.segmentAbove, null)
    t.is(topLine.segmentBelow, midLine)

    const e5 = new Event(new Point([-1, -1]))
    const e6 = new Event(new Point([0, -0.1]))

    e5.otherEvent = e6
    e6.otherEvent = e5
    e5.isLeftEndpoint = true;
    e6.isLeftEndpoint = false;

    const bottomLine = sl.addSegment(e5)

    t.is(midLine.segmentBelow, bottomLine)
    t.is(midLine.segmentAbove, topLine)

    t.is(bottomLine.segmentAbove, midLine)
    t.is(bottomLine.segmentBelow, null)

    t.is(topLine.segmentAbove, null)
    t.is(topLine.segmentBelow, midLine)

    sl.removeSegmentFromSweepline(midLine)
    t.is(topLine.segmentAbove, null)
    t.is(topLine.segmentBelow, bottomLine)
    t.is(bottomLine.segmentAbove, topLine)
})

