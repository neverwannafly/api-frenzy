class CreateTableFunctionInvocations < ActiveRecord::Migration[6.1]
  def change
    create_table :function_invocations do |t|
      t.references :function, index: true
      
      t.integer :status
      t.integer :time
      t.integer :memory
      t.integer :cpu_system
      t.integer :cpu_user
      t.json :output

      t.timestamps
    end
  end
end
