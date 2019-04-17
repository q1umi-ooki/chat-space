$(function(){
    function buildHTML(message){
        let imageHtml = message.image == null ? "" : `<img src="${message.image}">`
        let html = `<ul class="main__content__box">
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
            $('.main__content__box:last').addClass('last-message');  
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

});
