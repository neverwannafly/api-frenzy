class Functions::UpdateRevisionService < ::BaseService
  # These values should come from a policy
  MAX_MEMORY_LIMIT = 512.megabytes
  MAX_CPU_LIMIT = 2000
  MAX_TIMEOUT = 5000
  MAX_ENV_VARS = 5

  def initialize(function:, publish: false, updation_params: {})
    @function = function
    @updation_params = updation_params
    @publish = publish
  end

  def execute
    super do
      @function.assign_attributes(@updation_params)

      set_defaults
      enforce_limits

      if @function.save
        success(FunctionSerializer.new(@function))
      else
        error(@function.errors.full_messages.join(','))
      end
    end
  end

  def enforce_limits
    @function.limits['memory'] = [[@function.limits['memory'].to_i.megabytes, MAX_MEMORY_LIMIT].min, 0].max
    @function.limits['cpu'] = [[@function.limits['cpu'].to_i, MAX_CPU_LIMIT].min, 0].max
    @function.limits['timeout'] = [[@function.limits['timeout'].to_i, MAX_TIMEOUT].min, 0].max

    @function.env_vars = @function.env_vars[0..MAX_ENV_VARS-1]
  end

  def set_defaults
    return unless @publish.present?

    @function.version = @function.version + 1
    @function.status = :active
    # Todo: Create a revision history. For now, just bumping up the revision
  end
end
