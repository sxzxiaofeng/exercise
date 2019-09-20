# sxzxiaofeng.github.io
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>懒加载测试</title>
    <style>
        * {
            margin: 0;
            padding: 0;
        }

        ul {
            list-style: none;
        }



        #content {
            padding: 10px;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            position: relative;
        }

        #content .item {
            width: 44vw;
            height: 44vw;
            flex: none;
            border: solid 1px #ddd;
            margin-bottom: 20px;
        }

		#content .item img{
			width:100%;
		}

    </style>
</head>
<body>
<div id="app">
    <div id="content">
        <div class="item" data-src="https://picsum.photos/id/1/200/200">
            <img src="" alt="">
        </div>
        <div class="item" data-src="https://picsum.photos/id/2/200/200">
            <img src="" alt="">
        </div>
        <div class="item" data-src="https://picsum.photos/id/3/200/200">
            <img src="" alt="">
        </div>
        <div class="item" data-src="https://picsum.photos/id/4/200/200">
            <img src="" alt="">
        </div>
        <div class="item" data-src="https://picsum.photos/id/5/200/200">
            <img src="" alt="">
        </div>
        <div class="item" data-src="https://picsum.photos/id/6/200/200">
            <img src="" alt="">
        </div>
        <div class="item" data-src="https://picsum.photos/id/7/200/200">
            <img src="" alt="">
        </div>
        <div class="item" data-src="https://picsum.photos/id/8/200/200">
            <img src="" alt="">
        </div>
        <div class="item" data-src="https://picsum.photos/id/9/200/200">
            <img src="" alt="">
        </div>
        <div class="item" data-src="https://picsum.photos/id/10/200/200">
            <img src="" alt="">
        </div>
        <div class="item" data-src="https://picsum.photos/id/11/200/200">
            <img src="" alt="">
        </div>
        <div class="item" data-src="https://picsum.photos/id/12/200/200">
            <img src="" alt="">
        </div>
        <div class="item" data-src="https://picsum.photos/id/13/200/200">
            <img src="" alt="">
        </div>
        <div class="item" data-src="https://picsum.photos/id/14/200/200">
            <img src="" alt="">
        </div>
        <div class="item" data-src="https://picsum.photos/id/15/200/200">
            <img src="" alt="">
        </div>
        <div class="item" data-src="https://picsum.photos/id/16/200/200">
            <img src="" alt="">
        </div>
		<div class="item" data-src="https://picsum.photos/id/17/200/200">
            <img src="" alt="">
        </div>
		<div class="item" data-src="https://picsum.photos/id/18/200/200">
            <img src="" alt="">
        </div>
		<div class="item" data-src="https://picsum.photos/id/19/200/200">
            <img src="" alt="">
        </div>
		<div class="item" data-src="https://picsum.photos/id/20/200/200">
            <img src="" alt="">
        </div>
    </div>
    <div class="scroll-bar"></div>
</div>
<script>

    function  lazyLoad() {
        var items = document.querySelectorAll(".item");
        items.forEach(function (item) {
            //获取滚动条滚过去的距离
            var scrollTop = document.documentElement.scrollTop;
            //获取item距离文档顶部的距离
            var itemTop = item.offsetTop;
            //获取可视区域视口高度
            var h = document.documentElement.clientHeight;
            // var h = window.innerHeight;
            console.log(scrollTop,h);
            //如果图片进入可视区,则显示
            if(itemTop < scrollTop + h){
                var img = item.querySelector("img");
                //获取自定义属性的值,赋值给图片的src
                img.src = item.dataset.src;
            }
        })
    }
    lazyLoad();

    window.addEventListener("scroll",function () {
        lazyLoad();
    });

</script>
</body>
</html>
