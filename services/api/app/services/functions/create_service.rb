class Functions::CreateService < ::BaseService
  # These values should come from a policy
  MAX_FUNCTIONS_ALLOWED = 5

  FUNCTION_CREATION_LIMIT_REACHED_ERROR = "You cant create more functions"
  include ::Exceptions

  def initialize(user:, runtime:, creation_params:)
    @user = user
    @runtime = runtime
    @creation_params = creation_params
  end

  def execute
    super do
      validate_arguments!

      raise FunctionCreationLimitReachedError unless can_create_function?

      function = Function.new(@creation_params)
      function = set_defaults(function)

      if function.save
        success(FunctionSerializer.new(function))
      else
        error(function.errors.full_messages.join(','))
      end
    end
  end

  private

  def set_defaults(function)
    function.user = @user
    function.runtime = @runtime

    function.version = 0
    function.visibility = :public
    function.status = :draft

    function
  end

  def can_create_function?
    @user.functions.count < MAX_FUNCTIONS_ALLOWED
  end

  def validate_arguments!
    raise InvalidArgumentsError unless @user.present? && @runtime.present?
  end
end
