Rails.application.routes.draw do
  # resources :appointments
  # resources :doctors
  # resources :users

  namespace :api do
    namespace :v1 do
      resources :doctors, only: [:index, :show]
      resources :users, only: [:create] do 
        resources :appointments
      end
    end
  end

  post 'login', to: 'authentication#login'
  get 'auto_login', to: 'authentication#auto_login'
  get 'user_is_authed', to: 'authentication#user_is_authed'
end
