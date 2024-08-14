class FunctionsController < ApplicationController
  before_action :authenticate_user!
  before_action :initialize_runtime, only: %i[create]
  before_action :initialize_function, only: %i[show update]

  def index
    functions = Function.where(user: @current_user)
    render json: FunctionSerializer.new(functions)
  end

  def show
    render json: FunctionSerializer.new(@function, include: %i[runtime])
  end

  def create
    res = Functions::CreateService.execute(user: @current_user, runtime: @runtime, creation_params: create_function_params)
    render json: res
  end

  def update
    res = Functions::UpdateRevisionService.execute(function: @function, updation_params: update_function_params)
    render json: res
  end

  private

  def initialize_function
    @function = Function.find_by_slug(params.dig(:id))
    head :not_found and return unless @function.present?
  end

  def initialize_runtime
    @runtime = Runtime.where(creator: [@current_user, User.omniscient_user], id: params.dig(:runtime_id)).first
    head :not_found and return unless @runtime.present?
  end

  def create_function_params
    params.require(:function).permit(:name, :description)
  end

  def update_function_params
    params.require(:function).permit(:code, env_vars: [:key, :value], limits: %i[cpu memory timeout])
  end
end
