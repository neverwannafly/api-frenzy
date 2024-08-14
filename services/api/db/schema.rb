# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2024_08_08_155246) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "function_invocations", force: :cascade do |t|
    t.bigint "function_id"
    t.integer "status"
    t.integer "time"
    t.integer "memory"
    t.integer "cpu_system"
    t.integer "cpu_user"
    t.json "output"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["function_id"], name: "index_function_invocations_on_function_id"
  end

  create_table "functions", force: :cascade do |t|
    t.bigint "runtime_id"
    t.bigint "user_id"
    t.bigint "parent_function_id"
    t.string "name"
    t.string "slug"
    t.string "description"
    t.json "limits"
    t.json "env_vars"
    t.text "code"
    t.integer "visibility"
    t.integer "status"
    t.integer "version"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["parent_function_id"], name: "index_functions_on_parent_function_id"
    t.index ["runtime_id"], name: "index_functions_on_runtime_id"
    t.index ["slug"], name: "index_functions_on_slug"
    t.index ["user_id"], name: "index_functions_on_user_id"
  end

  create_table "runtimes", force: :cascade do |t|
    t.string "name"
    t.string "slug"
    t.string "description"
    t.string "placeholder"
    t.string "docker_image"
    t.integer "runtime_type"
    t.bigint "parent_runtime_id"
    t.bigint "creator_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["creator_id"], name: "index_runtimes_on_creator_id"
    t.index ["parent_runtime_id"], name: "index_runtimes_on_parent_runtime_id"
    t.index ["slug"], name: "index_runtimes_on_slug"
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "username"
    t.string "password_digest"
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  add_foreign_key "functions", "functions", column: "parent_function_id"
  add_foreign_key "runtimes", "runtimes", column: "parent_runtime_id"
  add_foreign_key "runtimes", "users", column: "creator_id"
end
