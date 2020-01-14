Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'pages#home'
  get 'about', to: 'pages#home'

  get 'app/tasks', to: 'pages#app'
  get 'app/tasks/tags/:tagId', to: 'pages#app'
  resources :tasks, except: [:new, :edit, :show]
  resources :categories, except: [:new, :edit, :show]
end

