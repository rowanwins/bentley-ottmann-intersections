export function checkWhichEventIsLeft (e1, e2) {
    if (e1.p.x > e2.p.x) return 1;
    if (e1.p.x < e2.p.x) return -1;

    if (e1.p.y !== e2.p.y) return e1.p.y > e2.p.y ? 1 : -1;
    return 1
}
