class Functions::CreateService < ::BaseService
  MAX_MEMORY_LIMIT = 512.megabytes
  MAX_CPU_LIMIT = 1
  MAX_TIMEOUT = 5000
  MAX_ENV_VARS = 5

  def initialize(user:, runtime:, creation_params: {})
    @user = user
    @runtime = runtime
    @creation_params = creation_params
  end

  def execute
    super do
      function = Function.new(@creation_params)

      function = set_defaults(function)
      function = enforce_limits(function)
      
      function.save!

      success(FunctionSerializer.new(function))
    end
  end

  def enforce_limits(function)
    function.limits['memory'] = [[function.limits['memory'].to_i.megabytes, MAX_MEMORY_LIMIT].min, 0].max
    function.limits['cpu'] = [[function.limits['cpu'].to_f, MAX_CPU_LIMIT].min, 0].max
    function.limits['timeout'] = [[function.limits['timeout'].to_i, MAX_TIMEOUT].min, 0].max

    function.env_vars = function.env_vars[0..MAX_ENV_VARS-1]

    function
  end

  def set_defaults(function)
    function.runtime = @runtime
    function.user = @user

    function.version = 1
    function.visibility = :public
    function.status = :active

    function
  end
end
