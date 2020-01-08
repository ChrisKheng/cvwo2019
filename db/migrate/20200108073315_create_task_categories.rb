class CreateTaskCategories < ActiveRecord::Migration[6.0]
  def change
    create_table :task_categories do |t|
      t.integer :task_id
      t.integer :category_id
    end
  end
end
