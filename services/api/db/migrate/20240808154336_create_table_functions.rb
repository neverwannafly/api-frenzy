class CreateTableFunctions < ActiveRecord::Migration[6.1]
  def change
    create_table :functions do |t|
      t.references :runtime, index: true
      t.references :user, index: true
      t.references :parent_function, index: true, foreign_key: { to_table: :functions }

      t.string :name
      t.string :description
      t.json :limits
      t.json :env_vars
      t.text :code
      t.integer :visibility
      t.integer :status
      t.integer :version

      t.timestamps
    end
  end
end
