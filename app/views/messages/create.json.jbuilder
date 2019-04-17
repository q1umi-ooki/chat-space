json.user_name @message.user.name 
json.daytime @message.created_at.strftime("%Y/%m/%d %H:%M")
json.text @message.text
json.image @message.image.url