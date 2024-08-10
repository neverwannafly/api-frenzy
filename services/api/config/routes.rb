Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  scope :api do
    namespace :auth do
      resources :registrations, only: %i[create]
      resource :sessions, only: %i[create destroy]
    end

    resources :health_check, only: %i[index]
    resources :dashboard, only: %i[index]
    resources :user, only: %i[index]
    resources :functions
    resources :runtimes, only: %i[index]
  end
end
