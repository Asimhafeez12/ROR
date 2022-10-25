ActiveAdmin.register User, as: "Freelancers" do
  permit_params :is_approved

  index do
    selectable_column
    column :id
    column :full_name
    column :email
    column :is_approved
    column :approved_on
    column "Joined on", :created_at
    actions defaults: false, dropdown: true do |user|
      item "Delete", admin_freelancer_path(user), method: :delete
      item "#{user.is_approved && 'Disapprove' || 'Approve'} the freelancer", admin_freelancer_path(user, user: { is_approved: !user.is_approved }), method: :patch
    end

  end
  controller do
    def scoped_collection
      User.with_role(:freelancer).preload(:roles)
    end
  end
  form do |f|
    f.semantic_errors *f.object.errors.keys
  end

end
