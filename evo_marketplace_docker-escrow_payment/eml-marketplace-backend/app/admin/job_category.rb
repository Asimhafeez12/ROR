ActiveAdmin.register JobCategory, as: "JobCategory" do
  permit_params :name, :description, :avatar

  index do
    selectable_column
    column :id
    column :name
    column :description
    column :avatar
    column :created_at
    actions
  end
  form do |f|
    f.inputs do
      f.input :name
      f.input :description
      f.input :avatar, required: true, as: :file
    end
    f.actions
  end

end
