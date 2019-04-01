# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
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
|group_name|string|null: false, unique: true|

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
- has_many :users
- has_many :groups


***

## 4.chatsテーブル

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
