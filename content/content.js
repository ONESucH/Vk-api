var logic = false;
var Token = 'https://oauth.vk.com/authorize?client_id=6154467&display=popup&scope=notify,friends,photos,audio,video,pages,status,notes,wall,ads,docs,groups,offline&redirect_uri=close.html&response_type=token';
var tokenRender = '0d6928f435c3c9389f97af5f24922d42d17e7cb2102a7833e6984e05872b1e2f687ab74a53dee340533eb';

localStorage.setItem('token', tokenRender);  // сохраняем в local Storage
var token = localStorage.getItem('token');  // извлекаем из local Storage

/** Получаем доступ к аккаунту **/
window.vkAsyncInit = function() {
    VK.init({apiId: 6154467});
    VK.Auth.login(function (data) {

        if (!data) {
            console.log('Нет данных');
            return false;
        } else if (data.status === 'connected') {
            // Получаем доступ к файлам
            var photoAll = document.createElement('script'),
                friendsAll = document.createElement('script'),
                groupAll = document.createElement('script'),
                album = document.createElement('script'),
                movies = document.createElement('script'),
                reposts = document.createElement('script');

            photoAll.src = 'https://api.vk.com/method/photos.getAll?owner_id='+ data.session.user.id +'&count=4&access_token='+ token +'&callback=photoUsers';
            friendsAll.src = 'https://api.vk.com/method/friends.get?user_id='+ data.session.user.id +'&order=random&fields=nickname,domain,sex,bdate,city,country,timezone,photo_50,photo_100,photo_200_orig,has_mobile,contacts,education,online,relation,last_seen,status,can_write_private_message,can_see_all_posts,can_post,universities&access_token='+ token +'&callback=friendsUsers';
            groupAll.src = 'https://api.vk.com/method/groups.get?user_id='+ data.session.user.id +'&extended=1&counte=5&order=random&fields=nickname,domain,sex,bdate,city,country,timezone,photo_50,photo_100,photo_200_orig,has_mobile,contacts,education,online,relation,last_seen,status,can_write_private_message,can_see_all_posts,can_post,universities&access_token='+ token +'&callback=groupsUsers';
            album.src = 'https://api.vk.com/method/photos.getAlbums?owner_id='+ data.session.user.id +'&album_ids=0&count=2&need_covers=1&photo_sizes=1&access_token='+ token +'&callback=albumUsers';
            movies.src = 'https://api.vk.com/method/video.get?owner_id='+ data.session.user.id +'&count=2&access_token='+ token +'&callback=moviesUsers';
            reposts.src = 'https://api.vk.com/method/wall.get?owner_id='+ data.session.user.id +'&post_id=1&count=5&extended=1&fields=nickname,domain,sex,bdate,city,country,timezone,photo_50,photo_100,photo_200_orig,has_mobile,contacts,education,online,relation,last_seen,status,can_write_private_message,can_see_all_posts,can_post,universities&access_token='+ token +'&callback=repostsUsers';

            document.getElementsByTagName('head')[0].appendChild(photoAll);
            document.getElementsByTagName('head')[0].appendChild(friendsAll);
            document.getElementsByTagName('head')[0].appendChild(groupAll);
            document.getElementsByTagName('head')[0].appendChild(album);
            document.getElementsByTagName('head')[0].appendChild(movies);
            document.getElementsByTagName('head')[0].appendChild(reposts);

            VK.Api.call('users.get', {user_ids:data.session.user.id, fields:'photo_id,verified,sex,bdate,city,country,home_town,has_photo,photo_50,' +
            'photo_100,photo_200_orig,photo_200,photo_400_orig,photo_max,photo_max_orig,online,domain,has_mobile,contacts,site,education,universities,' +
            'schools,status,last_seen,followers_count,common_count,occupation,nickname,relatives,relation,personal,connections,exports,wall_comments,activities,' +
            'interests,music,movies,tv,books,games,about,quotes,can_post,counters,can_see_all_posts,can_see_audio,can_write_private_message,can_send_friend_request,' +
            'is_favorite,is_hidden_from_feed,timezone,screen_name,maiden_name,crop_photo,is_friend,friend_status,career,military,blacklisted,' +
            'blacklisted_by_me', access_token:token, v:'5.68'}, function(r) {
                var dataUser = r.response;

                dataUser.forEach(function (item, i) {

                    if (data.status === 'connected') {
                        $('.status').text('Online');
                    } else {
                        $('.status').text('Offline');
                    }

                    $('.user-name').text(item.first_name);
                    $('.last-name').text(item.last_name);
                    $('.status-text').text(item.status);
                    $('.city-user').text(item.home_town);
                    $('.languages').text(item.personal.langs);
                    $('.last-name-name').text(item.first_name + item.last_name);
                    $('.img_50').attr('src', item.photo_50);
                    $('.image_400').attr('src', item.photo_400_orig);

                    /** Счетчики **/
                    $('.count_friends').text(item.counters.friends);
                    $('.count_followers').text(item.counters.followers);
                    $('.count_photo').text(item.counters.photos);
                    $('.count_marks').text(item.counters.notes);
                    $('.count_movies').text(item.counters.videos);
                    $('.count_online_friends').text(item.counters.online_friends);
                    $('.count-albom').text(item.counters.albums);
                })
            });
        } else if (data.status === 'not_authorized') {
            console.log('Вы зарегистрировались, но не разрешил доступ приложению');
        } else {
            console.log('Вы не зарегистрировались');
            return false;
        }

    });
};
setTimeout(function() {

    var el = document.createElement('script');
        el.type = 'text/javascript';
        el.src = 'https://vk.com/js/api/openapi.js?146';
        el.async = true;
        document.getElementById('vk_api_transport').appendChild(el);

}, 0);

/** Рендерим Репосты **/
function repostsUsers(result) {
    var a = 0;

    result.response.wall.forEach(function (item, i) {
        if(i > 0) {
            var geniratorDate = new Date(item.date);
            a++;

            var post = document.createElement('div'),
                // Top
                topPost = document.createElement('div'),
                topImg = document.createElement('img'),
                topNameBlock = document.createElement('ul'),
                topHref = document.createElement('a'),
                topShowBlock = document.createElement('ul'),
                topLi_1 = document.createElement('li'),
                topLi_2 = document.createElement('li'),
                showBlockLi_1 = document.createElement('li'),
                showBlockLi_2 = document.createElement('li'),
                // center
                postInformation = document.createElement('div'),
                titlePost = document.createElement('p'),
                pagePost = document.createElement('div'),
                postImg = document.createElement('img'),
                // footer
                footerPost = document.createElement('div');
                footerUlPage = document.createElement('ul');
                footerLike = document.createElement('li');
                footerComments = document.createElement('li');
                footerRepost = document.createElement('li');
                footerSearch = document.createElement('div');

            // Top
            topImg.setAttribute('src', result.response.profiles[0].photo); // центр
            // center
            if (item.attachment.photo) {
                postImg.setAttribute('src', item.attachment.photo.src_xbig);
            }

            // Добавляем классы основному контейнеру
            post.className = 'post';
            topPost.className = 'top-title';
            postInformation.className = 'post-information';
            footerPost.className = 'footer-post';

            // Вложенности
            // top
            topHref.innerHTML = '<i class="fa fa-ellipsis-h" aria-hidden="true"></i>';
            //footer
            footerSearch.innerHTML = '<i class="fa fa-eye" aria-hidden="true"></i><span>'+ item.likes.count +'</span>';
            footerLike.innerHTML = '<i class="fa fa-heart" aria-hidden="true"></i>Нравится<span>'+ item.likes.count +'</span>';
            footerComments.innerHTML = '<i class="fa fa-comment" aria-hidden="true"></i>Комментировать';
            footerRepost.innerHTML = '<i class="fa fa-bullhorn" aria-hidden="true"></i><span>'+ item.likes.can_publish +'</span>';

            //классы
            //top
            topNameBlock.className = 'user-name-last-name';
            topHref.className = 'show-user-block';
            topShowBlock.className = 'show-menu-post';
            topLi_2.className = 'data-user';
            //center
            postInformation.className = 'post-information';
            pagePost.className = 'page-post';
            //foter
            footerLike.className = 'footer-like';

            // Text
            // top
            topLi_1.innerText = result.response.profiles[0].first_name + ' ' + result.response.profiles[0].last_name;
            topLi_2.innerText = geniratorDate.getDate() + ' месяц ' + geniratorDate.getHours()+ ':' + geniratorDate.getMinutes();
            showBlockLi_1.innerText = 'Удалить запись';
            showBlockLi_2.innerText = 'Закрепить';
            // center
            titlePost.innerText = item.text;

            // Узлы
            // top
            topPost.append(topImg, topNameBlock, topHref, topShowBlock);
            topNameBlock.append(topLi_1, topLi_2);
            topShowBlock.append(showBlockLi_1, showBlockLi_2);
            //center
            pagePost.append(postImg);
            postInformation.append(titlePost, pagePost);
            //footer
            footerPost.append(footerUlPage, footerSearch);
            footerUlPage.append(footerLike, footerComments, footerRepost);

            // Добавляем узлы к основному контейнеру
            post.append(topPost, postInformation, footerPost);
            $('.all-posts').append(post);
        }
    });
}

/** Рендерим Видео **/
function moviesUsers(result) {

    $('#movies-album_1').attr('src', result.response[1].image);
    $('#movies-album_2').attr('src', result.response[2].image);
    $('#text-title_1').text(result.response[1].title);
    $('#text-title_2').text(result.response[2].title);

}

/** Рендерим Альбомы **/
function albumUsers(result) {
    result.response.forEach(function (item, i) {

        var imgAlbum = document.getElementsByClassName('img-albom')[i],
            countAlbum = document.getElementsByClassName('size-albom')[i],
            nameAlbum = document.getElementsByClassName('shadow-decoration')[i];

        imgAlbum.setAttribute('src', item.sizes[2].src);
        countAlbum.innerText = item.size;
        nameAlbum.innerText = item.title;

    })
}

/** Рендерим группы **/
function groupsUsers(result) {
    for(var i = 1; i < result.response.length; i++) {

        if (i < 6) {
            var group = document.getElementsByClassName('group')[0],
                groupMain = document.createElement('div'),
                divImg = document.createElement('div'),
                divName = document.createElement('div'),
                img = document.createElement('img'),
                nameGroup = document.createElement('p'),
                statusgroup = document.createElement('a');

            $('.count-group').text(result.response.length);

            img.setAttribute('src', result.response[i].photo_50);

            nameGroup.innerText = result.response[i].status;
            statusgroup.innerText = result.response[i].name;

            groupMain.className = 'group-main';
            divImg.className = 'photo-groups';
            divName.className = 'names-groups';

            divImg.appendChild(img);
            divName.append(statusgroup, nameGroup);
            groupMain.append(divImg, divName);
            group.appendChild(groupMain);
        }

    }
}

/** Рендерим Друзей **/
function friendsUsers(result) {
    for(var i = 0; i < result.response.length; i++) {

        if (result.response[0].online === 1 || $('.friends-page-online li').length < 6) {
            var friendsOnlineSpan = document.createElement('span'),
                friendsOnlineImg = document.createElement('img'),
                onlineFriends = document.createElement('li');

            friendsOnlineSpan.innerText = result.response[i].first_name;
            friendsOnlineImg.setAttribute('src', result.response[i].photo_50);

            onlineFriends.append(friendsOnlineSpan, friendsOnlineImg);
            $('.friends-page-online').append(onlineFriends);
        }
        if (i < 6) {
            var friends = document.createElement('li'),
                img = document.createElement('img'),
                span = document.createElement('span');

            span.innerText = result.response[i].first_name;
            img.setAttribute('src', result.response[i].photo_50);

            friends.append(span, img);
            $('.friends-page').append(friends);
        }

    }
}

/** Вставляем полученные картинки **/
function photoUsers(result) {

    for(var a = 1; a < result.response.length; a++) {
        var li = document.createElement('li'),
            href = document.createElement('a'),
            img = document.createElement('img');

        img.setAttribute('src', result.response[a].src_xbig);

        href.append(img);
        li.append(href);
        $('.main-photo-4').append(li);
    }

}

//  Показать подробную информацию
function showMenuMoreInformation () {
    logic = !logic;

    if(logic) {
        document.getElementsByClassName('true-logic')[0].style.display = 'block';
        document.getElementById('show-hide-block').innerText = 'Скрыть подробную информацию';
    } else {
        document.getElementsByClassName('true-logic')[0].style.display = 'none';
        document.getElementById('show-hide-block').innerText = 'Показать подробную информацию';
    }

}