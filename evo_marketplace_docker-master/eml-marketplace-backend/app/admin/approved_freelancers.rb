ActiveAdmin.register User, as: "Approved Freelancers" do
  permit_params :is_approved

  index do
    selectable_column
    column :id
    column :full_name do |user|
      link_to user.full_name, admin_approved_freelancer_path(user)
    end
    column :email
    column :is_approved
    column :approved_on
    column "Joined on", :created_at
    actions defaults: false, dropdown: true do |user|
      item "Delete", admin_approved_freelancer_path(user), method: :delete
      item "#{user.is_approved && 'Disapprove' || 'Approve'} the freelancer", admin_approved_freelancer_path(user, user: { is_approved: !user.is_approved }), method: :patch
    end
  end

  show do
    attributes_table do
      row :full_name
      row :email
      row :title
      row :summary
      row :skill_list
      row :skype
      row :interview_date_availability
      row "Interview Time Availability" do |user|
          user.interview_time_availability.to_datetime.strftime("%I:%M%p")
      end
      row :user_badges do |user|
        user.badges.map(&:title).to_sentence
      end
      row :user_certificates do |user|
        user.user_certificates.map(&:title).to_sentence
      end
      row :user_experiences do |user|
        user.user_experiences.map(&:designation).to_sentence
      end
      row :user_educations do |user|
        user.user_educations.map(&:degree_name).to_sentence
      end
      row :user_portfolios do |user|
        user.user_portfolios.map(&:title).to_sentence
      end
    end
  end

  controller do
    def scoped_collection
      User.where(is_approved: true).with_role(:freelancer).preload(:roles)
    end
    def update
      update! do |format|
        format.html { redirect_to [:admin, :approved_freelancers] }
      end
    end
  end
  form do |f|
    f.semantic_errors *f.object.errors.keys
  end

end
