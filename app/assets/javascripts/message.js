$(function(){

    function buildHTML(message){
        let imageHtml = message.image == null ? "" : `<img src="${message.image}">`
        let html = `<ul class="main__content__box" data-message-id="${message.id}">
        <li class="main__content__box__user">
            ${message.user_name}</li>
        <li class="main__content__box__dates">
            ${message.daytime}</li>
        <li class="main__content__box__text">
            <p class="main__content__box__text__text">
                ${message.text}</p>${imageHtml}</li> 
    </ul>`
        return html;
    }      
    
    $(".chat-box").on('submit',function(e){
        e.preventDefault();
        let formData = new FormData(this);
        let url = $(".chat-box").attr('action');
        $.ajax({
            url: url,
            type: 'POST',
            data:  formData,
            dataType: 'json',
            processData: false,
            contentType: false
        })
        .done(function(data){
            let html = buildHTML(data);
            $('.main__content').append(html);  
            $(".main__content").animate({scrollTop:$(".main__content")[0].scrollHeight});
            $('.chat-box__text').val('');
        })
        .fail(function(){
            alert('メッセージが上手く送信されませんでした')
        })
        .always(function(){         
          $(".chat-box__send").removeAttr('disabled'); 
        })
    });
     let reloadMessages = function() {
        let groupId = $('.group-content__detail').data('group-id');
        let lastMessageId = $('.main__content__box:last').data('message-id');

        $.ajax({
            url: ` /groups/${groupId}/api/messages`,
            type: 'get',
            dataType: 'json',
            data: {id: lastMessageId}
        })
        .done(function(messages) {
            messages.forEach(function(message){
                let html = buildHTML(message);
                $('.main__content').append(html);
            });
        })
        .always(function(){
            $(".main__content").animate({scrollTop:$(".main__content")[0].scrollHeight});
        })
      };
      
      setInterval(reloadMessages, 3000);
});
