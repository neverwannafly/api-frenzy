class FunctionsController < ApplicationController
  before_action :authenticate_user!
  before_action :initialize_runtime, only: %i[create]

  def index
    functions = Function.where(user: @current_user)
    render json: FunctionSerializer.new(functions)
  end

  def create
    res = Functions::CreateService.execute(user: @current_user, runtime: @runtime, creation_params: function_params)
    render json: res
  end

  private

  def initialize_runtime
    @runtime = Runtime.where(creator: [@current_user, User.omniscient_user], id: params.dig(:runtime_id)).first
    head :not_found and return unless @runtime.present?
  end

  def function_params
    params.require(:function).permit(:name, :description, :code, env_vars: [:key, :value], limits: %i[cpu memory timeout])
  end
end
