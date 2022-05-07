Rails.application.routes.draw do
  root to: redirect('/todos')

  get 'todos', to: 'site#index'
  get 'todos/new', to: 'site#index'
  get 'todos/:id/edit', to: 'site#index'
  get 'categories', to: 'site#index'
  get 'categories/:id/edit', to: 'site#index'

  namespace :api do
    namespace :v1 do
      delete '/todos/destroy_all', to: 'todos#destroy_all'
      resources :todos, only: %i[index show create update destroy]
      resources :todo_categories, only: %i[index create show update destroy]
    end
  end
end
