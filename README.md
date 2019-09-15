## usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_name|integer|null: false|
|e-mail|integer|null: false|

- has_many :groups, through: :user_group
- has_many :messages

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|group_name|string|null: false|

- has_many :users, through: :user_group
- has_many :messages

## messageテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|image|string||
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|

- belongs_to :group
- belongs_to :user

## user_groupテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
