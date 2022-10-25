ActiveAdmin.register User, as: "Client" do

  index do
    selectable_column
    column :id
    column :full_name do |user|
      link_to user.full_name, admin_client_path(user)
    end
    column :email
    column :country
    column :city
    column :phone_number
    column "Joined on", :created_at
    actions defaults: false, dropdown: true do |user|
      item "Delete", admin_client_path(user), method: :delete
    end
  end

  show do
    attributes_table do
      row :full_name
      row :email
      row :country
      row :title
      row :city
      row :phone_number
      row "Total Jobs Posted" do |user|
          user.jobs_count
      end
      row "Total Hires" do |user|
          user.freelancers_hired_count
      end
      row "Total Amount Spent" do |user|
          user.total_amount_spent
      end
    end
  end
  controller do
    def scoped_collection
      User.with_role(:client).preload(:roles)
    end
  end
  form do |f|
    f.semantic_errors *f.object.errors.keys
  end

end
