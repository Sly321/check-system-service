import { pathExistsSync, existsSync, readFileSync } from "fs-extra"
import { resolve } from "path"
import { paths } from "./paths"
import { ModuleNotFoundError } from "./moduleNotFoundError"
import yaml from "js-yaml"
import { YamlParsingError } from "./yamlParsingError"


export async function loadModule(name: string) {
	const modulePath = resolve(paths.modules, name);

	if (pathExistsSync(modulePath)) {
		const config = getConfig(modulePath)

		return {
			...config
		}
	} else {
		throw new ModuleNotFoundError(modulePath)
	}
}

const configName = "config"

function getConfig(path: string) {
	return getYamlConfig(path)
}

function getYamlConfig(path: string) {
	try {
		if (existsSync(resolve(path, `${configName}.yml`))) {
			return yaml.safeLoad(readFileSync(resolve(path, `${configName}.yml`), "utf8"))
		}
		
		if (existsSync(resolve(path, `${configName}.yaml`))) {
			return yaml.safeLoad(readFileSync(resolve(path, `${configName}.yaml`), "utf8"))
		}
	} catch(e) {
		throw new YamlParsingError()
	}

	return false
}