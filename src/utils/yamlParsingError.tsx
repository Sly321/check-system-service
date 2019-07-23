import React, { ReactNode } from "react"
import { Color } from "ink"
import { JsxAble } from "./jsxAble"

export class YamlParsingError extends Error implements JsxAble {
	constructor() {
		super()
	}

	public get jsx(): ReactNode {
		return <React.Fragment>
			<Color red>YamlParsingError:</Color> TODO
		</React.Fragment>
	}

	public get message() {
		return `YamlParsingError: TODO`
	}
}