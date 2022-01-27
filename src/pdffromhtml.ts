/*
Author: chankruze (chankruze@geekofia.in)
Created: Thu Jan 27 2022 22:31:21 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"

export default class PdfFromHtml {
	// constructor
	constructor() {
		// empty
	}

	// create pdf from html
	public async create(html: string, fileName: string): Promise<Buffer> {
		// return promise
		return new Promise((resolve, reject) => {
			try {
				resolve(Buffer.from('OK'))
			} catch (err) {
				reject(err)
			}
		})
	}
}
