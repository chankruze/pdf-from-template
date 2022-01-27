/*
Author: chankruze (chankruze@geekofia.in)
Created: Thu Jan 27 2022 22:31:09 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import { pdfFromHtml } from "../src/pdffromhtml";
import * as path from "path";
import * as fs from "fs";

/**
 * Basic tests for the PdfFromHtml class.
 */

describe("Basic test:", () => {
    it("checks the instance of pdfFromHtml", () => {
        expect(pdfFromHtml).toBeInstanceOf(Function);
    });
});

describe("Tests for pdfFromHtml():", () => {
    const content = "<h1>This is a Heading!</h1>";
    const outDir = "./test/out/v2";
    const fileName = `pdf_${Date.now()}.pdf`;
    const pdfFromHtmlCreate = pdfFromHtml(content, fileName, outDir);

    it("does not returns null", () => {
        expect(pdfFromHtmlCreate).not.toBeNull();
    });

    it("returns a Promise", () => {
        expect(pdfFromHtmlCreate).toBeInstanceOf(Promise);
    });

    it("resolves to a Buffer", () => {
        expect.assertions(1);
        return pdfFromHtmlCreate.then(data =>
            expect(data).toBeInstanceOf(Buffer),
        );
    });

    it(`it creates ${fileName} at ${path.resolve(outDir, fileName)}`, () => {
        expect(fs.existsSync(path.resolve(outDir, fileName))).toBeTruthy();
    });
});
