var jsdom = require("jsdom"),
    fs = require("fs"),
    jquery = fs.readFileSync(__dirname + "/../public/js/jquery.js").toString();

var refreshResult = function(url, callback) {
        jsdom.env({
            html: url,
            src: [jquery],
            done: callback
        });
    };
exports.index = function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
};
exports.l638 = function(req, res, next) {
    var lotteryArray = [];
    refreshResult("http://www.taiwanlottery.com.tw/result_all.aspx", function(errors, window) {
        var $ = window.jQuery,
            container = $("#PanelSL638_new"),
            date = $("#SL638DDate_new").text(),
            resultArray = $(".txt_01 table tr:first td" ,container),
            special = $(".txt_01 table .number_special", container).text();
        resultArray.each(function(i, item) {
            lotteryArray.push($(item).text());
        });
        res.json(200, {
            "date": date,
            "result": lotteryArray,
            "special": special
        });
    });
};
exports.l649 = function(req, res, next) {
    var lotteryArray = [];
    refreshResult("http://www.taiwanlottery.com.tw/result_all.aspx", function(errors, window) {
        var $ = window.jQuery,
            date = $("#L649DDate").text(),
            resultArray = $("#Panel649 .txt_01 table tr:first td"),
            special = $("#Panel649 .txt_01 table .number_special").text();
        resultArray.each(function(i, item) {
            lotteryArray.push($(item).text());
        });
        res.json(200, {
            "date": date,
            "result": lotteryArray,
            "special": special
        });
    });
};



// $("#L649DDate")
// $("#Panel649 .txt_01 table")