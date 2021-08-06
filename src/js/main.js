$( document ).ready(function() {
  class Player {
    constructor(id, name = '', number = 0, rate = 0) {
      this._id = id;
      this._name = name;
      this._number = number;
      this._rate = rate;
    }

    set name(value) {
      if (value.length >= 0) {
        this._name = value;
        this.renderNamePlayers()
      } else {
        throw new DOMException("Incorrect player name");
      }
    }

    set number(value) {
      if (value > 0 && value < 7) {
        this._number = value;
        this.renderNumberPlayers()
      } else {
        throw new DOMException("Incorrect player number value ");
      }
    }

    set rate(value) {
      if (value >= 0) {
        this._rate = value;
        this.renderRatePlayers()
      } else {
        throw new DOMException("Incorrect player rate value ");
      }
    }

    get name() {
      return this._name;
    }

    get number() {
      return this._number;
    }

    get rate() {
      return this._rate;
    }

    renderNumberPlayers() {
      playersNumberItems.eq(this._id).html(this._number);
      playersNumberItems.eq(this._id).trigger('change');
    }

    renderNamePlayers() {
      playersNameItems.eq(this._id).val(this._name);
      playersNameItems.eq(this._id).trigger('change');
    }

    renderRatePlayers() {
      playersRateItems.eq(this._id).html(this._rate);
      playersRateItems.eq(this._id).trigger('change');
    }
  }

  let playersNameItems = $('input[name^="player[name]"]');
  let playersRateItems = $('.rate__value span.value');
  let playersNumberItems = $('.player__number');

  let players = [];

  $.map(playersNameItems, function (element, index) {
    let el = $(element);
    el.on('change', function () {
      if (el.val() == '') {
        addInactivePlayerItems(index);
      } else {
        deleteInactivePlayerItems(index);
      }
    });
  });

  function deleteInactivePlayerItems(id){
    playersNameItems.eq(id).removeClass('player__name-inactive');
    $('.player__rate').eq(id).removeClass('rate-inactive');
    playersNumberItems.eq(id).removeClass('player__number-inactive');
  }

  function addInactivePlayerItems(id){
    playersNameItems.eq(id).addClass('player__name-inactive');
    $('.player__rate').eq(id).addClass('rate-inactive');
    playersNumberItems.eq(id).addClass('player__number-inactive');
  }

  for (let i = 0; i < 4; i++) {
    let player  = new Player(i);
    players.push(player);
  }

  players[0].name = '';

  let _seconds = 25;

  let secondsItem = $("#start_descr");

  let startButton = $("#start_game");

  let progressItem = $('#start_progress');


  startButton.on("click",  (event) => {
      event.preventDefault();
      startGame(progressItem);
      changeButton(startButton);
  });

  function startGame(progress) {
    let completeItem = progress.find($('.progress__complete'));

    // Get percentage of progress
    let percent = progress.data('percentage');
    // Get radius of the svg's circle.complete
    let radius = completeItem.attr('r');
    // Get circumference (2πr)
    let circumference = 2 * Math.PI * radius;
    let strokeDashOffset = circumference - ((percent * circumference) / 100);

    completeItem.css('stroke-dasharray', ((100 * circumference) / 100));

    let s = _seconds;

    let secondsTimer = setInterval(() => {
        s--;
        setSeconds(secondsItem, s);
    }, 1000);

    completeItem.animate({'stroke-dashoffset': strokeDashOffset}, _seconds * 1000, () =>  {
        showPriz();
        clearInterval(secondsTimer);
        changeButton(startButton);
    });

  }

  function setSeconds(item, text) {
      item.html(`${text} сек.`);
  }

  function showPriz() {
      console.log("complete");
  }

  function changeButton(element) {
      element.attr('disabled', !element.attr('disabled'));
  }
});
