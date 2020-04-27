(function(){
    //定义模板字符串
    var itemTmpl = `<div class='star-score'>$starStr</div>`

    function _getStars(){
        var _score = this.score.toString();
        var scoreArray = _score.split('.')

        // 满星的个数
        var fullStar = parseInt(scoreArray[0])
        //半星的个数
        var halfStar = parseInt(scoreArray[1]) >= 5 ? 1 : 0;
        //零星的个数
        var nullStar = 5 - fullStar - halfStar
        var starStr = ' '

        // 渲染满星
        for (var i=0;i<fullStar;i++){
            starStr += `<div class='star fullstar'></div>`
        }

        //渲染半星
        if(halfStar){
            for( var j = 0;j< halfStar;j++){
                starStr += `<div class='star halfstar'></div>`
            }
        }

        // 渲染零星
        if(nullStar){
            for(var k=0;k<nullStar; k++){
                starStr +=`<div class='star nullstar'></div>`
            }
        }

        itemTmpl =  itemTmpl.replace('$starStr', starStr)
        return itemTmpl
    }


    window.StartScore = function(score){
        this.score = score || '';
        this.getStars = _getStars
    }
})()