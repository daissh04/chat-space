json.array! @chat_member do |member|
  json.id member.id
  json.name member.name
  json.email member.email
end