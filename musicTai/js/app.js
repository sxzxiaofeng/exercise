//初始化
(function(){
    //阻止默认行为
    var app = document.querySelector('#app');
    app.addEventListener('touchstart', function(e){
        e.preventDefault();
    });

    //恢复a链接可点功能
    var links = document.querySelectorAll('a');

    //link为当前正在遍历的元素
    links.forEach(function(link){
        link.addEventListener('touchstart', function(){
            //使用 JS 来进行页面跳转
            location.href = this.href;
        });
    });
    //设置HTML的字号大小
    document.documentElement.style.fontSize = document.documentElement.clientWidth/16 + "px";

    window.addEventListener("resize",function() {
        document.documentElement.style.fontSize = document.documentElement.clientWidth/16 + "px";
    })
})();

/*频道菜单显示隐藏*/
(function () {
    var app = document.querySelector("#app");
    var menuList= document.querySelector(".menus");
    var menu = document.querySelector(".channel");

    menu.addEventListener("touchstart",function() {
        menuList.classList.toggle("open");
        menu.classList.toggle("close");
    });

    var input = document.querySelector(".search input");
    input.addEventListener("touchstart",function (ev){
        ev.stopPropagation();
    });
    app.addEventListener("touchstart",function () {
        input.blur();
    })
}());

/**
 1. 可拖拽
 2. 惯性移动
 通过滑动速度  ->  滑动惯性位移  -> 在原来的基础上加上该位移
 3. 回弹
 贝塞尔曲线  transition
 4. 橡皮筋
 边界外的情况下, 包裹元素的移动位移为手指滑动位移的 1 / 2
 5. 可点击
 touchend
 */

(function () {
    var main = document.querySelector("#main");
    var nav = document.querySelector("#nav");
    var navList = document.querySelector(".nav-list");
    var li = document.querySelectorAll("#nav .nav-list li");
    //定义一个状态变量做开关
    var isMoving = false;

    nav.addEventListener("touchstart",function (e) {
        this.x = e.changedTouches[0].clientX;
        this.left = my.transformCSS(navList,"translateX");
        navList.style.transition = "none";
        //获取手指按下的时间
        this.startTime = new Date();
        e.preventDefault();
    });

    nav.addEventListener("touchmove",function(e) {
        this._x = e.changedTouches[0].clientX;
        //计算包裹元素ul移动的left值
        var translateX = this._x - this.x + this.left;

         //计算手指移动的距离
        var dissX = this._x - this.x;

        //判断临界值,left最大值不能大于0,大于0就超出屏幕了
        var maxTranslateX = 0;
        //向左移是负值,最小距离是外层包裹元素宽度,减去容器元素nav的宽度
        var minTranslateX = -(navList.offsetWidth - nav.offsetWidth);

        if(translateX >= maxTranslateX){
            // translateX = maxTranslateX;
            //计算比列,让包裹元素缓慢停下来,有回弹效果
            var scale = 1 - translateX / (nav.offsetWidth*2);
            translateX *= scale;
        }
        if(translateX <= minTranslateX){
            // translateX = minTranslateX;
            //让包裹元素,多位移手指差值的一半
            translateX = minTranslateX + dissX/2;
        }
        my.transformCSS(navList,"translateX",translateX);

        //修改状态变量,如果手指移动距离大于4像素,则认定为移动,否则认定为点击
        if(Math.abs(dissX) >= 4){
            isMoving = true;
        }
        else{
            isMoving = false;
        }
        e.stopPropagation();
    });

    //绑定结束时间
    nav.addEventListener("touchend",function(e) {
        //获取包裹元素位移值
        var translateX = my.transformCSS(navList,"translateX");
        var maxTranslateX = 0;
        var minTranslateX = -(navList.offsetWidth - nav.offsetWidth);

        this._x = e.changedTouches[0].clientX;
        var dissX = this._x - this.x;
        //获取结束时间
        this.endTime = new Date();
        //计算时间差,求出速度
        var dissTime = this.endTime - this.startTime;
        //移动速度等于移动距离比移动时间
        var speed = dissX/dissTime;
        //计算惯性移动位移
        var distance = speed * 100;
        //在原有的位移基础上,加上惯性位移
        translateX += distance;
        //定义一个变量
        var transition = "";

        //判断临界值
        if(translateX >= maxTranslateX){
            translateX = maxTranslateX;
            //用贝塞尔曲线做回弹效果
            transition = "transform .5s cubic-bezier(.17,.67,.56,1.5)"
        }
        if(translateX <= minTranslateX){
            translateX = minTranslateX;
            transition = "transform .5s cubic-bezier(.17,.67,.56,1.5)"
        }
        navList.style.transition = transition;
        my.transformCSS(navList,"translateX",translateX);
        //修改状态变量
        isMoving = false;
    });

    //遍历所有li标签touchend事件,绑定点击事件会和移动状态有冲突
    li.forEach(function (item) {
        item.addEventListener("touchend",function () {
            //如果当前是移动状态就退出函数,不点击
            if(isMoving) return;
            //遍历所有li标签,移除所有的类名
            li.forEach(function(list) {
                list.classList.remove("active");
            });
            //给当前选中元素添加类名
            this.classList.add("active");
        })
    })
})();

/*轮播播实例化*/
(function(){
    my.slideShow("#swiper",{
        loop:true,
        auto: true,
        time: 2000,
        page: true
    })
}());

/*内容区*/
(function(){
    var floors = document.querySelectorAll(".floor");
    floors.forEach(function(floor){
        var nav = floor.querySelector("nav");
        var navItems = nav.querySelectorAll(".nav-item");
        var moveBorder = nav.querySelector(".moved-border");
        var mvs = floor.querySelector(".mvs");
        var slides = floor.querySelectorAll(".slide");

        //绑定点击事件,点击切换导航
            navItems.forEach(function(item,key){
                item.index = key;
                item.addEventListener("touchstart", function(){
                    var left = navItems[0].offsetWidth * this.index;
                    moveBorder.style.left = left + "px";
                    swiper.container.changeSlide(this.index);
                })
            });

        /*内容区域轮播*/
        //实例化一个swiper对像,让点击事件里可以直接调用container对象的changSlide方法切换幻灯片
        var swiper = new my.slideShow(mvs,{
            loop : false,
            auto : false,
            page : false,
            callback : {
                //幻灯片切换完成之后,设置底部边框跟随移动
                end: function(){
                    //调用方法获取当前下标索引
                    var index = swiper.getIndex();
                    var left = navItems[0].offsetWidth * index;
                    moveBorder.style.left = left + "px";

                    //检测当前显示的幻灯片是否加载完成
                    //获取当前标签的自定义属性isloaded,值为0则没有加载
                    var isloaded = parseInt(slides[index].dataset.isloaded);
                    //如果没有加载,则填充数据
                    if(!isloaded){
                        //模拟延时效果
                        setTimeout(function(){
                            var html = slides[0].innerHTML;
                            slides[index].innerHTML = html;
                            slides[index].dataset.isloaded = 1;
                        },1500);
                    }
                }
            }
        });
    });

}());

/*内容区域滚动效果*/
(function(){
    my.touchScroll("#app","#main");
}());

