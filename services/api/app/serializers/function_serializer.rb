class FunctionSerializer
  include JSONAPI::Serializer

  belongs_to :user
  belongs_to :runtime
  attributes :name, :description, :slug, :limits, :env_vars, :code, :visibility, :status, :version, :created_at, :updated_at
end
