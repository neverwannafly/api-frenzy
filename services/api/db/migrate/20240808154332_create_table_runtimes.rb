class CreateTableRuntimes < ActiveRecord::Migration[6.1]
  def change
    create_table :runtimes do |t|
      t.string :name
      t.string :slug
      t.string :description
      t.string :placeholder
      t.string :docker_image
      t.integer :runtime_type

      t.references :parent_runtime, index: true, foreign_key: { to_table: :runtimes }
      t.references :creator, index: true, foreign_key: { to_table: :users }

      t.timestamps
    end

    create_node_runtime()
  end

  def create_node_runtime
    power_user = User.create(username: 'apifrenzy', email: 'apifrenzy993@gmail.com', password: SecureRandom.hex)
    Runtime.create(
      name: 'Node 18',
      slug: 'node_18',
      runtime_type: :system,
      description: 'Execute your code in Node 18 environment',
      placeholder: "function main(params) {\n\n}\n\nexport default main;\n",
      creator: power_user
    )
  end
end
