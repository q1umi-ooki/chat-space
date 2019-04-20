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
        <input name='group[user_ids][]' type='hidden' value='${userId}'>
        <p class='chat-group-user__name' data-id='${userId}'>${userName}</p>
        <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
      </div>`
      addMember.append(html);
    }

    let memberId = $('.chat-group-user__name').data('id')
    console.log(memberId);

    //あらかじめ存在しているメンバーの削除アクション 
    $('.user-search-remove').on('click',function(){
        $(this).parents('.chat-group-user').remove();
    })

    $('#user-search-field').on('keyup',function(){
        $('#add-user').empty();
        let input = $('#user-search-field').val(); 
        let inputWhiteSpace = input.split(" ").filter(function(e){
            return e;
        })
        let groupId = $('#chat-group-users').data('group-id')
        console.log(groupId);     
        if (input !== "" && inputWhiteSpace) {
            $.ajax({
                type: 'GET',
                url: '/users',
                data: {name: input, group_id: groupId},
                dataType: 'json'
            })
            .done(function(users){
                console.log(users.ids)
                if (users.length !== 0) {
                    console.log(users.length !== 0);
                    users.forEach(function(user){
                        console.log(user);
                        console.log(user.name);
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
//追加アクション
    $(document).on('click','.user-search-add',function(){
        let selectedMemberId = $(this).data('user-id');
        let selectedMemberName = $(this).data('user-name');
        $(this).parents('.chat-group-user').remove();
        addGroupMember(selectedMemberId, selectedMemberName);
        let memberId = $('.chat-group-user__name').data('id');
        console.log(memberId); 
    });
    
//javaScript追加の削除アクション
    $(document).on('click','.user-search-remove',function(){
        $(this).parents('.chat-group-user').remove();
    });

    
});

