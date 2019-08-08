import test from 'ava';
import Point from '../src/Point';

test('Point has correct properties', function (t) {
    const p1 = new Point([0, 1]);
    t.is(p1.x, 0);
    t.is(p1.y, 1);
});


test('Event can check against other event for duplicate points', function (t) {
    const p1 = new Point([0, 1]);
    const p2 = new Point([0, 1]);

    t.is(p1.isSamePoint(p2), true)
})
