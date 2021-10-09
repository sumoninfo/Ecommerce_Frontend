import Vue from 'vue'
//numberFormat
Vue.filter("numberFormat", function (number) {
    return process.env.VUE_APP_CURRENCY + ' ' + parseFloat(number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
});
Vue.filter("numberFormatClean", function (number) {
    return parseFloat(number).toFixed(0).replace(/\d(?=(\d{3})+\.)/g, '$&,');
});

// System for American Numbering
var th_val = ['', 'thousand', 'million', 'billion', 'trillion'];
// System for uncomment this line for Number of English
// var th_val = ['','thousand','million', 'milliard','billion'];

let dg_val = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
let tn_val = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
let tw_val = ['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

Vue.filter("inWords", function (totalRent) {
    if (totalRent == 0) {
        return '';
    }
    var a      = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '];
    var b      = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    var number = parseFloat(totalRent).toFixed(2).split(".");
    var num    = parseInt(number[0]);
    var digit  = parseInt(number[1]);
    if ((num.toString()).length > 9) return 'Something';
    var n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    var d = ('00' + digit).substr(-2).match(/^(\d{2})$/);
    if (!n) return;
    var str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
    str += (n[5] != 0) ? (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'Taka ' : '';
    str += (d[1] != 0) ? ((str != '') ? "and " : '') + (a[Number(d[1])] || b[d[1][0]] + ' ' + a[d[1][1]]) + 'Paise ' : 'Only!';
    return str;
});


//dateFormat
Vue.filter("dateFormat", function (date) {
    return date != null ? moment(String(date)).format(process.env.VUE_APP_DATE_FORMAT) : ''
});
//dateTimeFormat
Vue.filter("dateTimeFormat", function (date_time) {
    return moment(String(date_time)).format(process.env.VUE_APP_DATE_TIME_FORMAT)
});
//timeFormat
Vue.filter("timeFormat", function (time) {
    return time != null ? moment(time, "HH:mm:ss").format(process.env.VUE_APP_TIME_FORMAT) : ''
});
//statusFormat
Vue.filter("statusFormat", function (str) {
    return str != null ? str.replace(/_/g, ' ') : '';
});
