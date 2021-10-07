const htmlToJson = require('html-to-json');

const errorHandle = (err, result) => {
    console.log(result)
}

/**
 * 判斷是否為網址
 * @param string
 * @returns {boolean}
 */
const isWebsite = (string) => {
    const regx = RegExp(/^http.*/)
    return regx.test(string.trim())
}

/**
 * 回傳處理方式
 * @param html
 * @param handle
 * @param errorHandle
 */
const htmlToJsonHandleWay = (html, handle, errorHandle) => {
    if (isWebsite(html)) {
        return htmlToJson.request(html, handle, errorHandle);
    }

    return htmlToJson.parse(html, handle, errorHandle);
}

/**
 * 檢查標題是否存在
 * @param html
 * @returns {boolean}
 */
exports.documentTitleIsExist = (html = ``) => {

    const handle = function ($doc) {
        return $doc.find('head title').length !== 0;
    }

    return htmlToJsonHandleWay(html, handle, errorHandle);
}

/**
 * 檢查Meta description是否存在
 * @param html
 * @returns boolean
 */
exports.documentMetaDescriptionIsExist = (html = ``) => {
    const handle = function ($doc) {
        return $doc.find('meta[name=description]').length !== 0;
    }

    return htmlToJsonHandleWay(html, handle, errorHandle);
}

/**
 * 檢查多少有圖片 及 有多少圖沒有alt
 * @param html
 * @returns {total , noAlt}
 */
exports.documentImgNoAltCount = (html = ``) => {
    const handle = function ($doc) {
        const images = $doc.find('img');
        let noAlt = 0, total = 0;
        if (images) {
            total = images.length;
            Object.keys(images).forEach((i, index) => {
                if (index < total) {
                    const attribs = images[index].attribs;
                    if (attribs) {
                        if (!attribs.alt) {
                            noAlt++;
                        }
                    }
                }
            })
        }

        return {total, noAlt};
    }

    return htmlToJsonHandleWay(html, handle, errorHandle);
}
