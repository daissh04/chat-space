## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|index:true,null: false|
|e-mail|integer|null: false|

### Association
- has_many :user_groups
- has_many :groups, through: :user_group
- has_many :messages

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many:user_groups
- has_many :users, through: :user_group
- has_many :messages



## messageテーブル

|Column|Type|Options|
|------|----|-------|
|body|text||
|image|string||
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user



## user_groupテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|