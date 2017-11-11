const fs = require('fs-extra');
const test = require('tape');
const glob = require('glob');
const path = require('path');
const load = require('load-json-file');
const write = require('write-json-file');
const ellipse = require('.');

test('turf-ellipse', t => {
    glob.sync(path.join(__dirname, 'test', 'in', '*.json')).forEach(filepath => {
        const {name} = path.parse(filepath);
        const geojson = load.sync(filepath);
        const xAxis = geojson.properties.xAxis;
        const yAxis = geojson.properties.yAxis;
        const steps = geojson.properties.steps;
        const results = ellipse(geojson, xAxis, yAxis, {steps: steps});

        const out = filepath.replace(path.join('test', 'in'), path.join('test', 'out'))
        if (process.env.REGEN) write.sync(out, results);
        t.deepEqual(results, load.sync(out), name);
    });
    t.end();
});
