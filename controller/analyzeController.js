const analyzeService = require('../service/analyzeService');
const fs = require('fs');

exports.analyzeHtml = (req, res) => {
    if (req.files.length) {
        fs.readFile(req.files[0].path, function (err, data) {
            if (err) throw err;
            toAnalyze(data.toString(), res)
            fs.unlink(req.files[0].path, function () {
                console.log('已經刪除檔案!');
            })
        })

    } else {
        toAnalyze(req.body.text, res)
    }
}


const toAnalyze = (html, res) => {
    const imageResultFun = ({noAlt}) => {
        const result = {result: `符合`, text: ``};

        if (noAlt > 0) {
            result.result = `不符合`;
            result.text = `此 HTML 有 ${noAlt} 個 img 不含 alt 屬性`
        }

        return result;
    }
    const allPromise = Promise.all(
        [
            analyzeService.documentTitleIsExist(html),
            analyzeService.documentMetaDescriptionIsExist(html),
            analyzeService.documentImgNoAltCount(html),
        ]
    )

    allPromise.then((resolve) => {
        res.json({
            title: {
                result: resolve[0] ? `符合` : `不符合`,
                text: resolve[0] ? `` : `此 HTML 不存在 title tag`,
            },
            meta: {
                result: resolve[1] ? `符合` : `不符合`,
                text: resolve[1] ? `` : `此 HTML 不存在 meta description 描述`,
            },
            img: {
                ...imageResultFun(resolve[2])
            },
        });
    })
}
