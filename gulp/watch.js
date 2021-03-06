const { input } = require('./_config')
const { watch, series } = require('gulp')
const { reload } = require('./browser-sync')

const { src: sassSrc, default: sass } = require('./sass')
const { src: imgSrc, default: images } = require('./images')
const { src: jsSrc } = require('./scripts')
const eleventy = require('./eleventy')

const watcher = cb => {
  watch(sassSrc, series(sass, reload))
  watch(imgSrc, series(images, reload))
  watch(jsSrc, reload)

  // Eleventy files
  watch([
    'eleventy/**/*',
    `${input}/**/*`,
    `!${sassSrc}`,
    `!${jsSrc}`
  ], series(eleventy, reload))
}

module.exports = watcher
