class CreateMessages < ActiveRecord::Migration[5.0]
  def change
    create_table :messages do |t|
      t.text       :text,    null: true
      t.string     :image,   null: true
      t.references :user,    foreign_key: true
      t.references :group,   foreign_key: true
      t.timestamps           null: false
    end
  end
end
