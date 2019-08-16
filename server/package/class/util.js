import $ from 'jquery';
var utils = {
    getMsg(_url, _data) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: _url,
                data: _data,
                type: 'GET',
                dataType: 'json',
                success: function(res) {
                    resolve.call(null, res);
                },
                error: function(err) {
                    reject.call(err);
                }
            })
        })
    },
    postMsg(_url, _data) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: _url,
                data: _data,
                type: 'POST',
                dataType: 'json',
                contentType: "application/json",
                success: (res) => {
                    resolve.call(null, res);
                },
                error: (err) => {
                    reject.call(err)
                }
            })
        })
    }
}
export default utils;