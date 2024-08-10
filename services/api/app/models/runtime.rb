class Runtime < ApplicationRecord
  belongs_to :creator, class_name: User.name, foreign_key: :creator_id

  enum runtime_type: %i[system user]
end
