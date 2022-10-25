ActiveAdmin.register UserBadge, as: "UserBadges" do
  permit_params :user_id, :badge_id, :user_full_name, :badge_title
  show do
    attributes_table do
      row :user
      row :badge
    end
  end

  index do
    selectable_column
    column :id
    column "User", :user_full_name
    column "Badge", :badge_title
    actions
  end

  controller do
    def update
      super
    end

    def create
      super && Notification.create(recipient_id: params[:user_badge][:user_id], action: "notifications.user.badge", notifiable_type: "User", notifiable_id: params[:user_badge][:user_id]) && MyMailer.badge_given(params[:user_badge][:user_id], params[:user_badge][:badge_id]).deliver_later
    end

    # def scoped_collection
    #   User.with_any_role('freelancer')
    # end
  end

  # member_action :invite_freelancers, method: :get do
  # end

  # collection_action :search_freelancers, method: :get do
  #   @users = User.with_role(:freelancer).where(is_approved: true).search(params[:q]).result
  #   render json: @users.map { |u| { id: u.id, email: u.email, full_name: u.full_name, avatar_url: u.avatar_url} }.to_json
  # end


end
