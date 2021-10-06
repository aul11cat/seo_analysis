const htmlToJson = require('html-to-json');

const errorHandle = (err, result) => {
    console.log(result)
}
const isWebsite = (string) => {
    const regx = RegExp(/^http.*/)
    return regx.test(string.trim())
}


// 檢查標題是否存在
exports.documentTitleIsExist = (html = ``) => {

    const handle = function($doc) {
        return $doc.find('title').length !== 0;
    }

    if (isWebsite(html)) {
        return htmlToJson.request(html, handle, errorHandle);
    }

    return htmlToJson.parse(html, handle, errorHandle);
}

// 檢查Meta description是否存在
exports.documentMetaDescriptionIsExist = (html) => {
    const handle = function ($doc) {
        return $doc.find('meta[name=description]').length !== 0;
    }

    if (isWebsite(html)) {
        return htmlToJson.request(html, handle, errorHandle);
    }

    return htmlToJson.parse(html, handle, errorHandle);
}

// 檢查多少有圖片 及 有多少圖沒有alt
exports.documentImgNoAltCount = (html) => {
    const handle = function ($doc) {
        const images = $doc.find('img');
        let noAlt = 0, total = 0;
        if (images) {
            total = images.length;
            Object.keys(images).forEach((i, index) => {
                if (index < total) {
                    if (images[index].attribs) {
                        if (images[i].attribs.alt.length === 0) {
                            noAlt++;
                        }
                    }
                }
            })
        }

        return {total, noAlt};
    }

    if (isWebsite(html)) {
        return htmlToJson.request(html, handle, errorHandle);
    }

    return htmlToJson.parse(html, handle, errorHandle);
}
