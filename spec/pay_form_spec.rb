require 'rails_helper'

RSpec.describe PayForm, type: :model do
  before do
    # buyer = FactoryBot.create(:user)
    # seller = FactoryBot.create(:user)
    user = FactoryBot.create(:user)
    item = FactoryBot.create(:item) #createでデータベースのデータを作りたいから buildだと作られない

    # item = FactoryBot.build(:item, user_id: seller.id)
    # item.image = fixture_file_upload('/sample.png', 'image/png') item.rbに定義すればいい。chat-app
    # item.save
    # @pay_form = FactoryBot.build(:pay_form, user_id: buyer.id, item_id: item.id)
    @pay_form = FactoryBot.build(:pay_form, user_id: user.id, item_id: item.id)
    #ファクトリーで作れない
  end
  describe '商品購入' do
    context '内容に問題ない場合' do
      it 'tokenと配送先の郵便番号と都道府県、市区町村、番地、建物名、電話番号が入力されていれば保存される' do
        expect(@pay_form.valid?).to eq true
      end
      it '建物名がなくても購入できる' do
        @pay_form.building = ''
        expect(@pay_form.valid?).to eq true
      end
    end
    context '内容に問題がある場合' do
      it 'token:必須' do
        @pay_form.token = ''
        @pay_form.valid?
        expect(@pay_form.errors.full_messages).to include("Token can't be blank")  
        #presence trueがcan't be  blank
      end
      it 'postal_code:必須' do
        @pay_form.postal_code = ''
        @pay_form.valid?
        expect(@pay_form.errors.full_messages).to include("Postal code can't be blank")
      end
      it 'postal_code:フォーマット' do
        @pay_form.postal_code = '1234567'
        @pay_form.valid?
        expect(@pay_form.errors.full_messages).to include("Postal code Input correctly")
      end
      it 'prefecture:必須' do
        @pay_form.prefecture = nil
        @pay_form.valid?
        expect(@pay_form.errors.full_messages).to include("Prefecture can't be blank")
      end
      it 'prefecture:0以外' do
        @pay_form.prefecture = 0
        @pay_form.valid?
        expect(@pay_form.errors.full_messages).to include("Prefecture Select")
      end
      it 'city:必須' do
        @pay_form.city = ''
        @pay_form.valid?
        expect(@pay_form.errors.full_messages).to include("City can't be blank")
      end
      it 'addresses:必須' do
        @pay_form.addresses = ''
        @pay_form.valid?
        expect(@pay_form.errors.full_messages).to include("Addresses can't be blank")
      end
      it 'phone_number:必須' do
        @pay_form.phone_number = ''
        @pay_form.valid?
        expect(@pay_form.errors.full_messages).to include("Phone number can't be blank")
      end
      it 'phone_number:11桁以内' do
        @pay_form.phone_number = '1234567891011'
        @pay_form.valid?
        expect(@pay_form.errors.full_messages).to include("Phone number Too long")
      end
      it 'phone_number:数字のみ' do
        @pay_form.phone_number = '123-567-890'
        @pay_form.valid?
        expect(@pay_form.errors.full_messages).to include("Phone number Input only number")
      end
    end
  end
end
