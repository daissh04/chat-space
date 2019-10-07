FactoryBot.define do
  factory :message do
    content {Faker::Lorem.sentence}
    image {File.open("#{Rails.root}/public/images/20190827122929_IMG_2930.jpg")}
    user
    group
  end
end