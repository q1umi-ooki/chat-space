FactoryBot.define do
    factory :message do
        text {Faker::Lorem.sentence}
        image {File.open("#{Rails.root}/spec/fixtures/kishida-test.png")}
        user #t.references
        group #t.references
    end
end