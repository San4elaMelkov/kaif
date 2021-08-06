$( document ).ready(function() {
  class Player {
    constructor(id, name = '', number = 0, rate = 0) {
      this._id = id;
      this._name = name;
      this._number = number;
      this._rate = rate;
      this.renderPlayer();
    }

    set name(value) {
      if (value.length >= 0) {
        this._name = value;
        this.renderNamePlayer()
      } else {
        throw new DOMException("Incorrect player name");
      }
    }

    set number(value) {
      if (value > 0 && value < 7) {
        this._number = value;
        this.renderNumberPlayer()
      } else {
        throw new DOMException("Incorrect player number value ");
      }
    }

    set rate(value) {
      if (value >= 0) {
        this._rate = value;
        this.renderRatePlayer()
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

    renderPlayer() {
      this.renderNumberPlayer();
      this.renderNamePlayer();
      this.renderRatePlayer();
    }

    renderNumberPlayer() {
      playersNumberItems.eq(this._id).html(this._number);
      playersNumberItems.eq(this._id).trigger('change');
    }

    renderNamePlayer() {
      playersNameItems.eq(this._id).val(this._name);
      playersNameItems.eq(this._id).trigger('change');
    }

    renderRatePlayer() {
      playersRateItems.eq(this._id).html(this._rate);
      playersRateItems.eq(this._id).trigger('change');
    }
  }

  let playersNameItems = $('input[name^="player[name]"]');
  let playersRateItems = $('.rate__value span.value');
  let playersNumberItems = $('.player__number');
  let tableRate = $('#table_rate');
  let playerBalance = $('#player_balance');
  let bidValue = $('#bid_value');

  let _seconds = 25;


  let startCOntent = $("#start_content")
  let startButton = $("#start_game");

  let gameHelp = $("#game_help");

  bidValue.on('input', function () {
    if ($(this).val() > parseInt(playerBalance.html())){
      $(this).val(parseInt(playerBalance.html()));
    }
  });

  $('.bid__input .bid__button-plus').on('click', (event) => {
    event.preventDefault();
    let newValue = parseInt(bidValue.val()) + parseInt(tableRate.html());
    if (newValue <= parseInt(playerBalance.html())){
      bidValue.val(newValue);
    }
  });

  $('.bid__input .bid__button-minus').on('click', (event) => {
    event.preventDefault();
    let newValue = parseInt(bidValue.val()) - parseInt(tableRate.html());
    if (newValue >= 0){
      bidValue.val(newValue);
    }
  });


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
    let player  = new Player(i,);
    players.push(player);
  }

  startButton.on("click",  (event) => {
      event.preventDefault();
      showStartBlock();
      startGame($('#start_progress'));
      changeButton(startButton);
  });

  function startGame(progress) {
    let secondsItem = $("#start_descr");
    let startTitle = $("#start_title");
    let completeItem = progress.find($('.progress__complete'));

    setText(startTitle,"До начала игры осталось");
    setSeconds(secondsItem, _seconds);
    // Get percentage of progress
    let percent = progress.data('percentage');
    // Get radius of the svg's circle.complete
    let radius = completeItem.attr('r');
    // Get circumference (2πr)
    let circumference = 2 * Math.PI * radius;
    let strokeDashOffset = circumference - ((percent * circumference) / 100);

    completeItem.css('stroke-dasharray', (100 * circumference / 100));
    completeItem.css('stroke-dashoffset', 0);

    let s = _seconds;
    let secondsTimer = setInterval(() => {
        s--;
        setSeconds(secondsItem, s);
    }, 1000);

    completeItem.animate({'stroke-dashoffset': strokeDashOffset}, _seconds * 1000, () =>  {
      showPlayerNumber(Math.floor(Math.random() * 6));
      clearInterval(secondsTimer);
      changeButton(startButton);
    });

  }

  function setText(item, text) {
    item.html(text);
  }

  function setSeconds(item, text) {
    item.html(`${text} сек.`);
  }

  function showPlayerNumber(num) {
    gameHelp.removeClass('start').addClass('throw');
    gameHelp.html("").append(
      `<div class="throw__content">
        <div class="throw__blur-one"></div>
        <div class="throw__blur-two"></div>
        <h3 class="throw__title">${num}</h3>
        <p class="throw__descr">Вам выпало чило</p>
        <img src="img/dice-${num}.png" alt="Dice throw">
      </div>
    `);
  }

  showStartBlock('Ожидание игроков лобби', '<span>1</span>/4');
  function showStartBlock(title= '', desc = '') {
    gameHelp.removeClass('throw').addClass('start');
    gameHelp.html("").append(
      `<div class="start__content" id="start_content">
        <h3 class="start__title" id="start_title">${title}</h3>
        <p class="start__descr" id="start_descr">${desc}</p>
        <svg class="start__progress progress" id="start_progress" data-percentage="0" viewBox="0 0 160 160">
          <circle class="progress__circle progress__incomplete" cx="80" cy="80" r="80"></circle>
          <circle class="progress__circle progress__complete" cx="80" cy="80" r="80"></circle>
          <image class="progress__logo" x="20%" y="36%" href="img/sprite.svg#logo-ico" transform="matrix(0, 1, -1, 0, 160, 0)"/>
        </svg>
      </div>
    `);

  }

  function changeButton(element) {
    // console.log(!element.attr('disabled'));
    element.attr('disabled', !element.attr('disabled'));
  }
});
