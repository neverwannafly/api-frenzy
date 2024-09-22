class ModifyTablesToAccountForNewFeatures < ActiveRecord::Migration[6.1]
  def change
    add_column :function_invocations, :user_details, :json
    add_column :function_invocations, :invoker_type, :string
    add_column :function_invocations, :invoker_id, :bigint

    change_column :function_invocations, :time, :float
    change_column :function_invocations, :memory, :float
    change_column :function_invocations, :cpu_system, :float
    change_column :function_invocations, :cpu_user, :float

    add_index :function_invocations, %i[invoker_type invoker_id]

    add_column :functions, :default_params, :json
  end
end
