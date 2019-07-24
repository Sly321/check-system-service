function wait(ms: number) {
	return new Promise(res => {
		setTimeout(res, ms)
	})
}

export default async function() {
	await wait(1000)
	return true
}