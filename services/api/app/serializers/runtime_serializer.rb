class RuntimeSerializer
  include JSONAPI::Serializer

  belongs_to :creator, serializer: UserSerializer
  attributes :name, :description, :placeholder, :docker_image, :created_at, :updated_at
end
