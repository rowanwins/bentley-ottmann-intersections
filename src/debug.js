/* istanbul ignore file */
export function debugEventAndSegments (event, sweepline) {
    if (process.env.NODE_ENV !== 'development') return
    const map = window.map
    const eLayer = L.circleMarker([event.p.y, event.p.x]).addTo(map)

    const segs = sweepline.tree.keys()
    const lines = L.layerGroup([]).addTo(map)

    segs.forEach(function (seg) {
        L.polyline([
            [seg.leftSweepEvent.p.y, seg.leftSweepEvent.p.x],
            [seg.rightSweepEvent.p.y, seg.rightSweepEvent.p.x]
        ], {color: 'grey'}).addTo(lines)

    })

    // const polyline = L.polyline([[event.p.y, event.p.x], [event.otherEvent.p.y, event.otherEvent.p.x]], {color: 'red'}).addTo(map)

    debugger

    eLayer.remove()
    lines.clearLayers()
}

export function debugCentroid (p) {
    if (process.env.NODE_ENV !== 'development') return
    const map = window.map
    const eLayer = L.circleMarker([p[1], p[0]]).addTo(map)

    debugger

    // eLayer.remove()

}

export function debugIntersectionEventAndSegments (event, seg1, seg2) {
    if (process.env.NODE_ENV !== 'development') return
    const map = window.map
    const eLayer = L.circleMarker([event.y, event.x]).addTo(map)

    const lines = L.layerGroup([]).addTo(map)

    L.polyline([
        [seg1.leftSweepEvent.p.y, seg1.leftSweepEvent.p.x],
        [seg1.rightSweepEvent.p.y, seg1.rightSweepEvent.p.x]
    ], {color: 'green'}).addTo(lines)

    L.polyline([
        [seg2.leftSweepEvent.p.y, seg2.leftSweepEvent.p.x],
        [seg2.rightSweepEvent.p.y, seg2.rightSweepEvent.p.x]
    ], {color: 'red'}).addTo(lines)

    debugger

    eLayer.remove()
    lines.remove()
}

export function debugTwoSegments (seg1, seg2) {
    if (process.env.NODE_ENV !== 'development') return
    const map = window.map

    const lines = L.layerGroup([]).addTo(map)

    L.polyline([
        [seg1.leftSweepEvent.p.y, seg1.leftSweepEvent.p.x],
        [seg1.rightSweepEvent.p.y, seg1.rightSweepEvent.p.x]
    ], {color: 'green'}).addTo(lines)

    L.polyline([
        [seg2.leftSweepEvent.p.y, seg2.leftSweepEvent.p.x],
        [seg2.rightSweepEvent.p.y, seg2.rightSweepEvent.p.x]
    ], {color: 'red'}).addTo(lines)

    debugger

    lines.remove()
}

export function debugSegmentBelowAbove (intersection, segment) {
    if (process.env.NODE_ENV !== 'development') return
    const map = window.map

    const eLayer = L.circleMarker([intersection.y, intersection.x]).addTo(map)

    const lines = L.layerGroup([]).addTo(map)

    L.polyline([
        [segment.leftSweepEvent.p.y, segment.leftSweepEvent.p.x],
        [segment.rightSweepEvent.p.y, segment.rightSweepEvent.p.x]
    ], {color: 'grey'}).addTo(lines)

    if (segment.segmentAbove !== null) {
        L.polyline([
            [segment.segmentAbove.leftSweepEvent.p.y, segment.segmentAbove.leftSweepEvent.p.x],
            [segment.segmentAbove.rightSweepEvent.p.y, segment.segmentAbove.rightSweepEvent.p.x]
        ], {color: 'green'}).addTo(lines)
    }

    if (segment.segmentBelow !== null) {
        L.polyline([
            [segment.segmentBelow.leftSweepEvent.p.y, segment.segmentBelow.leftSweepEvent.p.x],
            [segment.segmentBelow.rightSweepEvent.p.y, segment.segmentBelow.rightSweepEvent.p.x]
        ], {color: 'purple'}).addTo(lines)
    }


    debugger

    eLayer.remove()
    lines.clearLayers()
}

export function debugEventAndSegment (event, segment) {
    if (process.env.NODE_ENV !== 'development') return
    const map = window.map

    const eLayer = L.circleMarker([event.y, event.x]).addTo(map)

    const lines = L.layerGroup([]).addTo(map)

    const b = map.getBounds()
    L.polyline([
        [b.getNorth(), event.x],
        [b.getSouth(), event.x]
    ], {color: 'grey', weight: 1}).addTo(lines);


    L.polyline([
        [segment.leftSweepEvent.p.y, segment.leftSweepEvent.p.x],
        [segment.rightSweepEvent.p.y, segment.rightSweepEvent.p.x]
    ], {color: 'red', weight: 5}).addTo(lines)

    if (segment.segmentAbove !== null) {
        L.polyline([
            [segment.segmentAbove.leftSweepEvent.p.y, segment.segmentAbove.leftSweepEvent.p.x],
            [segment.segmentAbove.rightSweepEvent.p.y, segment.segmentAbove.rightSweepEvent.p.x]
        ], {color: 'green'}).addTo(lines)
    }

    if (segment.segmentBelow !== null) {
        L.polyline([
            [segment.segmentBelow.leftSweepEvent.p.y, segment.segmentBelow.leftSweepEvent.p.x],
            [segment.segmentBelow.rightSweepEvent.p.y, segment.segmentBelow.rightSweepEvent.p.x]
        ], {color: 'purple'}).addTo(lines)
    }


    debugger

    eLayer.remove()
    lines.clearLayers()
}

export function debugSweepline (event, sweepLine) {
    if (process.env.NODE_ENV !== 'development') return
    const map = window.map

    const eLayer = L.circleMarker([event.y, event.x]).addTo(map)

    const lines = L.layerGroup([]).addTo(map)

    const b = map.getBounds()
    const sl = L.polyline([
        [b.getNorth(), event.x],
        [b.getSouth(), event.x]
    ], {color: 'grey', weight: 1}).addTo(lines);

    let labelList = ''
    const sw = sweepLine.keys().reverse()
    sw.forEach(function (seg) {
        L.polyline([[seg.leftSweepEvent.p.y, seg.leftSweepEvent.p.x], [seg.rightSweepEvent.p.y, seg.rightSweepEvent.p.x]]).bindTooltip(seg.label, { permanent: true, direction: 'left' }).addTo(lines)
        labelList = labelList.concat(`${seg.label}\n`)
    })
    sl.bindTooltip(labelList, { permanent: true, direction: 'left' })

    debugger

    eLayer.remove()
    lines.clearLayers()
}
