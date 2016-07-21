function polyfillRequire(name) {
    const engine = require(name);
    return engine.default || engine;
}

function jade(path, options) {
    const engine = require('jade');
    options.cache = !!options.cache;
    const template = engine.compileFile(path, options);
    return template(options)
}

function react(path, options) {
    const React = require('react');
    const ReactDOMServer = require('react-dom/server');
    const component = polyfillRequire(path);

    const isNonStatic = options.isNonStatic;
    delete options.isNonStatic;

    if (isNonStatic) {
        return ReactDOMServer.renderToString(React.createElement(component, options));
    }

    return ReactDOMServer.renderToStaticMarkup(React.createElement(component, options));
}

function redux(path, options) {
    const store = options.store;
    delete options.store;
    if (!store) return react(path, options);

    const React = require('react');
    const ReactDOMServer = require('react-dom/server');
    const component = polyfillRequire(path);
    const ReactRedux = require('react-redux');

    return ReactDOMServer.renderToString(React.createElement(ReactRedux.Provider, { store }, React.createElement(component, options)));
}

export default {
    jade,
    react,
    redux
}
