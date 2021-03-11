const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

const columnCount = 2;
const outPath = path.join(__dirname, '..', 'src', 'app', 'govmap', 'layers.ts');

async function getData() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://api.govmap.gov.il');
    const data = await page.$$eval('table', (tables, columnCount) => {
        const table = tables.find(table => {
            const ths = table.getElementsByTagName('th');
            if (!ths || ths.length === 0) {
                return false;
            }
            return ths[0].innerText === 'מזהה שכבה';
        });
        if (!table) {
            return null;
        }

        const tds = table.getElementsByTagName('td');
        const texts = [...tds].map(td => td.innerText);
        const arrs = [];
        for (let i = 0; i < texts.length; ++i) {
            const text = texts[i];
            if (i % columnCount === 0) {
                arrs.push([text]);
            } else {
                arrs[arrs.length - 1].push(text);
            }
        }
        return arrs;
    }, columnCount);
    await browser.close();
    return data;
}

(async() => {
    const data = await getData();
    const stringify = () => {
        let str = '[';
        str += data.map(entry => {
            return `{\n  key: '${entry[0]}',\n  name: '${entry[1]}'\n}`;
        }).join(', ');
        str += ']';
        return str;
    };
    await fs.promises.writeFile(outPath, `export type LayerName = ${data.map(entry => `'${entry[0]}'`).join(' |\n  ')};\n\nconst layers: {key: LayerName; name: string; }[] = ${stringify()};\n\nexport default layers;\n`);
})().catch(err => console.log(err));
