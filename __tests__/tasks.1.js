const puppeteer = require("puppeteer");
const path = require('path');

let browser;
let page;

beforeAll(async () => {
    browser = await puppeteer.launch({headless: true});
    page = await browser.newPage();
    await page.goto('file://' + path.resolve('./index.html'));
}, 30000);

afterAll((done) => {
    try {
        this.puppeteer.close();
    } catch (e) { }
    done();
});

describe('Google fonts', () => { 
    it("A `sans-serif` google font should be imported using html link tag", async () => {
        const googleFont = await page.$eval('link[href*="fonts.googleapis.com"]', el => el.href);
        expect(googleFont).toBeTruthy();
    });
 })
describe(`main`, () => { 
    it("Elements in the `main` tag should use a `sans-serif` font with fallback fonts specified", async () => {
        const font = await page.$eval('main', el => getComputedStyle(el).fontFamily);
        expect(font).toContain('sans-serif');
        const fallbackFonts = font.split(',').length;
        expect(fallbackFonts).toBeGreaterThan(2);
    });
});
describe(`.code`, () => {
    it("`.code` should use `Monospace` font, with fallback fonts specified", async () => {
        const font = await page.$eval('.code', el => getComputedStyle(el).fontFamily);
        expect(font).toContain('monospace');
        const fallbackFonts = font.split(',').length;
        expect(fallbackFonts).toBeGreaterThan(2);
    });
});
