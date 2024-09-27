class FunctionsController < ApplicationController
  before_action :authenticate_user!
  before_action :initialize_runtime, only: %i[create]
  before_action :initialize_function, only: %i[show update]
  before_action :initialize_filters, only: %i[index]

  def index
    functions = @functions_filter.apply()
    render json: FunctionSerializer.new(functions, include: %i[runtime])
  end

  def show
    render json: FunctionSerializer.new(@function, include: %i[runtime], params: { current_user_id: current_user.id })
  end

  def create
    res = Functions::CreateService.execute(user: @current_user, runtime: @runtime, creation_params: create_function_params)
    render json: res
  end

  def update
    res = Functions::UpdateRevisionService.execute(
      function: @function, updation_params: update_function_params, publish: params.dig(:publish)
    )
    render json: res
  end

  private

  def initialize_function
    @function = Function.find_by_slug(params.dig(:id))
    head :not_found and return unless @function.present? # Policy for functions
  end

  def initialize_runtime
    @runtime = Runtime.where(creator: [@current_user, User.omniscient_user], id: params.dig(:runtime_id)).first
    head :not_found and return unless @runtime.present?
  end

  def create_function_params
    params.require(:function).permit(:name, :description)
  end

  def update_function_params
    params.require(:function).permit(:code, env_vars: [:key, :value], limits: %i[cpu memory timeout]).tap do |whitelisted|
      whitelisted[:default_params] = params[:function][:default_params].permit! if params[:function][:default_params].present?
    end    
  end

  def initialize_filters
    filter_params = params.require(:function).permit(:page, :limit, filters: [:type, :value])
    @functions_filter = Functions::Filter.new(user: @current_user, filter_params: filter_params.to_h)
  end
end
