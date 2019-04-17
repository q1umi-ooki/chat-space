$(function(){
    function buildHTML(message){
        let html = `<ul class="main__content__box">
        <li class="main__content__box__user">
            ${message.user_name}</li>
        <li class="main__content__box__dates">
            ${message.daytime}</li>
        <li class="main__content__box__text">
            <p class="main__content__box__text__text">
                ${message.text}</p></li>
            <img class="main__content__box__text__image" src="${message.image}"> 
    </ul>`
        return html;
    }  
   
    
    $(".chat-box").on('submit',function(e){
        e.preventDefault();
        let lastMessage = $('.main__content__box')
        if (lastMessage.length !==0 ){
        $(".main__content__box:last").removeClass('last-message');
        }
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
            let imageData = data.image;
            if (!imageData) {
            $('.main__content').append(html);
            $('.main__content__box__text__image').replaceWith('<p class="main__content__box__text__text"></p>')
            }
            else {
            $('.main__content').append(html);  
            }
            $('.main__content__box:last').addClass('last-message');  
            let targetY = $('.last-message').offset().top
            let targetHeight = $('.last-message').height()
            let target = targetY + targetHeight
            if (target > 650){
            $(".main__content").animate({scrollTop:target});
            }
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