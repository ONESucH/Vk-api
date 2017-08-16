$(document).ready(function () {
    var url = 'https://oauth.vk.com/authorize?client_id=5894587&display=page&redirect_uri=https://oauth.vk.com/blank.html&scope=friends&response_type=token&v=5.52',
        tokken = 'c36d83e6754367880db7c4e52ebd7b461cc28c4e54c7c0ac0ce5493b42a6dfcf089ccaedb4995e5dabf7f'; // Полученный токен

    localStorage.setItem('Tokken', tokken); // записали токен в localstorage

    var storageTokken =  localStorage.getItem('Tokken'); // берём по ключу

    // localStorage.removeItem('Tokken') // Удалить ил Localstorage

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