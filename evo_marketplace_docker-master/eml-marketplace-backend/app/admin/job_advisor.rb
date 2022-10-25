ActiveAdmin.register JobAdvisor, as: "JobAdvisor" do

  index do
    selectable_column
    column :id
    column :full_name
    column :email
    column :phone_number
    column :skype_id
    column :available_date
    column :available_time
    actions
  end

end
