import EventQueue from './EventQueue'
import Sweepline from './Sweepline'

import {fillEventQueue} from './fillQueue'
import {debugCentroid, debugCoords, debugOutConstruction, debugOutputSequence, debugEventAndSegments, debugEventAndSegment, debugIntersectionEventAndSegments, debugP} from './debug'


export default function bentleyOttmann (geojson) {
    const intersectionPoints = []
    const eventQueue = new EventQueue()

    fillEventQueue(geojson, eventQueue)

    const sweepLine = new Sweepline();

    let currentSegment = null

    while (eventQueue.queue.length) {
        const event = eventQueue.queue.pop();
        // debugEventAndSegments(event, sweepLine)

        if (event.isLeftEndpoint) {

            currentSegment = sweepLine.addSegment(event)

            // debugEventAndSegment(event.p, currentSegment)

            const ipWithSegAbove = sweepLine.testIntersect(currentSegment, currentSegment.segmentAbove)
            if (ipWithSegAbove !== false) {
                eventQueue.queue.push(ipWithSegAbove)
            }

            const ipWithSegBelow = sweepLine.testIntersect(currentSegment, currentSegment.segmentBelow)
            if (ipWithSegBelow !== false) {
                eventQueue.queue.push(ipWithSegBelow)
            }
        } else if (event.isLeftEndpoint === false) {

            // debugEventAndSegment(event.p, event.segment)

            const ipWithSegBelow = sweepLine.testIntersect(event.segment.segmentAbove, event.segment.segmentBelow)
            if (ipWithSegBelow !== false) {
                if (!eventQueue.checkIfQueueContainsEvent(ipWithSegBelow)) {
                    eventQueue.queue.push(ipWithSegBelow)
                }
            }
            sweepLine.removeSegmentFromSweepline(event.segment)
        } else {
            intersectionPoints.push(event)

            const segE1 = event.segment1
            const segE2 = event.segment2
            sweepLine.flipSegments(segE1, segE2)

            // debugIntersectionEventAndSegments(event.p, segE1, segE2)

            const segAbove = segE2.segmentAbove
            const segBelow = segE1.segmentBelow

            const ipWithSegAbove = sweepLine.testIntersect(segE2, segAbove)
            if (ipWithSegAbove !== false) {
                if (!eventQueue.checkIfQueueContainsEvent(ipWithSegAbove)) {
                    eventQueue.queue.push(ipWithSegAbove)
                }
            }

            const ipWithSegBelow = sweepLine.testIntersect(segE1, segBelow)
            if (ipWithSegBelow !== false) {
                if (!eventQueue.checkIfQueueContainsEvent(ipWithSegBelow)) {
                    eventQueue.queue.push(ipWithSegBelow)
                }
            }

        }
    }

    return intersectionPoints
}

