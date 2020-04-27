(function(){
    var itemTmpl =`<div data-id='$id' class='menu-item'>
                        <img class='img' src=$picture>
                        <div class='menu-item-right'>
                            <p class='item-title'>$name</p>
                            <p class='item-desc two-line'>$description</p>
                            <p class='item-zan'>$praise_content</p>
                            <p class='item-price'>￥$min_price<span class='unit'>/$unit</span></p>
            
                        </div>
                        <div class='select-content'>
                            <div class='minus'></div>
                            <div class='count'>$chooseCount</div>
                            <div class='plus'></div>
                        </div>
                    </div>`
    
    function initRightItem(list){
        $('.right-list-inner').html(' ');
        list.forEach(item => {
            if(!item.chooseCount) {
                item.chooseCount = 0;
            }
            var str = itemTmpl.replace('$picture',item.picture)
                              .replace('$id',item.id)
                              .replace('$name',item.name)
                              .replace('$description', item.description)
                              .replace('$praise_content', item.praise_content)
                              .replace('$min_price', item.min_price)
                              .replace('$unit', item.unit)
                              .replace('$chooseCount',item.chooseCount);

            var $str = $(str)
            $str.data('itemData',item);
            $('.right-list-inner').append($str)
        });
    }

    function initRightTitle(str){
        $('.right-title').text(str)
    }




  function init(data){
        initRightItem(data.spus || [])
        initRightTitle(data.name)
        addClick()
    }

    function addClick(){
        $('.menu-item').on('click','.plus', function(e){
            var $count = $(e.currentTarget).parent().find('.count');
            $count.text(parseInt($count.text() || '0' )+1)
            var $item = $(e.currentTarget).parents('.menu-item').first()
            var itemData = $item.data('itemData')
            itemData.chooseCount = itemData.chooseCount + 1;
            window.ShopBar.randerItems()
        })

        $('.menu-item').on('click','.minus', function(e){
            var $count = $(e.currentTarget).parent().find('.count');
            if($count.text() == 0) return
            $count.text(parseInt($count.text() || '0' )-1)
            var $item = $(e.currentTarget).parents('.menu-item').first()
            var itemData = $item.data('itemData')

            itemData.chooseCount = itemData.chooseCount - 1;
            window.ShopBar.randerItems()
        })
    }


    window.Right = {
        refresh:init
    }
})()