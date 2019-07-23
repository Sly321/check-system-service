import { Box, Color, render } from "ink"
import React, { useEffect, useState } from "react"
import { isJsxAble, JsxAble } from "./utils/jsxAble"
import { loadModule } from "./utils/loadModule"
import Check from "./components/check"

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
				const mod = await loadModule("is-google-down-example")
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

	return (<React.Fragment>
		<Box>
			<Color green>
				{counter} tests passed
			</Color>
		</Box>
		<Box><Check /> Module loaded</Box>
		<Box>
			{typeof moduleState === "boolean" ? `Module${moduleState ? "" : "not"} exists` : JSON.stringify(moduleState, null, 2)}
		</Box>
	</React.Fragment>
	)
}

render(<Counter/>);