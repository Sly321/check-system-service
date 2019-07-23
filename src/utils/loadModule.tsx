import { pathExistsSync } from "fs-extra"
import { resolve } from "path"
import { paths } from "./paths"
import { ModuleNotFoundError } from "./moduleNotFoundError"


export async function loadModule(name: string) {
	const modulePath = resolve(paths.modules, name);

	if (pathExistsSync(modulePath)) {
		return {
			
		}
	} else {
		throw new ModuleNotFoundError(modulePath)
	}
}