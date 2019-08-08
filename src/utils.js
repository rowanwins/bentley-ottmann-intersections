export function signedArea(p0, p1, p2) {
    return (p0.p.x - p2.p.x) * (p1.p.y - p2.p.y) - (p1.p.x - p2.p.x) * (p0.p.y - p2.p.y);
}

export function areCoordsSame (p1, p2) {
    return Math.abs(p1 - p2) < Number.EPSILON
}
