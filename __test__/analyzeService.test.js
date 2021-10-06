const rewrite = require('rewire');
const analyzeServiceFake = rewrite('../service/analyzeService');


test('valid isWebsite ', () => {
    const isWebsite_spy = analyzeServiceFake.__get__('isWebsite');
    expect(isWebsite_spy("")).toBe(false);
    expect(isWebsite_spy("https")).toBe(true);
})
