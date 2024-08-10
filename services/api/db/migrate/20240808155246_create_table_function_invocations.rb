class CreateTableFunctionInvocations < ActiveRecord::Migration[6.1]
  def change
    create_table :function_invocations do |t|
      t.references :function, index: true
      
      t.integer :status
      t.json :meta

      t.timestamps
    end
  end
end
