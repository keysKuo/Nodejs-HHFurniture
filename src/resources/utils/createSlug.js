const slugify = require('slugify');

const createSlug = (name, options) => {
    return slugify(name, {
        replacement: '-',
        remove: options.remove || false,
        lower: options.remove || true,
        strict: options.strict || false,
        locale: options.locale || 'vi',
        trim: options.trim || true,
    })
}

module.exports = createSlug;