(function(){
    var itemTmpl = `<div class='r-item-content'>
                        <img class='item-img' src=$pic_url />
                        $brand
                        <div class='item-info-content'>
                            <p class='item-title'>$name</p>
                            <div class='item-desc clearfix'>
                                <div class='item-score'>$wm_poi_score</div>
                                <div class='item-count'>月售$monthNum</div>
                                <div class='item-distance'>$distance</div>
                                <div class='item-time'>$mt_delivery_time&nbsp|&nbsp</div>
                            </div>
                            <div class='item-price'>
                                <div class='item-pre-price'>$min_price_tip</div>
                            </div>
                        <div class='item-others'>$others</div>
                        </div>
                    </div>`
    
    
    var page = 0;
    var isLoading = false; 
    //获取列表的数据
    function getList(){
        page++;
        isLoading = true;
        $.get('../../json/homelist.json',function(data){
            var list = data.data.poilist || []
            initContentList(list)
            isLoading = false;
        })
    }

    function initContentList(list){
        list.forEach(item => {
            var str = itemTmpl
                      .replace('$pic_url',item.pic_url)
                      .replace('$name',item.name)
                      .replace('$distance',item.distance)
                      .replace('$mt_delivery_time',item.mt_delivery_time)
                      .replace('$min_price_tip',item.min_price_tip)

                      .replace('$brand' ,getBrand(item))
                      .replace('$monthNum' ,getMonthNum(item))
                      .replace('$others' ,getOther(item))

                      .replace('$wm_poi_score', new StartScore(item.wm_poi_score).getStars())
            $('.list-wrap').append(str)
        });
    }

    function getBrand(data){
        if(data.brand_type){
            return `<div class='brand brand-pin'>品牌</div>`
        }else{
            return `<div class='brand brand-xin'>新品</div>`
        }
    }

    function getMonthNum(data){
        if(data.month_sale_num >999){
            return '999+'
        }
        return data.month_sale_num
    }

    function getOther(data){
        var arr =data.discounts2
        var str = '',
            _str = `<div class='other-info'>
                        <img src=$icon_url class = 'other-tag'>
                        <div class='other-content one-line'>$info</div>
                    </div>`
        arr.forEach(item=>{
            _str=_str.replace('$icon_url',item.icon_url)
                     .replace('$info',item.info)
            str = str + _str
        })

        return str
    }

    //绑定事件
    function addEvent(){
        window.addEventListener('scroll',function(){
            var clientHeight = document.documentElement.clientHeight;
            var scrollHeight = document.body.scrollHeight;
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            var proDis = 30;
            if((scrollTop + clientHeight) >=(scrollHeight-proDis)){
                //最多滚动三页
                if(page <3){
                    if(isLoading){
                        return
                    }
                    getList()
                }else{
                    $('.loading').text('加载完成')
                }
            }
        })
    }

    function init(){
        getList()
        addEvent()
    }
    
    init()
})()