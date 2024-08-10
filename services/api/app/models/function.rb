class Function < ApplicationRecord
  belongs_to :runtime
  belongs_to :user

  enum visibility: %i[public private], _suffix: true
  enum status: %i[active inactive deleted]
end
