require 'rails_helper'

describe MessagesController do 
    let(:group) {create(:group)} #複数のexampleで同一のインスタンスを使いたいときletメソッド
    let(:user) {create(:user)} #呼び出されて初めて実行される、遅延評価メソッド
    #"let"メソッドは初回だけ呼び出されて実行され、

    describe '#index' do
        context 'log in' do
            before do
                login user
                get :index, params: {group_id: group.id}
            end

            it 'assigns @message' do
                expect(assigns(:message)).to be_a_new(Message)
            end
            it 'assigns @group' do 
                expect(assigns(:group)).to eq group
            end
            it 'renders index' do
                expect(response).to render_template :index
                #resonseはexample内でリクエストが行われた後の遷移先の
                #ビューの情報を持つインスタンス。12行目でリクエストされてますね。
                #render_templateマッチャは引数で指定されたアクションが
                #今回で言えば12行目でリクエストされたときに自動的に遷移する
                #ビューを返します
            end 
        end
        context 'not log in' do
            before do
                get :index, params: {group_id: group.id}
            end
            it 'redirects to new_user_session_path' do
                expect(response).to redirect_to(new_user_session_path)
            end
    
        end
    end

    describe '#create' do
        let(:params) {{group_id: group.id, user_id: user.id, message: attributes_for(:message)}}
        #paramsを定義。擬似的にcreateアクションをリクエストする際に、引数として渡すため。
        #attributes_forはcreate,buildと同様FactoryBotメソッド。オブジェクトを生成せずハッシュを作る
        context 'log in' do
            before do
                login user
            end

            context 'can save' do
                subject {
                    post :create,
                    params: params
                }
                it 'count up message' do
                    expect{subject}.to change(Message, :count).by(1)
                    #Messageモデルのレコードの総数が1個増えたかどうか
                end
                it 'redirects to group_messages_path' do 
                    subject
                    expect(response).to redirect_to(group_messages_path(group))
                end
            end
            
            context 'can not save' do
                let(:invalid_params) {{group_id: group.id, user_id: user.id, message: attributes_for(:message, text: nil, image: nil)}}
                subject{
                    post :create,
                    params: invalid_params
                }
                it 'does not count up' do
                    expect{subject}.not_to change(Message, :count)
                    #Messageモデルのレコード数が変化しないこと≒保存に失敗したこと
                end
                it 'renders index' do
                    subject
                    expect(response).to render_template :index
                end
            end
        end

        context 'not log in' do

            it 'redirects to new_user_session_path' do
                post :create, params: params
                expect(response).to redirect_to(new_user_session_path)
            end
        end
    end
end