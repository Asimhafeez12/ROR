ActiveAdmin.register Badge, as: "Badge" do
  permit_params :title, :description, :expert_level, :avatar

  index do
    selectable_column
    column :id
    column :title
    column :description
    column :expert_level
    column :avatar
    column :created_at
    actions
  end
  form do |f|
    f.inputs do
      f.input :title
      f.input :description
      f.input :expert_level
      f.input :avatar, required: true, as: :file
    end
    f.actions
  end

end
