// WEATHER API
var loadweather = function() {
      // Montreal Location URL
      var forecastURL = "https://api.forecast.io/forecast/26dae662918aed65b1fe416e45c69348/45.5000,-73.5667";
      // AJAX Request
      $.ajax ({
        url: forecastURL,
        jsonpCallback: 'jsonCallBack',
        contentType: 'application/json',
        dataType: 'jsonp',
        success: function(json){
          var intTemp = parseInt(json.currently.temperature )
          var celcius = Math.round((intTemp - 32)*(5/9));
          var conditions = json.currently.summary;
          $('.mtlTemp').html(celcius + "&deg with " + conditions +". ");
        },

        // IDEA --> GRACEFUL DEGREDATIONS IF API FAILS. load entire insert at end of para so it's not noticeable.

        erroer: function(e){
          console.log(e.message);
        }
    });
  }

// MOVE SCREEN WITH KEYBOARD
var moveScreen = function(e) {
  e = e || window.event;
  if (e.keyCode == '38') {
  }
  else if (e.keyCode == '40') {
    // down arrow
  }
  else if (e.keyCode == '37') {
    // left arrow
  }
  else if (e.keyCode == '39') {
    // right arrow
  }
}

// ACTIVE TOGGLE FOR BUTTON SELECTION
var buttonActive = function(){
  $('button').click(function() {
    $(this).toggleClass('button-active');
    });
}

// TOGGLE ROTATION OF ROBOT
var rotateRobot = function(){
  var sliderValue = $('.slider-control').val() + 's';
  var cube = $('.cube');
  var playState = '-webkit-animation-play-state';
  var playStateMoz = '-moz-animation-play-state';
  var playStateMs = '-ms-animation-play-state';
  var playStateO = '-o-animation-play-state';
  var rotateControl = $('.rotate-control');

  cube.css('-webkit-animation-play-state', 'paused');
  cube.css('-moz-animation-play-state', 'paused');
  cube.css('-ms-animation-play-state', 'paused');
  cube.css('-o-animation-play-state', 'paused');

  rotateControl.click(function() {
    cube.css(playState, function(i, v) {
      return v === 'paused' ? 'running' : 'paused';
    });
      $('body').toggleClass('paused', $(this).css(playState) === 'paused');
      $('body').toggleClass('paused', $(this).css(playStateMoz) === 'paused');
      $('body').toggleClass('paused', $(this).css(playStateMs) === 'paused');
      $('body').toggleClass('paused', $(this).css(playStateO) === 'paused');
  });
}

// RENDER 3D OPTION FOR ROBOT
var renderRobot = function (){
  var heartHolder = $('.heartholder');
  var cube = $('.cube');
  var renderControl = $('.render-control');
  var onOffHolder = $('.onoffholder');

  heartHolder.removeClass('heart');
  onOffHolder.remove('.on-off');

  renderControl.click(function() {
    cube.toggleClass('preserve3D');
    heartHolder.toggleClass('heart');
    var onOffHolder = $('.onoffholder');

    // If cube doesn't have figure class="on-off" append one
    // else, do nothing.
    if (cube.find('figure.on-off').length === 0){
      cube.append(
        '<figure class="on-off onoffholder">'+
        '<img class="on-off-image" src="img/on-off.png"/>'+
        '<figure class="green-button"></figure>'+
        '</figure>' );
      heartReveal();
    } else {
        onOffHolder.remove('.on-off');
    }
  });
}

// HEART REVEAL ON HOVER OF ROBOT
var heartReveal = function(){
  var bodyBack = $('.body-back');
  var onOff = $('.on-off');
  var bodyFront = $('.body-front');
  var frontPanel = $('.front-panel');
    // Body-Back translate
  $('.stage').mouseenter(function()  {
    bodyBack.animate({  textIndent: -200 }, {
      step: function(now,fx) {
        $(this).css('-webkit-transform','translateZ('+now+'px)');
      },
        duration:'slow'
      },'linear');
  })
    .mouseleave(function() {
      var bodyBack = $('.body-back');
      bodyBack.animate({  textIndent: -66 }, {
      step: function(now,fx) {
        $(this).css('-webkit-transform','translateZ('+now+'px)');
        },
      duration:'slow'
    },'linear');
});

      // On Off Button on Back Translate
      $('.stage').mouseenter(function()  {
      onOff.animate({  overFlow: -203 }, {
          step: function(now,fx) {
            $(this).css('-webkit-transform','translateZ('+now+'px)','-webkit-transform','rotateY('+180+'deg)');
            $(this).css('-moz-transform','translateZ('+now+'px)','-moz-transform','rotateY('+180+'deg)');
            $(this).css('-ms-transform','translateZ('+now+'px)','-ms-transform','rotateY('+180+'deg)');
          },
          duration:'slow'
        },'linear');
      })
        .mouseleave(function() {
        onOff.animate({  overFlow: -70 }, {
          step: function(now,fx) {
            $(this).css('-webkit-transform','translateZ('+now+'px)');
          },
          duration:'slow'
        },'linear');
      });

    // Body Front Translate
    $('.stage').mouseenter(function()  {
      bodyFront.animate({  textIndent: 200 }, {
          step: function(now,fx) {
            $(this).css('-webkit-transform','translateZ('+now+'px)');
          },
          duration:'slow'
        },'linear');
      })
        .mouseleave(function() {
        bodyFront.animate({  textIndent: 66 }, {
          step: function(now,fx) {
            $(this).css('-webkit-transform','translateZ('+now+'px)');
          },
          duration:'slow'
        },'linear');
      });

      // Body Front  PANEL Translate
      $('.stage').mouseenter(function()  {
      frontPanel.animate({  textIndent: 203 }, {
          step: function(now,fx) {
            $(this).css('-webkit-transform','translateZ('+now+'px)');
          },
          duration:'slow'
        },'linear');
      })
        .mouseleave(function() {
        frontPanel.animate({  textIndent: 68 }, {
          step: function(now,fx) {
            $(this).css('-webkit-transform','translateZ('+now+'px)');
          },
          duration:'slow'
        },'linear');
      });
    }

// RUN FUNCTIONS WHEN DOCUMENT LOADED
$(document).ready(function(){
  loadweather();
  buttonActive();
  renderRobot();
  rotateRobot();
  moveScreen();
  heartReveal();
});