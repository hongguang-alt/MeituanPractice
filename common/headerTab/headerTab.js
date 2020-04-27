(function () {
    var itemTmpl = `<a class='$key bar-item' href='../$key/$key.html'>
                        <div class='bar-name'>$text</div>
                    </a>`

    function init() {
        var item = [{
            key: 'menu',
            text: '点菜'
        }, {
            key: 'comment',
            text: '评价'
        }, {
            key: 'restanurant',
            text: '商家'
        }]
        var str = ''

        item.forEach(item => {
            str += itemTmpl.replace('$text', item.text)
                .replace(/\$key/g, item.key)
        })
        $('.tab-bar').append(str)
        var arr = window.location.pathname.split('/')
        var path = arr[arr.length - 1].replace('.html', '')
        $('.bar-item.' + path).addClass('active')
    }

    init()
})()