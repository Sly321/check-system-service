const React = require('react');
const { Color } = require('ink');

const { pathExistsSync } = require("fs-extra");
const { resolve } = require("path");
const { paths } = require("./paths");

class ModuleNotFoundError extends Error {
	constructor(path) {
		super()
		this.path = path
	}

	message() {
		return <React.Fragment>
			<Color red>ModuleNotFoundError:</Color> the module <Color redBright>"{this.path}"</Color> seems not to exist
		</React.Fragment>
	}
}

async function loadModule(name) {
	const modulePath = resolve(paths.modules, name);

	if (pathExistsSync(modulePath)) {
		return true
	} else {
		throw new ModuleNotFoundError(modulePath)
	}
}

module.exports = { loadModule };