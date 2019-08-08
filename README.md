# bentley-ottmann-simplify
A small module using the Bentley-Ottmann algorithm to decompose a complex polygon with self-intersections into simple pieces

## Install
````
npm install bentley-ottmann-simplify
````

## Documentation
Valid inputs: Geojson `Polygon`, `MultiPolygon`

````js
    const simplify = require('bentley-ottmann-simplify')

    const box = {type: 'Polygon', coordinates: [[[0, 0], [1, 0], [1, 1], [0, 1], [0, 0]]]}
    simplify(box)
    // returns intersection points and simplified contours
    // => {
    //     intersections: Array of points,
    //     simpleContours: Array of simple contours
    // }

````

## Benchmarks
[simplepolygon](https://github.com/mclaeysb/simplepolygon) is the only other js library that I'm aware of that has tackled this issue (TurfJS uses it under the hood). For some reason it's performance is very slow.
````
// Switzerland with kinks
// simplePolygon x 22 ops/sec ±2.53% (41 runs sampled)
// bentleyOttmann x 2,148 ops/sec ±1.21% (90 runs sampled)
// - Fastest is bentleyOttmann

// Simple Case
// simplePolygon x 40,095 ops/sec ±2.69% (86 runs sampled)
// bentleyOttmann x 282,728 ops/sec ±1.84% (90 runs sampled)
````

## Further Reading
[Geom algorithms website](http://geomalgorithms.com/a09-_intersect-3.html#Bentley-Ottmann-Algorithm)

