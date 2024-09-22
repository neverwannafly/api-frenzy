class FunctionInvocation < ApplicationRecord
  belongs_to :function
  belongs_to :invoker, polymorphic: true

  enum status: %i[failed success]
end
