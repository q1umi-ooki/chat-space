$(function(){


    function buildHTML(message){
        let imageHtml = message.image == null ? "" : `<img src="${message.image}">`
        let html = `<ul class="main__content__box" data:{message_id: ${message.id}}>
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
    function buildReloadHTML(message){
        let imageHtml = message.image == null ? "" : `<img src="${message.image}">`
        let html = `<ul class="main__content__box" data:{message_id: ${message.id}}>
        <li class="main__content__box__user">
            ${message.user_name}</li>
        <li class="main__content__box__dates">
            ${message.daytime}</li>
        <li class="main__content__box__text">
            <p class="main__content__box__text__text">
                ${message.text}</p>${imageHtml}</li> 
    </ul>`
        $('.main__content').append(html);
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
            // $('.main__content__box:last').addClass('last-message');  
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
        //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
        let groupId = $('.group-content__detail').data('group-id');
        let last_message = $('.main__content__box:last');
        let last_message_id = last_message.data('message-id');
        last_message.addClass('last-message');

        $.ajax({
          //ルーティングで設定した通りのURLを指定
          url: ` /groups/${groupId}/api/messages`,
          //ルーティングで設定した通りhttpメソッドをgetに指定
          type: 'get',
          dataType: 'json',
          //dataオプションでリクエストに値を含める
          data: {id: last_message_id}
        })
        .done(function(messages) {
          console.log('success');
          messages.forEach(function(message){
          buildReloadHTML(message);
          $(".main__content").animate({scrollTop:$(".main__content")[0].scrollHeight});
          });
        })
        .fail(function() {
          console.log('error');
        });
      };
      setInterval(reloadMessages, 5000);
});
