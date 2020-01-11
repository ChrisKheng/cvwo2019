Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'pages#home'
  get 'about', to: 'pages#home'
  get 'app/tasks', to: 'pages#app'
  get 'app/tasks/tags/:tagId', to: 'pages#app'

  get 'tasks', to: 'tasks#index'
  post 'tasks', to: 'tasks#create'
  delete 'tasks/:id', to: 'tasks#destroy'
  put 'tasks/:id', to: 'tasks#update'

  resources :categories, except: [:new]
end

