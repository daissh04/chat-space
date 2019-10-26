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
      <a class="user-search-add chat-group-user__btn chat-group-user__btn--remove js-remove-btn">削除</a>
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

$('.member__list').on('click', '.js-remove-btn', 
function(){
  $(this).parent().remove()
});

});
