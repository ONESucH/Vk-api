var logic = false;

$(document).ready(function () {
    var url = 'https://oauth.vk.com/authorize?client_id=5894587&display=page&redirect_uri=https://oauth.vk.com/blank.html&scope=friends&messages&photos&audio&video&status&wall&docs&groups&notifications&stats&email&response_type=token&v=5.52',
        tokken = '85ac061110884098a26535294c604b7ba3b63b7746140e760f3842556e5226553935df4bfcbd7330e7f1a'; // Полученный токен

    localStorage.setItem('Tokken', tokken); // записали токен в localstorage

    var storageTokken =  localStorage.getItem('Tokken'); // берём по ключу

    /** Получаем данные для Контента **/
    $.ajax({
        maethod: 'POST',
        url: 'https://api.vk.com/method/users.get?v=5.52&access_token=' + storageTokken,
        dataType : "jsonp"
    }).done(function (data) {
        var userNameLastName = document.getElementsByClassName('user-name')[1];

        userNameLastName.innerHTML = data.response[0].first_name + ' '+ data.response[0].last_name;

    });


});

function showMenuMoreInformation() {
    var mainBlock = $('.true-logic');
    logic = !logic;

    if(logic) {
        $('.more-information-user a').text('Скрыть подробную информацию');
        mainBlock.show();
    } else {
        $('.more-information-user a').text('Показать подробную информацию');
        mainBlock.hide();
    }
}