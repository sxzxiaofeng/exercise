function slideShow(selector,options){
    /*
    * 使用示例
        new slideShow('#container', {
        loop: true, //是否为无缝滚动
        auto: true, //是否为自动执行
        time: 2000, // 时间间隔
        nav: true // 是否显示导航小圆点
    });
    * */

    //获取选项参数
    var loop = options !== undefined && options.loop !== undefined ? options.loop : true;
    var auto = options !== undefined && options.auto !== undefined ? options.auto : true;
    var time = options !== undefined && options.time !== undefined ? options.time : 2000;
    var nav = options !== undefined && options.nav !== undefined ? options.nav : true;

    //获取元素
    var container = document.querySelector(selector);
    var wrapper = container.querySelector(".wrapper");
    var dots = container.getElementsByTagName("span");
    var index = 0;
    //保存slide元素的length属性
    var len = wrapper.querySelectorAll(".slide").length;
    //把包裹元素wrapper里的图片复制一份（做无缝滚动）
    if(loop){
        //如果是无缝滚动,就复制一份内容
        wrapper.innerHTML += wrapper.innerHTML;
    }
    //重新获取新的length
    var length = wrapper.querySelectorAll(".slide").length;
    var slides = container.querySelectorAll(".wrapper .slide");
    if(nav){
        var nav = container.querySelector(".nav");
    }
    container.timer = null;

    //定义两个状态变量做开关
    var isHori = null;
    var isFirst = null;

    //初始化，动态设置元素的样式
    container.init = function(){
        //设置wrapper的宽度
        wrapper.style.width = length + "00%";
        //设置slide单个元素的宽度
        for (var i = 0; i <length ; i++) {
            //单个slide元素占图片的1/8（8张图片）
            slides[i].style.width = 100 / length + "%";
        }

        //设置包裹元素container的高度，等图片加载完才能获取到
        window.addEventListener("load", function(){
            container.style.height = slides[0].offsetHeight + "px";

            //不需要导航圆点就退出函数
            if(!nav) return;
            //设置导航圆点
            for (var i = 0; i <len; i++) {
                var span = document.createElement("span");
                // console.log(span);
                if(i==0){
                    span.className = "active";
                }
                nav.appendChild(span);
            }
        });

    };
    //调用初始化函数
    container.init();

    //扩展一个自动播放图片的函数
    container.autoPlay = function() {
        if(!auto) return; //不需要动画就退出函数
        //清除计时器
        clearInterval(this.timer);
        container.timer = setInterval(function () {
            //进入计时器让index加加
            index++;
            container.changeSlide(index);
        },time)
    };
    //调用自动播放函数
    container.autoPlay();

    //扩展一个切换图片的函数
    container.changeSlide = function(index,isTransition) {
        //如果等于undefined,即不传参数的话,设置初始值为true(默认需要过渡动画)
        if(isTransition === undefined){
            isTransition = true;
        }
        //判断滑动的临界值
        if(index <= 0){
            index = 0;
        }
        if(index >= length-1){
            index = length -1;
        }
        if(isTransition){
            //设置过渡动画
            wrapper.style.transition = "all 0.5s";
        }else {
            wrapper.style.transition = "none";
        }

        //计算当前下标索引相对应的left值
        var newLeft = -container.offsetWidth * index;
        transformCSS(wrapper,"translateX",newLeft);
        if(nav){
            //如果有小圆点,先清除掉所有圆点的状态
            for (var i = 0; i < dots.length; i++) {
                dots[i].className = "";
            }
            //因为当前有8张图片，所以小圆点index的值要对len进行取余(得到0,1,2,3)
            dots[index % len].className = "active";
        }
        //赋值给全局的index(构造函数执行完要返回一个对象),
        // index = indexs;
    };

    //绑定touchstart事件，绑定在最外层的包裹元素container上
    container.addEventListener("touchstart",function (ev) {
        //获取手指按下的时间
        this.startTime = Date.now();
        //判断当前索引,如果图片走到左侧尽头(是无缝滚动进行判断)
        if(loop){
            if(index == 0){
                //让图片回到第五张
                index = len;
                //调用函数切换图片,不需要过渡动画,切换图片有过渡,会有延迟
                container.changeSlide(index,false);
            }
            //如果图片走到右侧边缘，让图片回到中间
            if(index == length - 1){
                //让图片回到中间（第四张）
                index = len-1;
                //调用函数切换图片
                container.changeSlide(index,false);
            }
        }
        this.x = ev.changedTouches[0].clientX;
        this.y = ev.changedTouches[0].clientY;
        //获取起始位置，wrapper移动的距离
        this.left = transformCSS(wrapper,"translateX");
        //清除过渡动画对touchmove事件的影响
        wrapper.style.transition = "none";
        //清除计时器
        clearInterval(this.timer);
        //填充状态变量
        isFirst = true;
    });

    //绑定touchmove事件
    container.addEventListener("touchmove",function (ev) {
        //获取手指移动之后的坐标位置
        this._x = ev.changedTouches[0].clientX;
        //获取Y轴垂直方向坐标
        this._y = ev.changedTouches[0].clientY;

        //计算水平方向和垂直方向移动距离差值，取绝对值(值为正整数)
        var dissX = Math.abs(this._x - this.x);
        var dissY = Math.abs(this._y - this.y);

        //如果是第一次按下手指才进入判断(即只判断第一次移动)
        if(isFirst){
            isFirst = false;//锁住开关，只判断一次
            //若水平大于垂直，则说明是水平移动，改变isHori状态
            if(dissX > dissY){
                isHori = true;
            }
            //若水平小于垂直，则说明是垂直方向
            if(dissX < dissY){
                isHori = false;
            }
        }
        if(!isHori) return;//如果是垂直，则退出函数，不执行
        var newLeft = this._x - this.x + this.left;
        //给wrapper设置translateX值
        transformCSS(wrapper,"translateX",newLeft);
        //阻止滚轮默认事件
        ev.preventDefault();
    });

    //绑定touchend事件，判断当前是左滑还是右滑
    container.addEventListener("touchend",function (ev) {
        //获取手指离开时的坐标
        this._x = ev.changedTouches[0].clientX;
        //获取手指离开时的时间
        this.endTime = Date.now();
        //获取时间差,用来是否满足快速滑动效果
        var dissTime = this.endTime - this.startTime;
        //获取手指按下到离开的距离
        var dissX = Math.abs(this._x - this.x);
        //如果手指滑动的距离，超过包裹元素的一半，并且时间小于300毫秒就进入判断
        if(dissX >= container.offsetWidth/2 || dissTime <300){
            if(this._x > this.x){
                index --;
            }
            if(this._x < this.x){
                index ++;
            }
        }
        //调用图片切换函数(手指抬起需要有过渡动画)
        this.changeSlide(index);
        //调用计时器
        this.autoPlay();
    });

    //绑定动画结束函数(有无缝滚动才执行动画结束事件)
    loop && wrapper.addEventListener("transitionend",function () {
        if(index >= length-1){
            //如果图片走到最右侧，让图片回到中间那张,实现无缝滚动
            index = len -1;
            container.changeSlide(index,false);
        }
    })

};