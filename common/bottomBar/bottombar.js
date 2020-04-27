(function () {
    var itemTmpl = `<a class='$key btn-item' href='../$key/$key.html'>
                <div class='tab-icon'></div>
                <div class='btn-name'>$text</div>
              </a>`

    function init() {
        var item = [{
            key: 'index',
            text: '首页'
        }, {
            key: 'order',
            text: '订单'
        }, {
            key: 'my',
            text: '我的'
        }]
        var str = ''

        item.forEach(item => {
            str += itemTmpl.replace('$text', item.text)
                .replace(/\$key/g, item.key)
        })
        $('.bottom-bar').append(str)
        var arr = window.location.pathname.split('/')
        var path = arr[arr.length - 1].replace('.html', '')
        $('.btn-item.' + path).addClass('active')
    }

    init()
})()