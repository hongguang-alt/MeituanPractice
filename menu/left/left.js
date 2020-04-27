(function(){
    //定义模板字符串
    var itemTmpl = `<div class='left-item'>
                        <div class='item-text'>$getItemContent</div>
                    </div>`

    window.food_spu_tags = [];
    function getList(){
        $.get('../../json/food.json',data=>{
            console.log(data)
            window.food_spu_tags = data.data.food_spu_tags || []
            initContentList(window.food_spu_tags)
            window.ShopBar.changeShipPrice(data.data.poi_info.shipping_fee || 0)
        })

    }

    //渲染每一个item
    function getItemContent(data){
        if(data.icon){
            return `<img class='item-icon' src=${data.icon} />${data.name}`;
        }else{
            return data.name
        }
    }


    //渲染列表
    function initContentList(list){
        list.forEach(item => {
            var str = itemTmpl.replace('$getItemContent',getItemContent(item))

            //向一个元素中添加数据
            var $target = $(str)
            $target.data('itemData',item);
            $('.left-bar-inner').append($target)
        });

        //用来默认选中第一个点击事件的
        $('.left-item').first().click()
    }

    function addClick(){
        $('.menu-inner').on('click','.left-item',function(e){
            var $target = $(e.currentTarget);
            $target.addClass('active');
            //筛选器，找到同胞元素，也就是遍历，找到其他的li，并且移出active
            $target.siblings().removeClass('active');
            window.Right.refresh($target.data('itemData'));
        })
    }

    function init(){
        getList()
        addClick()
    }
    init()
})()