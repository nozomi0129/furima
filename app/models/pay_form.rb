class PayForm
  include ActiveModel::Model
  #Active Recordの場合と同様に form_with や render などのヘルパーメソッドが使用できるようになる

  attr_accessor :item_id, :token, :postal_code, :prefecture_id, :city, :addresses, :building, :phone_number, :user_id
  # フォームオブジェクトで使用する値を定義している（読み書きができるようになっている）

  with_options presence: true do
    validates :item_id
    validates :token, presence: { message: "can't be blank" }
    validates :postal_code, format: { with: /\A\d{3}[-]\d{4}\z/, message: 'Input correctly' }
    validates :prefecture_id, numericality: { other_than: 0, message: 'Select' }
    validates :city
    validates :addresses
    validates :phone_number, length: { maximum: 11, message: 'Too long' }
    # 電話番号は入力フォームで制限してますが、一応つけています。
    validates :user_id
  end
  def save
    
    order = Order.create(
      item_id: item_id,
      user_id: user_id
    )

    Address.create(
      order_id: order.id,
      postal_code: postal_code,
      prefecture_id: prefecture_id,
      city: city,
      addresses: addresses,
      building: building,
      phone_number: phone_number
    )

    
  end

end