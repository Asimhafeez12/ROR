# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
AdminUser.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password') if Rails.env.development? rescue nil
['NLP', 'Computer Vision', 'Deep Learning', 'Python', 'CNN', 'R',
 'RNN', 'Machine Learning', 'Data Science', 'Regression', 'Classfication'
].each { |val| ActsAsTaggableOn::Tag.find_or_create_by(name: val) }

#['English', 'Urdu'].each { |val| ActsAsTaggableOn::Tag.find_or_create_by(name: val) }


