+function (w) {
    /*如果没有加号，解析器会认为function是一个函数声明的开始。在后边直接添加（）调用时错误的语法
    如果加上一个+号，就变成了一个函数表达式，后边添加（），就变成了立即执行函数*/
    // 当然波浪号和加号一个作用
    w.my = {};

    /*
        getWinScroll获取系统滚动条滚过去的距离 函数
        返回一个对象  对象的left属性保存横向滚动条滚过去的距离
        返回一个对象  对象的top属性保存竖向滚动条滚过去的距离
     */
    w.my.getWinScroll = function () {
        return {
            left:document.documentElement.scrollLeft||document.body.scrollLeft,
            top:document.documentElement.scrollTop||document.body.scrollTop
        }
    };

    /*
        setWinXScroll是设置横向系统滚动条滚过去的距离
        setWinYScroll是设置竖向系统滚动条滚过去的距离
        参数num 就是要设置的值
     */
    w.my.setWinXScroll = function(num){
        window.pageXOffset = num;
        document.documentElement.scrollLeft = num;
        document.body.scrollLeft = num;
    };
    w.my.setWinYScroll = function (num) {
        window.pageYOffset = num;
        document.documentElement.scrollTop = num;
        document.body.scrollTop = num;
    };


    /*
        getScreen()是获取浏览器可视化区域的宽度和高度
        可以直接调用返回对象的 width 和height 来获取
    */
    w.my.getScreen = function () {
        return {
            width:window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,
            height:window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight
        }
    };

    /*
        getPreSibling(obj)获取 元素的上一个兄弟元素节点

     */
    w.my.getPreSibling = function(obj){
        return obj.previousElementSibling||obj.previousSibling;
    };

    /*
        getPreSibling(obj)获取 元素的上一个兄弟元素节点

     */
    w.my.getNextSibling = function(obj){
        return obj.nextElementSibling||obj.nextSibling;
    };

    /*
        getFirChild(obj)获取 元素第一个子元素节点

     */
    w.my.getFirChild = function(obj){
        return obj.firstElementChild||obj.firstChild;
    };

    /*
        getLastChild(obj)获取 元素的最后一个子元素节点

     */
    w.my.getLastChild = function(obj){
        return obj.lastElementChild||obj.lastChild;
    };

    /*
        beforeChild(newEle,parentEle) 将新元素插入到某个元素的最前边
    */
    w.my.beforeChild = function (newEle,parentEle) {
        if (w.my.getFirChild(parentEle)) {
            parentEle.insertBefore(newEle,w.my.getFirChild(parentEle));
        }else{
            parentEle.appendChild(newEle)
        }
    };

    /*
        insertAfter (parentEle,newEle,targetEle)  将newEle 插入到targetEle的下边（兄弟关系）
        parentEle是父元素
     */
    w.my.insertAfter = function(parentEle,newEle,targetEle){
        parentEle.insertBefore(newEle,w.my.getNextSibling(targetEle));
    };

    /*
        getID(id)函数 用来通过id获取元素
     */
    w.my.getID = function (id) {
        return document.getElementById(id);
    };

    /*
        getEleToDoc(ele)  获取一个元素 距离 文档的边缘的长度
     */
    w.my.getEleToDoc = function (ele) {
        // console.log(oBox.offsetLeft);
        //在这里用oTarget保存 oBox的值， oTarget在每次循环后会改变
        var obj = {
            left: 0,
            top:0
        };
        var oTarget = ele;
        // while循环
        while(oTarget){
            // 当oTarget就是oBox的时候   是不用获取边框的
            if (oTarget == ele){
                obj.left += oTarget.offsetLeft;
                obj.top += oTarget.offsetTop;
            }else{
                obj.left += oTarget.offsetLeft + oTarget.clientLeft;
                obj.top += oTarget.offsetTop + oTarget.clientTop;
            }
            oTarget = oTarget.offsetParent;
        }
        return obj;
    };

    /*
        getPage(ev):获取event事件的 pageX和pageY的兼容性
     */
    w.my.getPage = function (ev) {
        return {
            x: ev.pageX || ev.clientX + my.getWinScroll().left,
            y: ev.pageY || ev.clientY + my.getWinScroll().top
        }
    };

    /*
        getOffset(ev,Ele)  获取ev.offsetX的兼容
     */
    w.my.getOffset = function (ev,Ele) {
        return {
            left:ev.offsetX || ev.clientX - w.my.getEleToDoc(Ele).left,
            top:ev.offsetY || ev.clientY - w.my.getEleToDoc(Ele).top
        }
    };


    /*
        addEvent(ele,type,fn,boo):绑定DOM2级事件兼容性写法
            参数  元素、事件名、事件函数、控制冒泡捕获的布尔值（可选）
     */
    w.my.addEvent = function (ele,type,fn,boo) {
        if (ele.addEventListener){
            ele.addEventListener(type,fn,boo||false);
        }else if (ele.attachEvent){
            ele.attachEvent("on"+type,fn)
        }else{
            ele["on"+type] = fn;
        }
    };

    /*
        removeEvent(ele,type,fn):移除DOM2级事件兼容性写法
            参数  元素、事件名、事件函数
     */
    w.my.removeEvent = function (ele,type,fn,boo) {
        if (ele.removeEventListener){
            ele.removeEventListener(type,fn);
        }else if(ele.detachEvent){
            ele.detachEvent("on"+type,fn)
        }else{
            ele["on" + type] = null;
        }
    };


    /*
        getStyle（obj,attr） 获取元素的样式
        元素名称   样式名称

     */
    w.my.getStyle = function (obj,attr) {
        if (obj.currentStyle){
            return obj.currentStyle[attr];
        } else {
            return getComputedStyle(obj,null)[attr];
        }
    };


    /*
        transformCSS(node,type,val),给元素设置或获取css3变形样式

        node 元素  type是变形的类型  val是值（如果是获取 可以不传递）

     */
    w.my.transformCSS = function (node,type,val) {
        if(typeof node ==="object" && typeof node["transform"] === "undefined"){
            node["transform"] = {};
        }
        // 如果传递的参数是3个，那么就是设置
        if (arguments.length >= 3) {
            //设置
            node["transform"][type] = val;
            var text = "";

            for(var item in node["transform"]){
                switch (item) {
                    case "translateY":
                    case "translateX":
                        text += item+"("+ node["transform"][item] +"px) ";
                        break;
                    case "rotate":
                    case "rotateX":
                    case "rotateY":
                    case "skewX":
                    case "skewY":
                        text += item+"("+ node["transform"][item] +"deg) ";
                        break;
                    case "scaleX":
                    case "scaleY":
                        text += item+"("+ node["transform"][item] +") ";
                        break;
                }
            }

            node.style.transform = text;
        }else if(arguments.length == 2){
            //读取
            val = node["transform"][type];
            if(typeof val === "undefined"){
                switch (type) {
                    case "translateX":
                    case "translateY":
                    case "skewX":
                    case "skewY":
                    case "roateX":
                    case "roateY":
                    case "roate":
                        val = 0;
                        break;
                    case "scaleX":
                    case "scaleY":
                        val = 1;
                        break;
                }
            }
            return val;
        }

    };


   /*
        copyEleText(obj)  复制obj的内容到剪切板
    */
    w.my.copyEleText = function (obj) {
        //1、复制依赖表单，为了不影响结构，动态创建input
        var newInput = document.createElement("input");
        ///2、把新创建的input插入到页面中  插入到obj的父级即可 不影响复制
        obj.parentNode.appendChild(newInput);
        ///3、将要复制的内容 给到 input的value中
        newInput.value = obj.innerHTML;
        // 4、选中当前表单的内容
        newInput.select();
        //5、调用document 的 execCommand方法的复制功能，就复制到剪切板了
        document.execCommand("copy")
        //6、用完input 就直接给删除就可以
        obj.parentNode.removeChild(newInput);
        alert("复制成功");
    }


    /*
        getExploreName() 返回当前浏览器类型
     */
    w.my.getExploreName = function() {
        var exploreCode = window.navigator.userAgent;
        if (exploreCode.indexOf("Opera") != -1 || exploreCode.indexOf("OPR") != -1){
            return "Opera";
        }else if (exploreCode.indexOf("compatible") != -1 && exploreCode.indexOf("MSIE") != -1) {
            return "IE10-";
        }else if (exploreCode.indexOf("Edge") != -1) {
            return "Edge";
        }else if (exploreCode.indexOf("Firefox") != -1) {
            return "Firefox"
        }else if (exploreCode.indexOf("Safari") != -1 && exploreCode.indexOf("Chrome") == -1) {
            return "Safari";
        }else if(exploreCode.indexOf("Chrome") != -1 && exploreCode.indexOf("Safari") != -1){
            return "Chrome";
        }else if(window.ActiveXObject){
            return "ie11"
        }else{
            return "换吧"
        }
    };

    /*
    移动端轮播图函数封装
    * */
    w.my.slideShow = function(selector,options){
        /*
        参数
            * 选择器
            * 选项
        * 使用示例
            new slideShow('#container', {
            loop: true, //是否为无缝滚动
            auto: true, //是否为自动执行
            time: 2000, // 时间间隔
            page: true // 是否显示导航小圆点
        });
        * */

        //获取选项参数
        var loop = options !== undefined && options.loop !== undefined ? options.loop : true;
        var auto = options !== undefined && options.auto !== undefined ? options.auto : true;
        var time = options !== undefined && options.time !== undefined ? options.time : 2000;
        var page = options !== undefined && options.page !== undefined ? options.page : true;

        //参数选择器可以是字符串,也可以是对象
        if(typeof selector === "string"){
            //获取元素
            var container = document.querySelector(selector);
        }
        if(typeof selector === "object"){
            var container = selector;
        }
        var wrapper = container.querySelector(".wrapper");
        var dots = container.getElementsByTagName("span");
        if(page){
            var pagination = container.querySelector(".pagination");
        }
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
        container.timer = null;

        //定义两个状态变量做开关
        var isHori = null;
        var isFirst = null;

        //初始化，动态设置元素的样式
        container.init = function(){
            container.style.position = 'relative';
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
                if(!page) return;
                //设置导航圆点
                for (var i = 0; i <len; i++) {
                    var span = document.createElement("span");
                    // console.log(span);
                    if(i==0){
                        span.className = "active";
                    }
                    pagination.appendChild(span);
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
        container.changeSlide = function(indexes,isTransition) {
            //如果等于undefined,即不传参数的话,设置初始值为true(默认需要过渡动画)
            if(isTransition === undefined){
                isTransition = true;
            }
            //判断滑动的临界值
            if(indexes <= 0){
                indexes = 0;
            }
            if(indexes >= length-1){
                indexes = length -1;
            }
            if(isTransition){
                //设置过渡动画
                wrapper.style.transition = "all 0.5s";
            }else {
                wrapper.style.transition = "none";
            }

            //计算当前下标索引相对应的left值
            var newLeft = -container.offsetWidth * indexes;
            my.transformCSS(wrapper,"translateX",newLeft);
            if(page){
                //如果有小圆点,先清除掉所有圆点的状态
                for (var i = 0; i < dots.length; i++) {
                    dots[i].className = "";
                }
                //因为当前有8张图片，所以小圆点index的值要对len进行取余(得到0,1,2,3)
                dots[indexes % len].className = "active";
            }
            //赋值给全局的index(构造函数执行完要返回一个对象),
            index = indexes;
            // console.log(index);

            //执行回调函数,让底部边框跟随移动
            if(options && options.callback && typeof options.callback.end === "function"){
                options.callback.end();
            }
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
             this.left = my.transformCSS(wrapper,"translateX");
            //清除过渡动画对touchmove事件的影响
            wrapper.style.transition = "none";
            //清除计时器
            clearInterval(this.timer);
            //填充状态变量
            isFirst = true;

            // 执行用户自定义代码
            if(options && options.callback && typeof options.callback.end === "function"){
                options.callback.end();
            }
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
            my.transformCSS(wrapper,"translateX",newLeft);
            //阻止滚轮默认事件
            ev.preventDefault();
            //阻止最外层包裹元素(app)移动事件冒泡,防止内容区域上下移动时,屏幕左右移动
            ev.stopPropagation();
        });

        //绑定touchend事件，判断当前是左滑还是右滑
        container.addEventListener("touchend",function (ev) {
            //手指抬起,如果是垂直方向,则退出函数,不执行
            if(!isHori) return;
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
                index = len-1;
                container.changeSlide(index,false);
            }
        });

        //扩展一个获取当前下标索引的方法
        this.getIndex = function(){
            return index;
        };

        //解析器在调用函数时,每次都会向函数内部传递一个隐含参数this,this指向的是一个对象,我们称它为函数的执行上下文对象
        // 让this带着container对象一起返回,这样我们在外面就可以直接使用container对象
        this.container = container;
    };


    /**
     * 函数名
     *      tweenAnimation
     * 功能介绍
     *      能够实现自定义动画
     * @example
     *      tweenAnimation(box, 'width', 100, 500, 2000, 10, 'Linear'); //  tween['Linear']
     *      tweenAnimation(box, 'opacity', 0, 1, 1000, 10, 'QuartEaseOut'); // tween['QuartEaseOut']
     *
     * @param node   元素对象
     * @param style  元素的样式   eg: width height left  top  translateX translateY rotate
     * @param init   起始状态值
     * @param end    结束状态值
     * @param time   总的变化时间
     * @param interval  间隔时间
     * @param type   动画类型
     *          Linear, QuartEaseOut, BackEaseOut
     *      Linear: function(t,b,c,d){ return c*t/d + b; },
     *      QuartEaseOut: function(t,b,c,d){
            return -c * ((t=t/d-1)*t*t*t - 1) + b;
        },
     *      BackEaseOut: function(t,b,c,d,s){
            if (s == undefined) s = 1.70158;
            return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
        },
     */

    w.my.tweenAnimation = function (node, style, init, end, time, interval, type) {
        //动画算法集合
        var tween = {
            Linear: function (t, b, c, d) {
                return c * t / d + b;
            },
            QuartEaseOut: function (t, b, c, d) {
                return -c * ((t = t / d - 1) * t * t * t - 1) + b;
            },
            BackEaseOut: function (t, b, c, d, s) {
                if (s == undefined) s = 1.70158;
                return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
            },
            QuintEaseOut: function(t,b,c,d){
                return c*((t=t/d-1)*t*t*t*t + 1) + b;
            }
        };
        //type 默认值的设置
        if (type === undefined || tween[type] === undefined) {
            type = 'Linear';
        }

        //声明参数
        var t = 0;
        var b = init;
        var c = end - init;
        var d = time;

        // node.timer.width =
        // node.timer.height =
        if (node.timer == undefined) {
            node.timer = {};
        }
        node.timer[style] = setInterval(function () {
            //1. 时间自增
            t += interval;
            //2. 计算当前的样式值
            var res = tween[type](t, b, c, d);
            //3. 设置样式
            node.style[style] = res; // 需要加的 width height left top padding margin     不用加的   translateX translateY  opacity  rotate
            switch (style) {
                case 'width':
                case 'height':
                case 'left':
                case 'top':
                case 'bottom':
                case 'right':
                case 'margin':
                case 'padding':
                    node.style[style] = res + 'px';
                    break;
                case 'translateX':
                case 'translateY':
                case 'translateZ':
                case 'translate':
                case 'rotateX':
                case 'rotateY':
                case 'rotate':
                case 'scale':
                case 'scaleX':
                case 'scaleY':
                    my.transformCSS(node, style, res);
                    break;
                case 'opacity':
                    node.style[style] = res;
                    break;
            }
            //4. 停止定时器
            if (t >= d) {
                clearInterval(node.timer[style]);
            }
        }, interval);
    };

    /**
     函数名
     TouchScroll
     功能:自定义滚动条
     使用示例
     var touchscroll = new TouchScroll('#app', '#content');

     参数
     *
     * @param outer  string   外层的容器元素
     * @param inner  string  内层的包裹元素
     * @constructor
     说明:
     scroll-bar 需要手动创建
     .scroll-bar{
            width:4px;
            height: 50px;
            background:rgba(0,0,0,0.7);
            position:absolute;
            right:0;
            top: 0;
            border-radius: 2px;
        }
     @dependence  依赖
     my.transformCSS
     my.tweenAnimation
     */
   w.my.touchScroll = function(outer, inner){
        var app = document.querySelector(outer);
        if(!app){
            return console.error('容器不能为空');
        }

        var content = app.querySelector(inner);
        var scrollBar = app.querySelector('.scroll-bar');

        function init(){
            //计算滚动条的高度
            window.addEventListener('load', function(){
                var h = app.offsetHeight * app.offsetHeight / content.offsetHeight;
                scrollBar.style.height = h + 'px';
                //设置容器元素为相对定位
                app.style.position = 'relative';
            })
        }
        init();

        //绑定事件
        app.addEventListener('touchstart', function (e) {
            scrollBar.style.opacity = ".7";
            this.y = e.changedTouches[0].clientY;
            this.top = my.transformCSS(content, 'translateY');
            this.startTime = Date.now();
            content.style.transition  = 'none';
            //停止定时器
            if(content.timer){
                clearInterval(content.timer.translateY);
            }
            if(scrollBar.timer){
                clearInterval(scrollBar.timer.top);
            }
        });

        //滑动
        app.addEventListener('touchmove', function (e) {
            scrollBar.style.opacity = ".7";
            this._y = e.changedTouches[0].clientY;
            var translateY = this._y - this.y + this.top;
            var maxTranslateY = 0;
            var minTranslateY = -(content.offsetHeight - app.offsetHeight);

            if(translateY >= maxTranslateY){
                translateY *= 1/2;
            }

            if(translateY <= minTranslateY){
                var disY = this._y - this.y;
                var distance = disY / 2;
                translateY = minTranslateY + distance;
            }

            //设置
            my.transformCSS(content, 'translateY', translateY);
            //设置 滚动条的 Y 轴的位置
            var size1 = translateY;
            var size2 = content.offsetHeight;
            var size4 = app.offsetHeight;
            var size3 = size1/size2 * size4;
            scrollBar.style.top = -size3 + 'px';
        });


        app.addEventListener('touchend', function (e) {
            scrollBar.style.opacity = "0";
            var initY,translateY;
            initY = translateY = my.transformCSS(content, 'translateY');
            var isOutBounding = false;//是否越界(主要内容区域是否越界)

            this._y = e.changedTouches[0].clientY;
            this.endTime = Date.now();

            //计算差值
            var disY = this._y - this.y;
            var disTime = this.endTime - this.startTime;

            var speed = disY / disTime;
            var distance = speed * 100;

            translateY += distance;

            var maxTranslateY = 0;
            var minTranslateY = -(content.offsetHeight - app.offsetHeight);
            var type = 'QuartEaseOut';
            //越界检测
            if(translateY >= maxTranslateY){
                translateY = maxTranslateY;
                type = 'BackEaseOut';
                isOutBounding = true;//超过最大值,改变状态变量,已越界
            }

            if(translateY <= minTranslateY){
                translateY = minTranslateY;
                type = 'BackEaseOut';
                isOutBounding = true;//超过最小值,改变状态变量,已越界
            }

            if(!isOutBounding){//取反值为false
                //如果没有越界,判读手指停留的时间,超过300毫秒,认定用户想停留在当前位置,不再惯性移动
                //反之,如果越界,代码不执行,执行下面的回弹动画
                if(Math.abs(disTime) >= 300)
                    return;
            }
                //动画切换
                my.tweenAnimation(content, 'translateY', initY, translateY, 500, 10, type);
                //对滚动条进行动画控制
                var size_1 = translateY;
                var size2 = content.offsetHeight;
                var size4 = app.offsetHeight;
                var size_3  = -size_1 / size2 * size4;
                var initTop = scrollBar.offsetTop;
                my.tweenAnimation(scrollBar, 'top', initTop, size_3, 500, 10, 'QuartEaseOut');
        });
    };
}(window);




