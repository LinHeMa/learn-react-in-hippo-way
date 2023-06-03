const ReactX = (() => {
	// 第二次嘗試把let宣告在外面這樣才不會每次執行的時候都重新宣告
	// if we don't use [], we can only use one value in one component and that not what we want
	let state = []
	let index = 0
	const useState = (initialValue) => {
		// create state
		// if state === undefined , we shoud give it initialValue otherwise we use the value already exists
		// 創在local 才能夠確保state儲存在正確的index，這也就是為什麼hooks 不可以使用在for loop || condition，不然會導致index錯誤
		const localIndex = index
		index++
		if (!state[localIndex]) state[localIndex] = initialValue
		// create setterFn
		const setterFunction = (newValue) => {
			state[localIndex] = newValue
		}
		return [state[localIndex], setterFunction]
	}
	// when re-render the index will reset 
	const resetIndex = () => { index = 0 }

	return { useState, resetIndex }
})()

const { useState, resetIndex } = ReactX
const Component = () => {
	const [counter, setCounter] = useState(1)
	const [color, setColor] = useState('red')
	console.log('counter value=', counter)
	console.log('color value=', color)
	if (counter !== 2) {
		setCounter(2)
	}
	if (color !== 'blue') {
		console.log('setColor')
		setColor('blue')
	}
}


// mock the re-render
Component()
resetIndex()
Component()
