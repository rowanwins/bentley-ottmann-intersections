const path = require('path')
const Benchmark = require('benchmark')
const bentleyOttmann = require('../dist/bentleyOttmann.js')
const simplePolygon = require('simplepolygon')
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
// simplePolygon x 22.21 ops/sec ±2.53% (41 runs sampled)
// bentleyOttmann x 2,148 ops/sec ±1.21% (90 runs sampled)
// - Fastest is bentleyOttmann
const suite = new Benchmark.Suite('Switzerland', options)
suite
    .add('simplePolygon', function () {
        simplePolygon(switzerland)
    })
    .add('bentleyOttmann', function () {
        bentleyOttmann(switzerland)
    })
    .run()

// Simple Case
// simplePolygon x 40,095 ops/sec ±2.69% (86 runs sampled)
// bentleyOttmann x 282,728 ops/sec ±1.84% (90 runs sampled)
// - Fastest is bentleyOttmann
const suite2 = new Benchmark.Suite('Simple Case', options)
suite2
    .add('simplePolygon', function () {
        simplePolygon(regression)
    })
    .add('bentleyOttmann', function () {
        bentleyOttmann(regression)
    })
    .run()

