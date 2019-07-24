/// <reference types="../types" />

import React from "react"
import Spinner from 'ink-spinner'

export interface Props {
}

export default function Loading({ }: Props) {
	return <Spinner type="dots"/>
}