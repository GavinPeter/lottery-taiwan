var jsdom = require("jsdom");


exports.index = function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
};
exports.l649 = function(req, res, next) {
    var lotteryArray = [];
    jsdom.env("http://www.taiwanlottery.com.tw/result_all.aspx",
        ["http://code.jquery.com/jquery.js"],
        function(errors, window) {
            var $ = window.jQuery,
                date = $("#L649DDate").text(),
                resultArray = $("#Panel649 .txt_01 table tr:first td"),
                special = $("#Panel649 .txt_01 table .number_special").text();
            resultArray.each(function (i, item) {
                lotteryArray.push($(item).text());
            });
            res.json(200, { "result" : lotteryArray,
                            "special" : special
                        }
                    );
    });

};



// $("#L649DDate")
// $("#Panel649 .txt_01 table")