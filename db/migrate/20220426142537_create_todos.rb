class CreateTodos < ActiveRecord::Migration[6.1]
  def change
    create_table :todos do |t|
      t.string :name, null: false
      t.boolean :is_compoleted, default: false, null: false

      t.timestamps
    end
  end
end
