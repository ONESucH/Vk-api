'use strict';

$(document).ready(function () {
    var storageTokken =  localStorage.getItem('Tokken'); // берём по ключу

    /** Получаем данные в Header **/
    $.ajax({
        maethod: 'POST',
        url: 'https://api.vk.com/method/users.get?v=5.52&access_token=' + storageTokken,
        dataType : "jsonp"
    }).done(function (data) {
        var userName = document.getElementsByClassName('user-name')[0];

        userName.innerHTML = data.response[0].first_name;

    });


});