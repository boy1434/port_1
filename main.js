$(function() {
    randomNum();
    play();
});

let comNum = 0;
let chance = 5;
function randomNum() {
    comNum = Math.floor(Math.random() * 100) +1;
    console.log(comNum);
}
function play() {
    let go_btn = $('.go_btn');
    let reset_btn = $('.reset_btn');
    let result = $('.result');

    go_btn.on('click', function() {
        let userNum = parseInt($('.user_num').val());
        if(isNaN(userNum)) {
            result.text("유효한 숫자를 입력해주세요");
            result.css('color', 'red');
            return;
        }
        if(userNum < comNum) {
            result.text("랜덤 숫자는 더 높은 숫자 입니다.");
            result.css('color', 'red');
            chance--;
            $('.user_num').val('');
        }
        else if(userNum > comNum) {
            result.text("랜덤 숫자는 더 낮은 숫자 입니다.");
            result.css('color', 'red');
            chance--;
            $('.user_num').val('');
        }
        else if(userNum == comNum){
            result.text("정답 입니다!");
            result.css('color', 'green');
            go_btn.prop('disabled', true);
            reset_btn.css('opacity', '1');
        }
        chanceUpdate();

        if(chance <= 0) {
            result.text("GAME OVER!");
            go_btn.prop('disabled', true);
            $('.chance').css('display', 'none');
            reset_btn.css('opacity', '1');
        }
    });
    reset_btn.on('click', function() {
        $(this).css('opacity', '0');
        chance = 5;
        chanceUpdate();
        result.text("게임 시작!").css('color','black');
        $('.user_num').val('');
        go_btn.prop('disabled', false);
        randomNum();
    });
}
function chanceUpdate() {
    $('.chance').text(`Chance: ${chance}`);
}