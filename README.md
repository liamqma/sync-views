# sync-views

  Template rendering consolidation library. This module is a fork of [co-views](https://github.com/tj/co-views).
  You probably should use [co-views](https://github.com/tj/co-views) except you have to render templates synchronously.
  To use `React`, both `react` and `react-dom` need to be installed. Also react component needs to be transpiled beforehand.

## Supported template engines
  - [react](https://github.com/facebook/react)
  - [jade](https://github.com/visionmedia/jade) [(website)](http://jade-lang.com/)

## Installation

```
$ npm install sync-views
```

 And install whichever engine(s) you use:

```
$ npm install react react-dom jade
```

## Options

 - `map` an object mapping extension names to engine names [`{}`]
 - `default` default extension name to use when missing [`html`]
 - `cache` cached compiled functions [NODE_ENV != 'development']

### map

  For example if you wanted to use "react" for .js files
  you would simply pass:

```js
{ map: { js: 'react' } }
```

### default

  Set the default template extension when none is passed to
  the render function. This defaults to "jade". For example
  if you mostly use Jade, then you'd likely want to assign
  this to:

```js
{ default: 'jade' }
```

  Allowing you to invoke `render('user')` instead of
  `render('user.jade')`.

### cache

  When __true__ compiled template functions will be cached in-memory,
  this prevents subsequent disk i/o, as well as the additional compilation
  step that most template engines perform. By default this is _enabled_
  when the __NODE_ENV__ environment variable is anything _but_ "development",
  such as "stage" or "production".

## Example

  Render several users with different template engines in parallel. View
  lookup is performed relative to the `./examples` directory passed,
  and the "react" engine is mapped to ".js" files.

```js
var views = require('sync-views');

var render = views('examples', {
  map: { js: 'react' }
});

var html = render('user', { user: tobi });
console.log(html);
```

## App-wide views

  Dependending on your choice of application structure, you may wish to
  share these same settings between all of your application, instead of
  constantly initializing co-views. To do this simply create a `views.js`
  module and export the render function returned:

```js
var views = require('sync-views');

module.exports = views('views', {
  map: {
    js: 'react',
  }
});
```