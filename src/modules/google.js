function wait(ms) {
	return new Promise(res => {
		setTimeout(res, ms)
	})
}

const checker = async function() {
	await wait(1000)
	return true
}

module.exports = checker