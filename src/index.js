import { join, extname } from "path";
import cons from "./consolidate";

const env = process.env.NODE_ENV || 'development';

export default (dir, opts = {}) => {

    // default extname
    const ext = opts.ext || opts.default || 'jade';

    // engine map
    const map = opts.map || { jade: 'jade', js: 'react' };

    // cache compiled templates
    let cache = opts.cache;
    if (null == cache) cache = 'development' != env;

    return (path, locals = {}) => {

        // default extname
        let e = extname(path);

        if (!e) {
            e = '.' + ext;
            path += e;
        }

        // remove leading '.'
        e = e.slice(1);

        // map engine
        const engine = map[e] || e;

        // resolve
        path = join(dir, path);

        locals.cache = cache;
        return cons[engine](path, locals)
    }
}
