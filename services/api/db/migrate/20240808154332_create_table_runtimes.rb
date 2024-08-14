class CreateTableRuntimes < ActiveRecord::Migration[6.1]
  def change
    create_table :runtimes do |t|
      t.string :name
      t.string :slug, index: true, unique: true
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
    docker_image = Rails.env.development? ? 'af.runtime.node18:v1' : ''

    Runtime.create(
      name: 'Node 18',
      slug: 'node18',
      runtime_type: :system,
      description: 'Execute your code in Node 18 environment',
      placeholder: "function main(params) {\n\n}\n\nmodule.exports = main;\n",
      docker_image: docker_image,
      creator: power_user
    )
  end
end
