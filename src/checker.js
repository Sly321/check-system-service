'use strict';

const React = require('react');
const { loadModule } = require("./utils/loadModule");
const { render, Color } = require('ink');

function Counter() {
	let [counter, setCounter] = React.useState(0)
	let [moduleState, setModuleState] = React.useState("loading...")

	
	React.useLayoutEffect(() => {
		const timer = setInterval(() => {
			setCounter(counter++)
		}, 100);

		(async function() {
			try {
				const mod = await loadModule("is-google-down-examples")
				setModuleState(mod)
			} catch(e) {
				setModuleState(e.message)
			}
		})()

		return () => clearInterval(timer);
	}, [])

	return (
		<React.Fragment>
			<Color green>
				{counter} tests passed
			</Color>
			{typeof moduleState === "boolean" ? `Module${moduleState ? "" : "not"} exists` : moduleState}
		</React.Fragment>
	)
}

render(<Counter/>);