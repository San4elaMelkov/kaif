$( document ).ready(function() {
    $.map($('input[name^="player_name"]'), function (el, index) {
        console.log(`игрок ${index} - ${el.value}`);
    });

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
