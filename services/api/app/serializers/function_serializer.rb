class FunctionSerializer
  include JSONAPI::Serializer

  belongs_to :user
  belongs_to :runtime
  attributes :name, :description, :limits, :env_vars, :visibility, :status, :version, :created_at, :updated_at
end
