/*
Author: chankruze (chankruze@geekofia.in)
Created: Thu Jan 27 2022 22:31:09 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import PdfFromHtml from "../src/pdffromhtml";

/**
 * Basic tests for the PdfFromHtml class.
 */

it("checks the instance of Function", () => {
    expect(PdfFromHtml).toBeInstanceOf(Function);
});

describe("PdfFromHtml.create()", () => {
    const content = "<p>test</p>";
    const fileName = "test.pdf";
    const pdfFromHtmlCreate = PdfFromHtml(content, fileName);

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
});
