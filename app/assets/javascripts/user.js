$(function(){
    let searchBox = $('#add-user');   
    function appendUser(user){ 
        let html = `<div class="chat-group-user clearfix">
        <p class="chat-group-user__name" data-id='${user.id}'>${user.name}</p>
        <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
      </div>`
      searchBox.append(html);
    }
    
    function appendErrMsgToHTML(message){
        let html=`<div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${message}</p>
        </div>`
      searchBox.append(html);
    }

    function addGroupMember(userId, userName){
        let addMember = $('#add-group-users');
        let html = `<div class='chat-group-user clearfix js-chat-member' data-id='${userId}' data-name='${userName}'>
        <input class='group_user_ids' name='group[user_ids][]' type='hidden' value='${userId}'>
        <p class='chat-group-user__name' data-id='${userId}'>${userName}</p>
        <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
      </div>`
      addMember.append(html);
    }

    $('.user-search-remove').on('click',function(){
        $(this).parents('.chat-group-user').remove();
    })

    $('#user-search-field').on('keyup',function(){
        $('#add-user').empty();
        let input = $('#user-search-field').val(); 
        let inputWhiteSpace = input.split(" ").filter(function(e){
            return e;     
        })
        
        if (input !== "" && inputWhiteSpace) {
            $.ajax({
                type: 'GET',
                url: '/users',
                data: {name: input},
                dataType: 'json'
            })
            .done(function(users){
                if (users.length !== 0) {
                    users.forEach(function(user){
                        appendUser(user);
                    });
                } else {
                    appendErrMsgToHTML('一致するユーザーが見つかりません')
                }
            })
            .fail(function(users){
                alert('ユーザー検索に失敗しました。')
            })
           }
    });

    $(document).on('click','.user-search-add',function(){
        let userId = $(this).data('user-id');
        let userName = $(this).data('user-name');
        $(this).parents('.chat-group-user').remove();
        addGroupMember(userId, userName);
    });
    

    $(document).on('click','.user-search-remove',function(){
        $(this).parents('.chat-group-user').remove();
    });

    
});

