ActiveAdmin.register ActsAsTaggableOn::Tag, as: "Skills" do
  permit_params :approval_status
  show do
    attributes_table do
      row :name
      row :approval_status
    end
  end

  index do
    selectable_column
    # column :id
    column "Skill", :name
    column "Approval Status", :approval_status
    actions
  end

  form do |f|
    f.inputs do
      f.input :name, input_html: { disabled: true } 
      f.input :approval_status, as: :select, collection: (["Approve", "Reject"])
    end
    f.actions
  end

  controller do

    def scoped_collection
      ActsAsTaggableOn::Tag.where(id: ActsAsTaggableOn::Tagging.where(context: "skills").pluck(:tag_id).uniq)
    end

  end


end
