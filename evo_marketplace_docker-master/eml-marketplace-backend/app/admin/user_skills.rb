ActiveAdmin.register ActsAsTaggableOn::Tagging, as: "UserSkills" do
  permit_params :expert_level
  show do
    attributes_table do
      row :taggable
      row :tag
      row :expert_level
    end
  end

  index do
    selectable_column
    column :id
    column "User", :taggable
    column "Skill", :tag
    column "Expert Level", :expert_level
    actions
  end

  form do |f|
    f.inputs do
      f.input :expert_level, as: :select, collection: (["Beginner", "Intermediate", "Expert"])
    end
    f.actions
  end

  controller do
    def update
      @user_skill = ActsAsTaggableOn::Tagging.find(params[:id])
      super and Notification.create(action: "notifications.user.skill.approved", recipient_id: @user_skill.taggable_id, notifiable_type: "User", notifiable_id: @user_skill.taggable_id)    
    end

    def scoped_collection
      ActsAsTaggableOn::Tagging.where(taggable_type: "User")
    end

  end


end
