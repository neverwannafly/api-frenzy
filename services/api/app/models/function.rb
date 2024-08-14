class Function < ApplicationRecord
  extend FriendlyId
  friendly_id :name, use: :slugged

  belongs_to :runtime
  belongs_to :user

  enum visibility: %i[public private], _suffix: true
  enum status: %i[draft active inactive deleted]

  validates :name, presence: true
  validates :description, presence: true
end
