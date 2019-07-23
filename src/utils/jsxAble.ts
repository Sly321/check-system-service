import { ReactNode } from "react"

export interface JsxAble {
	jsx: ReactNode
}

export function isJsxAble(error: any): error is JsxAble {
	if (error.jsx) {
		return true
	}
	return false
}