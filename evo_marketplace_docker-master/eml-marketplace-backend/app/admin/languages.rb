ActiveAdmin.register ActsAsTaggableOn::Tag, as: "Languages" do
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
    column "Language", :name
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
    # def update
    #   # @user_skill = ActsAsTaggableOn::Tagging.find(params[:id])
    #   # super and Notification.create(action: "notifications.user.skill.approved", recipient_id: @user_skill.taggable_id, notifiable_type: "User", notifiable_id: @user_skill.taggable_id)    
    # end

    def scoped_collection
      ActsAsTaggableOn::Tag.where(id: ActsAsTaggableOn::Tagging.where(context: "languages").pluck(:tag_id).uniq)
    end

  end


end
