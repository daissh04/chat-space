$(document).on("turbolinks:load",function(){
  function buildMessage(message){ 
    var html =`<div class="chat-main__message__box">
    <p class="chat-main__message__box__user-name">${message.name}</p>
    <p class="chat-main__message__box__date">${message.created_at}</p>
    <p class="chat-main__message__box__text">${message.content}</p>
    <div id="lower-message__image"><img src=${message.image}></div>
    </div>`
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

      console.log(message)
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
});