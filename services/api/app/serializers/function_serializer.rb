class FunctionSerializer
  include JSONAPI::Serializer

  belongs_to :user
  belongs_to :runtime
  attributes :name, :description, :slug, :visibility, :status, :version, :created_at, :updated_at, :default_params

  attribute :limits, if: Proc.new { |record| record.has_attribute?(:limits) }
  attribute :env_vars, if: Proc.new { |record, params|
    record.has_attribute?(:env_vars) && params[:current_user_id] == record.user_id
  }
  attribute :code, if: Proc.new { |record| record.has_attribute?(:code) }
end
