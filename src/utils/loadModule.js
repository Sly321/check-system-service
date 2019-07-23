const { pathExistsSync } = require("fs-extra");
const { resolve } = require("path");
const { paths } = require("./paths");

class ModuleNotFoundError extends Error {
}

async function loadModule(name) {
	const modulePath = resolve(paths.modules, name);

	if (pathExistsSync(modulePath)) {
		return true
	} else {
		throw new ModuleNotFoundError(`The module "${modulePath}" seems not to exist.`)
	}
}

module.exports = { loadModule };