# README

# Chat-Space データベース設計案
## 合計4つのテーブルを作成しようと思います。
***
## 1.usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true|
|email|string|null:false, unique: true|
|password|string|null:false|

### Association
- has_many :chats
- has_many :members
- has_many :groups, through: :members

***

## 2.groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true|

### Association
- has_many :members
- has_many :users, through: :members
- has_many :chats

***

## 3.membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|references|foreign_key: true|
|group_id|references|foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group


***

## 4.messagesテーブル

|Column|Type|Options|
|------|----|-------|
|text|text|null: true|
|image|string|null: true|
|user_id|references|foreign_key: true|
|group_id|refernces|foreign_key: true|


### Association
- belongs_to :user
- belongs_to :group


***
