FactoryBot.define do
  factory :pay_form do
    token { 'sampletokensampletoken' }
    postal_code { '123-4567' }
    prefecture { 1 }
    city { '東京都' }
    addresses { '1-1' }
    phone_number { '09012345678' }
    building {'ビディルディング'}

    # user_id { 1 } #←架空  でもデータが本当にあるわけではないのでテストの信頼性的に良くない
    # item_id { 1 } #←架空  でもデータが本当にあるわけではないのでテストの信頼性的に良くない

    # association :user
    # association :item ←アソシエーション組めるのはmodel同士。formオブジェクトとは無理。
    #ここはpay_form.rbのバリデーション確認。
  end
end