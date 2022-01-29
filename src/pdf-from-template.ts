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

interface Margin {
    top?: string | number;
    right?: string | number;
    bottom?: string | number;
    left?: string | number;
}

// https://github.com/puppeteer/puppeteer/blob/v13.1.2/docs/api.md#pagepdfoptions
interface PdfOptions {
    scale?: number;
    format?:
        | "letter"
        | "legal"
        | "tabloid"
        | "ledger"
        | "a0"
        | "a1"
        | "a2"
        | "a3"
        | "a4"
        | "a5"
        | "a6"; // default: A4
    margin?: Margin; // default: none
    width?: string | number; //
    height?: string | number;
    displayHeaderFooter?: boolean;
    headerTemplate?: string;
    footerTemplate?: string;
    pageRanges?: string;
    landscape?: boolean;
    printBackground?: boolean;
    omitBackground?: boolean;
    preferCSSPageSize?: boolean;
    timeout?: number; // default: 30, disable: 0
}

export async function pdfFromTemplate(
    template: string,
    data: Object,
    fileName: string,
    outDir: string,
    pdfOptions?: PdfOptions,
): Promise<Buffer> {
    // create a browser instance
    const browser = await puppeteer.launch();
    // new page
    const page = await browser.newPage();

    // convert external css to inline (inline-css)
    const formattedHTML = await inlineCss(template, { url: "/" });

    // compile the template with handlebars to insert values into the template
    // template guide: https://handlebarsjs.com/guide/
    let compiledTemplate = handlebars.compile(formattedHTML, { strict: true })(
        data,
    );

    // set page content and wait for it to load completely
    await page.setContent(compiledTemplate, {
        waitUntil: "networkidle0",
    });

    // check if path exists
    if (!fs.existsSync(path.resolve(outDir, fileName))) {
        fs.mkdirSync(path.resolve(outDir), { recursive: true });
    }

    // convert the page to pdf
    const promiseBuffer = await page.pdf({
        path: path.resolve(outDir, fileName),
        format: "a4",
        ...pdfOptions,
    });

    // close the browser
    await browser.close();

    // return the buffer
    return promiseBuffer;
}
