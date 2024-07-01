$(function() {
    randomNum();
    play();
});

let comNum = 0;
let chance = 7;

function randomNum() {
    comNum = Math.floor(Math.random() * 50) + 1;
    console.log(comNum);
}

function play() {
    let go_btn = $('.go_btn');
    let reset_btn = $('.reset_btn');
    let result = $('.result');
    let hangmanParts = $('.hangman span'); // hangman 파트의 모든 span 태그 선택

    go_btn.on('click', function() {
        $('.chance').css('display', 'block');
        let userNum = parseInt($('.user_num').val());
        if (isNaN(userNum)) {
            result.text("1부터 50 사이의 숫자를 입력해 주세요");
            result.css('color', 'red');
            return;
        }
        if (userNum < comNum) {
            result.text("랜덤 숫자는 더 높은 숫자입니다.");
            result.css('color', 'red');
            chance--;
            showHangMan(chance);
            $('.user_num').val('');
        } else if (userNum > comNum) {
            result.text("랜덤 숫자는 더 낮은 숫자입니다.");
            result.css('color', 'red');
            chance--;
            showHangMan(chance);
            $('.user_num').val('');
        } else if (userNum === comNum) {
            result.text("정답입니다!");
            result.css('color', 'green');
            go_btn.prop('disabled', true);
            reset_btn.css('opacity', '1');
        }
        chanceUpdate();

        if (chance <= 0) {
            result.text("GAME OVER!");
            go_btn.prop('disabled', true);
            $('.chance').css('display', 'none');
            reset_btn.css('opacity', '1');
        }
    });

    reset_btn.on('click', function() {
        $(this).css('opacity', '0');
        chance = 7;
        chanceUpdate();
        result.text("게임 시작!").css('color', 'black');
        $('.user_num').val('');
        go_btn.prop('disabled', false);
        randomNum();
        hangmanParts.css('display', 'none'); // 모든 hangman span 태그 숨기기
    });
}

function chanceUpdate() {
    $('.chance').text(`Chance: ${chance}`);
}

function showHangMan(chance) {
    $(`.hangman-part-${7 - chance}`).css('display', 'block');
}
