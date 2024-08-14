class RuntimesController < ApplicationController
  before_action :authenticate_user!

  def index
    runtimes = Runtime.where(creator: [@current_user, User.omniscient_user])
    puts runtimes
    render json: RuntimeSerializer.new(runtimes)
  end
end
