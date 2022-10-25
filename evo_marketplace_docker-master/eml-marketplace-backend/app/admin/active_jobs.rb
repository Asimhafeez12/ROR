ActiveAdmin.register Job, as: "ActiveJobs" do
  permit_params :is_approved, accept_freelancers_attributes: [:id, :_destroy, :user_id, :referred_by_admin]

  show do
    attributes_table do
      row :title
      row :job_category
      row :description
      row("Posted By") { |b| b.user.full_name }
      row("Submitted At") { |b| b.created_at }
      row :approved_on
      row :is_approved
      row "Starting Date" do |job|
          job.converted_starting_date
      end
      row "Availability" do |job|
          job.translated_availability
      end
      row "Duration" do |job|
          job.translated_duration
      end
      row "Desired Profile" do |job|
          job.translated_desired_profile
      end
      row :skill_list
      row :minimum_budget
      row :additional_info
      row :job_files do |job|
        job.job_files.map(&:avatar_url).to_sentence
      end
      row :accepted_freelancers do |job|
        job.accepted_freelancers.map(&:full_name).to_sentence
      end
    end
  end

  index do
    selectable_column
    column :id
    column :title do |job|
      link_to job.title, admin_active_job_path(job)
    end
    column :user do |job|
      link_to job.user.try(:full_name), admin_client_path(job.user)
    end
    column "Submitted At", :created_at
    actions defaults: false, dropdown: true do |job|
      item "Delete", admin_active_job_path(job), method: :delete
    end
  end
  controller do
    def scoped_collection
      Job.where(state: "active")
    end
  end
  member_action :accepted_freelancers, method: :get do
    @active_job = Job.find(params[:id])
  end
  collection_action :search_freelancers, method: :get do
    @users = User.with_role(:freelancer).where(is_approved: true).search(params[:q]).result
    render json: @users.map { |u| { id: u.id, email: u.email, full_name: u.full_name, avatar_url: u.avatar_url} }.to_json
  end
end
