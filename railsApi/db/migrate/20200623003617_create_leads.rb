class CreateLeads < ActiveRecord::Migration[6.0]
  def change
    create_table :leads do |t|
      t.string :nome
      t.string :email
      t.string :cargo
      t.string :telefone
      t.string :empresa

      t.timestamps
    end
  end
end
