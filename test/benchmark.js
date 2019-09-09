const path = require('path')
const Benchmark = require('benchmark')
const bentleyOttmann = require('../dist/bentleyOttmann.js')
const gpsi = require('geojson-polygon-self-intersections')
const isects = require('2d-polygon-self-intersections')
const loadJsonFile = require('load-json-file')

const regression = loadJsonFile.sync(path.join(__dirname, 'fixtures', 'notSimple', 'regression1.geojson'))
const switzerland = loadJsonFile.sync(path.join(__dirname, 'fixtures', 'notSimple', 'switzerlandKinked.geojson'))

const options = {
    onStart () { console.log(this.name) },
    onError (event) { console.log(event.target.error) },
    onCycle (event) { console.log(String(event.target)) },
    onComplete () {
        console.log(`- Fastest is ${this.filter('fastest').map('name')}`)
    }
}

// Switzerland
// gpsi x 36.78 ops/sec ±2.03% (49 runs sampled)
// bentleyOttmann x 2,047 ops/sec ±1.79% (89 runs sampled)
// isects x 14.22 ops/sec ±1.73% (40 runs sampled)
// - Fastest is bentleyOttmann
const suite = new Benchmark.Suite('Switzerland', options)
suite
    .add('gpsi', function () {
        gpsi(switzerland)
    })
    .add('bentleyOttmann', function () {
        bentleyOttmann(switzerland)
    })
    .add('isects', function () {
        isects(switzerland.geometry.coordinates[0])
    })
    .run()


// Simple Case
// gpsi x 246,005 ops/sec ±1.54% (90 runs sampled)
// bentleyOttmann x 535,293 ops/sec ±1.73% (95 runs sampled)
// - Fastest is bentleyOttmann
const suite2 = new Benchmark.Suite('Simple Case', options)
suite2
    .add('gpsi', function () {
        gpsi(regression)
    })
    .add('bentleyOttmann', function () {
        bentleyOttmann(regression)
    })
    .run()

