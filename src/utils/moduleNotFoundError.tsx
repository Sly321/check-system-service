import React, { ReactNode } from "react"
import { Color } from "ink"
import { JsxAble } from "./jsxAble"

export class ModuleNotFoundError extends Error implements JsxAble {
	constructor(private path: string) {
		super()
	}

	public get jsx(): ReactNode {
		return <React.Fragment>
			<Color red>ModuleNotFoundError:</Color> the module <Color redBright>"{this.path}"</Color> seems not to exist
		</React.Fragment>
	}

	public get message() {
		return `ModuleNotFoundError: the module ${this.path} seems not to exist`
	}
}