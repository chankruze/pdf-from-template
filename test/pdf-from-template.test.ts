/*
Author: chankruze (chankruze@geekofia.in)
Created: Thu Jan 27 2022 22:31:09 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import { pdfFromTemplate } from "../src/pdf-from-template";
import * as path from "path";
import * as fs from "fs";
import { PDFOptions } from "puppeteer";
import * as moment from "moment";

/**
 * Basic tests for the PdfFromTemplate class.
 */

describe("Basic test:", () => {
    it("checks the instance of pdfFromTemplate", () => {
        expect(pdfFromTemplate).toBeInstanceOf(Function);
    });
});

describe("Tests for pdfFromTemplate():", () => {
    jest.setTimeout(15000);

    // sample template
    const template = fs.readFileSync(
        path.resolve(__dirname, "template.hbs"),
        "utf8",
    );

    // sample data
    const data = {
        logo: "https://www.sparksuite.com/images/logo.png",
        invoiceId: Math.floor(Date.now() / 100000),
        invoiceCreationDate: moment(new Date()).format("LL"),
        invoiceDueDate: moment(new Date()).add(10, "days").format("LL"),
    };

    const outDir = "./out";
    const fileName = `pdf_${data.invoiceId}.pdf`;

    const options: PDFOptions = {};

    const pdfFromTemplateCreate = pdfFromTemplate(
        template,
        data,
        fileName,
        outDir,
        options,
    );

    it("does not returns null", () => {
        expect(pdfFromTemplateCreate).not.toBeNull();
    });

    it("returns a Promise", () => {
        expect(pdfFromTemplateCreate).toBeInstanceOf(Promise);
    });

    it("resolves to a Buffer", () => {
        expect.assertions(1);
        return pdfFromTemplateCreate.then((data) =>
            expect(data).toBeInstanceOf(Buffer),
        );
    });

    it(`it creates ${fileName} at ${path.resolve(outDir, fileName)}`, () => {
        expect(fs.existsSync(path.resolve(outDir, fileName))).toBeTruthy();
    });
});
