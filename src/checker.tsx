import React, { FC, useEffect, useState } from "react"
import { render, Color, Box } from "ink"
import { loadModule } from "./utils/loadModule"
import { JsxAble, isJsxAble } from "./utils/jsxAble"

function Counter() {
	let [counter, setCounter] = useState(0)
	let [moduleState, setModuleState] = useState<any>("loading...")
	let [error, setError] = useState<null | JsxAble | Error>()
	
	// useModule or something 
	useEffect(() => {
		const timer = setInterval(() => {
			setCounter(counter++)
		}, 100);

		(async function() {
			try {
				const mod = await loadModule("is-google-down-examples")
				setModuleState(mod)
			} catch(e) {
				setError(e)
			}
		})()

		return () => clearInterval(timer);
	}, [])

	// component candidate
	if (error) {
		if (isJsxAble(error)) {
			return <Box>{error.jsx}</Box>
		}
		return <React.Fragment>
			<Box>
				<Color red>uknown error appeared in the application! 😱</Color>
			</Box>
			<Box paddingLeft={2}>
				{error.message}
			</Box>
		</React.Fragment>
	}

	return (
		<Box>
			<Color green>
				{counter} tests passed
			</Color>
			{typeof moduleState === "boolean" ? `Module${moduleState ? "" : "not"} exists` : moduleState}
		</Box>
	)
}

render(<Counter/>);