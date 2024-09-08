class Functions::Filter
  SUPPORTED_FILTER_TYPES = %w[trending my_functions keyword_search]
  DEFAULT_LIMIT = 25
  DEFAULT_PAGE = 0

  def initialize(user:, filter_params: {})
    @user = user
    @filters = filter_params.dig(:filters) || []
    @limit = filter_params.dig(:limit) || DEFAULT_LIMIT
    @page = filter_params.dig(:page) || DEFAULT_PAGE
  end

  def apply
    filters = aggregate_filters
    puts filters
    filters = [trending_filter(nil)] if filters.empty?

    query = Function.all.limit(@limit).offset(@page)
    filters.each do |filter|
      query = query.where(filter)
    end

    query
  end

  private

  def aggregate_filters
    puts @filters, @filters.class
    return [] unless @filters.is_a? Array

    filters = []

    @filters.each do |filter|
      puts filter, filter.is_a?(Hash)
      next unless filter.is_a? Hash

      filter_type = filter.dig(:type)
      filter_value = filter.dig(:value)
      method_name = "#{filter_type}_filter"

      next unless self.respond_to?(method_name, true)

      filters << self.send(method_name, filter_value)
    end

    filters
  end

  def trending_filter(filter_value)
    {
      visibility: :public,
      status: :active,
    }
  end

  def my_functions_filter(filter_value)
    {
      status: %i[draft active inactive],
      user_id: @user.id
    }
  end

  def keyword_search_filter(filter_value)
    ["name ILIKE ?", "%#{filter_value}%"]
  end
end
