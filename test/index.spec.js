import test from "ava";
import views from "../src/index";

const locals = { name: 'John' };
const html = '<p>John</p>';

// misc
test('throws error if path not found', (t) => {
    const render = views(__dirname, { default: 'jade' });
    try {
        render('no-such-file')
    } catch (error) {
        t.true(error.message.includes('no such file'));
    }
});

test('should merge opts.locals', (t) => {
    const render = views(__dirname + '/fixtures/jade', { default: 'jade', locals });
    t.is(render('user', locals), html);
});

test('path can contain ext', (t) => {
    const render = views(__dirname + '/fixtures', { map: { js: 'react', jade: 'jade' } });
    t.is(render('jade/user.jade', locals), html);
    t.is(render('react/user.js', locals), html);
});

test('should have default map', (t) => {
    const render = views(__dirname + '/fixtures/react', { default: 'js' });
    t.is(render('user', locals), html);
});


// Jade
test('renders jade template', (t) => {
    const render = views(__dirname + '/fixtures/jade', { default: 'jade' });
    t.is(render('user', locals), html);
});


// React
test('renders react static template', (t) => {
    const render = views(__dirname + '/fixtures/react', { ext: 'js', map: { js: 'react' } });
    t.is(render('user', locals), html);
});

test('renders react non static template', (t) => {
    const render = views(__dirname + '/fixtures/react', { ext: 'js', map: { js: 'react' } });
    t.true(render('user', Object.assign(locals, { isNonStatic: true })).includes('data-react-checksum'));
});

// Redux
test('renders react redux', (t) => {
    const Redux = require('redux');
    const store = Redux.createStore(() => locals);
    const render = views(__dirname + '/fixtures/redux', { ext: 'js', map: { js: 'redux' } });
    t.true(render('user', { store }).includes(locals.name));
});



