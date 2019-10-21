$(document).on("turbolinks:load",function(){
  function buildMessage(message){ 
    var addImage = (message.image.url !== null)? `<div id="lower-message__image"><img src=${message.image.url}></div>` :''
    var html = `<div class="chat-main__message__box" data-message-id='${message.id}'>
    <p class="chat-main__message__box__user-name">${message.name}</p>
    <p class="chat-main__message__box__date">${message.created_at}</p>
    <p class="chat-main__message__box__text">${message.content}</p>
    ${addImage}
    </div>`;
  return html;
  }

  $('#new_message').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    console.log(formData)
    $.ajax({
      url: url,
      type: "post",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){

      var html = buildMessage(message)
      $('.chat-main__message').append(html)
      $('.chat-main__form__new-message__text').val('')
      $('.chat-main__form__new-message__btn').attr("disabled", false)
      $('.chat-main__message').animate({ scrollTop: $('.chat-main__message')[0].scrollHeight })
    })
    .fail(function(){
      alert('エラー')
    })
  })
    
    reloadMessages = function() {
      if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.chat-main__message__box:last').data('message-id')
      var group_id = $('.chat-main__main-header__left-box').data('group-id')
      var href = `/groups/${group_id}/api/messages`
      $.ajax({
        url: href,
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        if(messages.length !==0){
          messages.forEach(function(messages){
            buildMessage(messages)
            var html = buildMessage(messages)
            console.log(html)
            $('.chat-main__message').append(html)
            $('.chat-main__message').animate({ scrollTop: $('.chat-main__message')[0].scrollHeight })
          })
        }
      })
      .fail(function() {
        alert('エラー');
      })
      }
    }
    setInterval(reloadMessages, 5000);
});



