(function(){
    //顶部模板字符串
    var itemTopTmpl = `<div class='choose-content hide'>
                            <div class='content-top'>
                                <div class='clear-car'>清空购物车</div>
                            </div>
                      </div>`

    //底部模板字符串
    var itemBottomTmpl = `<div class='bottom-content'>
                            <div class='shop-icon'>
                                <div class='dot-num hide'></div>
                            </div>
                            <div class='price-content'>
                                <p class='total-price'>￥<span class='total-price-span'>0<span></p>
                                <p class='other-price'>另需派送 ￥<span class='shipping-fee'>9<span></p>
                            </div>
                            <div class='submit-btn'>去结算</div>
                        </div>`

    var $strTop = $(itemTopTmpl)
    var $strBottom=$(itemBottomTmpl)
    function changeShipPrice(str){
        $strBottom.find('.shipping-fee').text(str)
    }

    function changeTotalPrice(str){
        $strBottom.find('.total-price-span').text(str)
    }

    function randerItems(){
        $strTop.find('.choose-item').remove();
        var list = window.food_spu_tags || []
        var strTmpl = `<div class='choose-item'>
                            <div class='item-name'>$name</div>
                            <div class='price'>￥<span class='total'>$price</span></div>
                            <div class='select-content'>
                                <div class='minus'></div>
                                <div class='count'>$chooseCount</div>
                                <div class='plus'></div>
                            </div>
                        </div>`

        var totalPrice = 0;
        list.forEach(item=>{
            item.spus.forEach(_item=>{
                if(_item.chooseCount >0){
                    var price = _item.min_price*_item.chooseCount;
                    var row = strTmpl.replace('$id', _item.id)
                                    .replace('$name', _item.name)
                                    .replace('$price', price)
                                    .replace('$chooseCount', _item.chooseCount)

                    totalPrice+=price;
                    $row = $(row)
                    $row.data('itemData',_item)
                    $($strTop).append($row)
                }
            })
        })
        changeTotalPrice(totalPrice)
        changeDot()
    }
    //寻找红点
    function changeDot(){
        var $counts = $strTop.find('.count');
        var total = 0;
        for(var i=0;i<$counts.length;i++){
            total += parseInt($($counts[i]).text())
        }
        if(total > 0){
            $('.dot-num').show().text(total)
        }else{
            console.log(111)
            $('.dot-num').hide()
        }
    }
    //绑定联动事件
    function addClick(){
        $('.bottom-content').on('click','.shop-icon',function(){
            $('.mask').toggle();
            $strTop.toggle()
        })
        $strTop.on('click','.plus',function(e){
            var $count = $(e.currentTarget).parent().find('.count')
            $count.text(parseInt($count.text() || 0)+1)
            var $item = $(e.currentTarget).parents('.choose-item').first()
            var itemData = $item.data('itemData')
            itemData.chooseCount = itemData.chooseCount +1
            randerItems()

            $('.left-item.active').click();
        })

        $strTop.on('click','.minus',function(e){
            var $count = $(e.currentTarget).parent().find('.count')
            if($count.text ==0) return
            $count.text(parseInt($count.text() || 0)-1)
            var $item = $(e.currentTarget).parents('.choose-item').first()
            var itemData = $item.data('itemData')
            itemData.chooseCount = itemData.chooseCount -1
            randerItems()

            $('.left-item.active').click();
        })
    }

    function init(){
        $('.shop-bar').append($strTop)
        $('.shop-bar').append($strBottom)
        addClick()
    }

    window.ShopBar={
        randerItems,
        changeShipPrice
    }

    init()
})()