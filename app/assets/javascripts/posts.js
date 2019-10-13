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

$(document).on("turbolinks:load",function(){
  var search_list = $('#user-search-result');
  function appendMember(members){
  var html = `<div id="user-search-result">
    <div class="chat-group-user clearfix">
      <p class="chat-group-user__name">${members.name}</p>
      <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${members.id} data-user-name=${members.name}>追加</a>
    </div>
  </div>`
  search_list.append(html);
  }

  function appendErrMsgToHTML(error){
    var html = `<div id="user-search-result">
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${error}</p>
    </div>`
    search_list.append(error);
    }

  function addMember(user,id){
    var memberHtml = `<div id="user-search-result">
    <div class="chat-group-user clearfix">
      <input name="group[user_ids][]" type="hidden" value='${id}'>
      <p class="chat-group-user__name">${user}</p>
      <a class="user-search-add chat-group-user__btn chat-group-user__btn--remove" js-remove-btn'>削除</a>
    </div>
  </div>`
  $('.member__list').append(memberHtml)
  }

$(function(){
  $('#user-search-field').on("keyup", function(){
    var input = $('#user-search-field').val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input},
      dataType: 'json'
    })

    .done(function(members){
      $('#user-search-result').empty();
      if (members.length !==0){
        members.forEach(function(members){
          appendMember(members);
        });
      }
      else{
        appendErrMsgToHTML("一致するメンバーはいません");
      }
    })
  })
})

$('#user-search-result').on('click', '.chat-group-user__btn--add', 
function(){
  var user = $(this).data('user-name');
  var id = $(this).data('user-id');
  addMember(user, id)
  $(this).parent().remove()
});

$('.member__list').on('click', '.chat-group-user__btn--remove', 
function(){
  $(this).parent().remove()
});

});


