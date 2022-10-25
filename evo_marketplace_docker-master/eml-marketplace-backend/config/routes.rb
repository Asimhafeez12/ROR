Rails.application.routes.draw do
  mount ActionCable.server, at: '/cable'
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  devise_for :users, controllers: { sessions: 'api/v1/sessions' }, path_names: {sign_in: '/api/v1/sign_in'}, path: '', skip: [:registrations, :passwords, :confirmations]
  as :user do
    post '/api/v1/passwords', to: 'api/v1/passwords#create', as: :create_user_password
    patch '/api/v1/passwords', to: 'api/v1/passwords#update', as: :user_password
    get "/api/v1/confirmations" => "api/v1/confirmations#show"
    post "api/v1/confirmations", to: "api/v1/confirmations#create", as: :user_confirmation
    patch '/api/v1/registrations', to: 'api/v1/registrations#update', as: :update_user_password
  end
  post "/tmp_fileuploader" => "tmp_fileuploader#create"
  get "/api/v1/all_notifications" => "api/v1/notifications#all_notifications"
  #put '/api/v1/chatrooms/:chatroom_id/read_messages', to: "api/v1/read_messages#update", as: 'read_messages'
  namespace :api do
    namespace :v1 do
      resources :escrow_callbacks, only: [:create]
      resources :skills, only: [:index]
      resources :languages, only: [:index]
      resources :notifications, only: [:index, :update]
      resources :registrations, only: [:create]
      resources :update_client_wizards, only: [:create]
      resources :freelancer_edit_profiles, only: [:create]
      resources :job_creation_wizards, only: [:create]
      resources :edit_jobs, only: [:update]
      resources :edit_milestones, only: [:update]
      resources :my_jobs, only: [:index]
      resources :my_chatrooms, only: [:index]
      resources :all_chatrooms, only: [:index]
      resources :job_categories, only: [:index, :show]
      resources :last_jobs, only: [:index]
      resources :home_categories, only: [:index, :show]
      resources :home_illustrations, only: [:index, :show]
      resources :job_advisors, only: [:create]
      resources :contact_us, only: [:create]
      resources :user_chatrooms, only: [:create]
      resources :user_certificates, only: [:create, :update, :destroy]
      resources :user_educations, only: [:create, :update, :destroy]
      resources :user_experiences, only: [:create, :update, :destroy]
      resources :user_portfolios, only: [:create, :update, :destroy]
      resources :current_user, only: [:show]
      resources :users, only: [:create, :show] do
        resources :user_certificates, only: [:index]
        resources :user_educations, only: [:index]
        resources :user_experiences, only: [:index]
        resources :user_portfolios, only: [:index]
        resources :user_skills, only: [:index]
        resources :user_badges, only: [:index]
        resources :user_languages, only: [:index]
        resources :user_expertise, only: [:index]
        resources :user_invited_jobs, only: [:index]
        resources :user_accepted_jobs, only: [:index]
        resources :user_completed_jobs, only: [:index]
        resources :user_billings, only: [:create, :show]
        resources :freelancer_active_jobs, only: [:index]
        resources :freelancer_completed_jobs, only: [:index]
      end

      resources :jobs, only: [:show, :update] do
        resources :job_infos, only: [:show]
        resources :project_milestones, only: [:index, :create, :update, :destroy]
        resources :invited_freelancers, only: [:index]
        resources :accept_invited_freelancers, only: [:index, :create]
        resources :reject_invited_freelancers, only: [:create]
        resources :opt_invited_freelancers, only: [:index, :create]
        resources :job_cover_letters, only: [:create, :show]
        resources :job_ratings, only: [:show, :create]
        resources :get_client_ratings, only: [:show]
        resources :get_freelancer_ratings, only: [:show]
        resources :job_incentives, only: [:create]
      end
      resources :chatrooms do
        resources :messages, only: [:index]
      end
      resources :unread_messages, only: [:show]
      resources :read_messages, only: [:update]
      resources :invited_openned_jobs, only: [:index]
      resources :invited_accepted_jobs, only: [:index]
      resources :invited_completed_jobs, only: [:index, :update]
      resources :validate_freelancers, only: [:create]
      resources :freelancer_completed_jobs, only: [:index]
      resources :freelancer_invited_jobs, only: [:index]
      resources :client_openned_jobs, only: [:show]
      resources :client_active_jobs, only: [:show]
    end
  end
  get "/password/edit/:reset_password_token" => "home#index", as: :edit_password
  get "/confirmation/:id/mail/:confirmation_token" => "home#index", as: :confirmation

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  # root "home#index"
  # get "*path" => "home#index"
end
