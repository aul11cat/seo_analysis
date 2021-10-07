const rewrite = require('rewire');
const analyzeServiceRw = rewrite('../service/analyzeService');
const analyzeService = require('../service/analyzeService');


test('test isWebsite ', () => {
    const isWebsite_spy = analyzeServiceRw.__get__('isWebsite');
    expect(isWebsite_spy("")).toBe(false);
    expect(isWebsite_spy("https")).toBe(true);
})

jest.mock('html-to-json', () => {
    return {
        parse: jest.fn((p1, p2, p3) => `parse`),
        request: jest.fn((p1, p2, p3) => `request`),
    }
})

test('test documentImgNoAltCount', () => {
    const html = `<!DOCTYPE html><html><head><title>Analyze Page</title><link rel="stylesheet" href="/stylesheets/style.css"><script src="/javascripts/jquery-3.6.0.min.js"></script></head><body><h1>Analyze Page</h1><section><h2>若有上傳檔案，系統只處理上傳的檔案</h2><form id="form" method="post" enctype="multipart/form-data"><div><input id="file" type="file" name="file" accept=".html"></div><div><textarea name="text" placeholder="可填入網址需http開頭或是html內容" style="width:500px;height:300px"></textarea></div><div><button type="reset">清空</button><button id="submit">送出</button></div></form></section><hr><section style="display:none" id="result"><div id="title"><h3>title</h3><span id="title_result"></span><span id="title_text"></span></div><div id="meta"><h3>meta</h3><span id="meta_result"></span><span id="meta_text"></span></div><div id="img"><h3>img</h3><span id="img_result"></span><span id="img_text"></span></div></section></body></html>`;
    const http = `https://google.com`;
    expect(analyzeService.documentImgNoAltCount(html)).toBe(`parse`)
    expect(analyzeService.documentImgNoAltCount(http)).toBe(`request`)
})



