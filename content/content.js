'use strict';
var logic = false;

$(document).ready(function () {
    var url = 'https://oauth.vk.com/authorize?client_id=5894587&display=page&redirect_uri=https://oauth.vk.com/blank.html&scope?friends&messages&photos&audio&video&status&wall&docs&groups&notifications&stats&email&response_type=token&v=5.52',
        tokken = '0d408457705dce0f9ce8ac6f1b91027ec967033d4a0e6012d80c0266b363bb3d9a0b971d011c66d1f556f';

    localStorage.setItem('Tokken', tokken); // записали токен в localstorage

    var storageTokken =  localStorage.getItem('Tokken'); // берём по ключу

    /** Получаем данные для Контента **/
    $.ajax({
        maethod: 'POST',
        url: 'https://api.vk.com/method/users.get?fields=photo_id,verified,sex,bdate,city,country,counters,home_town,has_photo,photo_50,photo_100,photo_200_orig,photo_200,photo_400_orig,photo_max,photo_max_orig,online,domain,has_mobile,contacts,site,education,universities,schools,status,last_seen,followers_count,common_count,occupation,nickname,relatives,relation,personal,connections,exports,wall_comments,activities,interests,music,movies,tv,books,games,about,quotes,can_post,can_see_all_posts,can_see_audio,can_write_private_message,can_send_friend_request,is_favorite,is_hidden_from_feed,timezone,screen_name,maiden_name,crop_photo,is_friend,friend_status,career,military,blacklisted,blacklisted_by_me&v=5.52&access_token=' + storageTokken,
        dataType : "jsonp"
    }).done(function (data) {
        var renderData = data.response[0];
        console.log('data', renderData);
        var userNameLastName = document.getElementsByClassName('last-name-name'),
            statusUser = document.getElementsByClassName('status'),
            dataUser = document.getElementsByClassName('data-user'),
            countFriends = document.getElementsByClassName('count_friends'),
            countMovies = document.getElementsByClassName('count_movies'),
            countAlbom = document.getElementsByClassName('count-albom'),
            countPhoto = document.getElementsByClassName('count_photo');

        for(var i = 0; i < userNameLastName.length; i++) {
            userNameLastName[i].innerHTML = renderData.first_name + ' '+ renderData.last_name;
        }
        for(var a = 0; a < dataUser.length; a++) {
            dataUser[a].innerHTML = renderData.bdate;
        }
        for(var c = 0; c < countFriends.length; c++) {
            countFriends[c].innerHTML = renderData.counters.friends;
        }
        for(var b = 0; b < countMovies.length; b++) {
            countMovies[b].innerHTML = renderData.counters.videos;
        }
        for(var g = 0; g < countAlbom.length; g++) {
            countAlbom[g].innerHTML = renderData.counters.albums;
        }
        for(var x = 0; x < countPhoto.length; x++) {
            countPhoto[x].innerHTML = renderData.counters.photos;
        }

        if(renderData.online === 0) {
            statusUser.innerHTML = 'Online';
        } else {
            statusUser.innerHTML = 'Offline';
        }

        var statusText = document.getElementsByClassName('status-text'),
            cityUser = document.getElementsByClassName('city-user'),
            img400 = document.getElementsByClassName('image_400'),
            img50 = document.getElementsByClassName('img_50'),
            countAudio = document.getElementsByClassName('count_audio'),
            countOnlineFriends = document.getElementsByClassName('count_online_friends'),
            countFollowers = document.getElementsByClassName('count_followers'),
            countMarks = document.getElementsByClassName('count_marks');

        statusText[0].innerHTML = renderData.status;
        cityUser[0].innerHTML = renderData.home_town;
        countAudio[0].innerHTML = renderData.counters.audios;
        countOnlineFriends[0].innerHTML = renderData.counters.online_friends;
        countFollowers[0].innerHTML = renderData.counters.followers;
        countMarks[0].innerHTML = renderData.counters.notes;
        img400[0].setAttribute('src', renderData.photo_400_orig);
        img50[0].setAttribute('src', renderData.photo_50);

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