var logic = false;

$(document).ready(function () {
    var url = 'https://oauth.vk.com/authorize?client_id=5894587&display=page&redirect_uri=https://oauth.vk.com/blank.html&scope=friends&messages&photos&audio&video&status&wall&docs&groups&notifications&stats&email&response_type=token&v=5.52',
        tokken = '3a2098e4d9baeee7de57528480b312ddad8d5546193e156d6de28dfb80a168ad3f94cdf410b578dc78ee4'; // Полученный токен

    localStorage.setItem('Tokken', tokken); // записали токен в localstorage

    var storageTokken =  localStorage.getItem('Tokken'); // берём по ключу

    /** Получаем данные для Контента **/
    $.ajax({
        maethod: 'POST',
        url: 'https://api.vk.com/method/users.get?fields&v=5.52&access_token=' + storageTokken,
        dataType : "jsonp"
    }).done(function (data) {

        console.log('data', data);

        var userNameLastName = document.getElementsByClassName('last-name-name'),
            dataUser = document.getElementsByClassName('data-user');

        for (var i = 0; i < userNameLastName.length; i++) {
            userNameLastName[i].innerHTML = data.response[0].first_name + ' '+ data.response[0].last_name;
            dataUser.innerHTML = data.response[0].data;
        }

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