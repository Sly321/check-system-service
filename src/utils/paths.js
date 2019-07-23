const { resolve } = require("path")

const src = resolve(__dirname, "..")

const paths = {
	modules: resolve(src, "modules")
}

module.exports = { paths }