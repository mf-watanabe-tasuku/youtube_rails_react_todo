class FixColumnName < ActiveRecord::Migration[6.1]
  def up
    rename_column :todos, :is_compoleted, :is_completed
  end
end
