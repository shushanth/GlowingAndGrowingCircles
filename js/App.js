var App = (function() {



    'use strict';

    /*Module pattern*/

    /*private methods and varibales*/

    /*jquery Selectors for class*/


    var _prClass = function(element) {

        return $('.' + element);
    }

    /*jquery Selectors for Id's*/

    var _prId = function(element) {

        return $('#' + element);
    }

    /*randome values generation*/

    var _getRandomValues = function(param) {

        return Math.round(Math.random() * param);

    }


    /*basic data*/

    var _prRGB = {

        R: 255,
        G: 255,
        B: 255,
        opacity: 1,
        createTime: 0,
        clearTime: 0,
        increaseTime: 0,
        increaseSize: 40,
        brightness:0.3,
        basicTimes: 3

    }

    /*basic  element data*/

    var _prElementData = {

        canvasElement: _prClass('maincanvas'),
        dispCanvasElement:_prClass('updatecanvas'),
        canvasElementWidth: _prClass('maincanvas').width(),
        canvasElementHeight: _prClass('maincanvas').height(),
        positionElement: _prId('pos'),
        positionElementSize: _prId('size'),
        positionElementBrightness:_prId('brightness'),
        positionElementMaxValue: parseInt(_prId('pos')[0].max),


    }


    /*Circles generation and deletion based on value*/

    var _prCreateCircle = function(W, H, R, G, B, value, radVal,brightVal) {

        var canvasElement = _prElementData.canvasElement;
        var context = canvasElement[0].getContext('2d');
        context.beginPath();
        context.arc(W, H, radVal, 0, 2 * Math.PI, false);

        if (value === 'create') {
            context.fillStyle = 'rgba(' + R + ',' + G + ',' + B + ','+brightVal+')';
            context.closePath();
            context.fill();
        }

        if (value === 'clear') {
            context.save();
            context.globalCompositeOperation = 'destination-out';
            context.fillStyle = '#ffffff';
            context.fill();
            context.restore();
        }

    }

    //getspeed if the range changes ,

    var _prIncrease = function() {
        setInterval(function() {
            _prRGB.increaseTime = _prElementData.positionElementMaxValue - _prElementData.positionElement.val();
            _prRGB.increaseSize = _prElementData.positionElementSize.val();
            _prRGB.brightness=_prElementData.positionElementBrightness.val()/100;
        }, _prRGB.basicTimes);

        return _prRGB;
    }

    /*Random construct circles*/

    var _prRandomCircle = function(value) {
        if (value) {

            var increase = _prIncrease();
            _prRGB.createTime = setTimeout(function() {
            _prConstructCircle('create', increase.increaseSize,increase.brightness);
            _prRandomCircle(true);
            _prClass('start').prop('disabled', true);

            }, increase.increaseTime);

        } else {
            _prClass('start').prop('disabled', true);
            clearInterval(_prRGB.createTime);
        }
    }


    /*construct of circles*/
    var _prConstructCircle = function(value, radiusVal,brightVal) {

        var _prAllRandomValues = {
            randomWidth: _getRandomValues(_prElementData.canvasElementWidth),
            randomHeight: _getRandomValues(_prElementData.canvasElementHeight),
            randomR: _getRandomValues(_prRGB.R),
            randomG: _getRandomValues(_prRGB.G),
            randomB: _getRandomValues(_prRGB.B)
        }
        _prCreateCircle(_prAllRandomValues.randomWidth, _prAllRandomValues.randomHeight, _prAllRandomValues.randomR, _prAllRandomValues.randomG, _prAllRandomValues.randomB, value, radiusVal,brightVal);
       
    }   

    /*clear of circles*/
    var _prClearCircles = function(value) {

        if (value) {
            _prRGB.clearTime = setInterval(function() {
                _prConstructCircle('clear', _prRGB.increaseSize);

            }, _prRGB.basicTimes);

        } else clearInterval(_prRGB.clearTime);

    }

   
    return {

        initStart: function() {

            _prClass('start').on('click', function() {
                _prRandomCircle(true);
                _prClearCircles(false);
                _prClass('clear').show();

            })

            _prClass('stop').on('click', function() {
                _prRandomCircle(false);
                _prClass('start').prop('disabled', false);
            })

            _prClass('clear').on('click', function() {
                _prRandomCircle(false);
                _prClearCircles(true);
                _prClass('start').prop('disabled', false);
            })
        }
    }

})();


/*kickOff the  mechanism*/
App.initStart();