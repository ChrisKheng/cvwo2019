Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'pages#home'
  get 'about', to: 'pages#home'
  get 'app', to: 'pages#app'

  get 'tasks', to: 'tasks#index'
  post 'tasks', to: 'tasks#create'
end

