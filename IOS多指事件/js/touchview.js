function Touchview(selector) {
    //获取元素
    var box = document.querySelector(selector);
    gesture(box, {
        start: function (e) {
            //获取当前状态下的元素的显示比例
            this.originScale = transformCSS(box, 'scale');
            //获取box元素当前的旋转角度
            this.rotate = transformCSS(box, 'rotate');

            this.x = e.targetTouches[0].clientX;
            this.left = transformCSS(box, 'translateX');

            this.y = e.targetTouches[0].clientY;
            this.top = transformCSS(box, 'translateY');
        },
        change: function (e) {
            //设置显示比例
            transformCSS(box, 'scale', e.scale * this.originScale);
            //设置旋转角度
            transformCSS(box, 'rotate', this.rotate + e.rotation);
            this._x = e.targetTouches[0].clientX;
            var translateX = this._x - this.x + this.left;
            this._y = e.targetTouches[0].clientY;
            var translateY = this._y - this.y + this.top;
            //计算transform-origin 的位置
            var x = translateX + box.offsetWidth / 2;
            var y = translateY + box.offsetHeight / 2;
            //设置 transform-origin
            box.style.transformOrigin = x + 'px ' + y + 'px';
            transformCSS(box, 'translateX', translateX);
            transformCSS(box, 'translateY', translateY);
        }
    });
}