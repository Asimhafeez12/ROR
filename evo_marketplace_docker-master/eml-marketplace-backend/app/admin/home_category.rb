ActiveAdmin.register HomeCategory, as: "HomeCategory" do
  permit_params :title, :avatar

  index do
    selectable_column
    column :id
    column :title
    column :avatar
    column :created_at
    actions
  end
  form do |f|
    f.inputs do
      f.input :title
      f.input :avatar, required: true, as: :file
    end
    f.actions
  end

end
