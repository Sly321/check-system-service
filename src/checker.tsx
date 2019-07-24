import { Box, Color, render } from "ink"
import React, { useEffect, useState } from "react"
import { isJsxAble, JsxAble } from "./utils/jsxAble"
import { loadModule } from "./utils/loadModule"
import Check from "./components/check"
import Loading from "./components/loading"

function Counter() {
	let [counter, setCounter] = useState(0)
	let [moduleState, setModuleState] = useState<any>(null)
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

	if (moduleState) {
		return (<React.Fragment>
			<Box>
				<Color green>
					{counter} tests passed
				</Color>
			</Box>
			<Box><Check /> Module loaded: {moduleState.name}</Box>
			<Box>
				Prepare to executing steps:
			</Box>
			<Box paddingLeft={2}>
				{moduleState.steps.map((step: string) => `- ${step}`)}
			</Box>
			<Execute bla={moduleState.steps} />
		</React.Fragment>
		)
	}

	return <Box>loading...</Box>
}

function Execute({ bla }: { bla: Array<string>}) {
	return <>{bla.map(b => <Box><Loading /> {b}</Box>)}</>
}

render(<Counter/>);