/*
Author: chankruze (chankruze@geekofia.in)
Created: Thu Jan 27 2022 22:31:21 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"

const puppeteer = require("puppeteer");
const inlineCss = require("inline-css");
const handlebars = require("handlebars");
const path = require("path");
const fs = require("fs");

export async function pdfFromHtml(
    content: string,
    fileName: string,
    outDir: string,
): Promise<Buffer> {
    // create a browser instance
    const browser = await puppeteer.launch();
    // new page
    const page = await browser.newPage();

    // TODO: validate HTML

    // convert external css to inline (inline-css)
    const formattedHTML = await inlineCss(content, { url: "/" });

    // compile the template with handlebars
    // TODO: insert values to variables in the template
    // (https://handlebarsjs.com/guide/#installation)
    const template = handlebars.compile(formattedHTML, { strict: true })();

    // set page content and wait for it to load completely
    await page.setContent(template, {
        waitUntil: "networkidle0",
    });

    // TODO: check if path exists
    if (!fs.existsSync(path.resolve(outDir, fileName))) {
        fs.mkdirSync(path.resolve(outDir), { recursive: true });
    }

    // convert the page to pdf
    const promiseBuffer = await page.pdf({
        path: path.resolve(outDir, fileName),
        format: "a4",
    });

    // close the browser
    await browser.close();

    // return the buffer
    return promiseBuffer;
}
