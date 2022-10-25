ActiveAdmin.register Job, as: "OpennedJobs" do
  permit_params :is_approved, invited_user_jobs_attributes: [:id, :_destroy, :user_id, :referred_by_admin]

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
      row :invited_freelancers do |job|
        job.invited_freelancers.map(&:full_name).to_sentence
      end
    end
  end

  index do
    selectable_column
    column :id
    column :title do |job|
      link_to job.title, admin_openned_job_path(job)
    end
    column :user do |job|
      link_to job.user.try(:full_name), admin_client_path(job.user)
    end
    column "Submitted At", :created_at
    column "Approved On", :approved_on
    column "Invited Freelancers" do |job|
      job.invited_freelancers.count
    end
    actions defaults: false, dropdown: true do |job|
      item "Delete", admin_openned_job_path(job), method: :delete
      item "#{job.is_approved && 'Disapprove' || 'Approve'} the job", admin_openned_job_path(job, job: { is_approved: !job.is_approved }), method: :patch
      item "Invite Freelancers", invite_freelancers_admin_openned_job_path(job)
    end
  end
  controller do
    def scoped_collection
      Job.where(state: "open")
    end
    def update
      @openned_job = Job.find(params[:id])
      if params[:job][:is_approved].present?
        super
        if User.find(@openned_job.user_id).job_approved == true
          Notification.create(action: "notifications.job.approved", recipient_id: @openned_job.user_id, notifiable_type: "Job", notifiable_id: @openned_job.id)
        end
        if User.find(@openned_job.user_id).job_approved_email == true
          MyMailer.job_approved(@openned_job).deliver_later
        end
      end
      super if params[:job][:invited_user_jobs_attributes].present?   
    end
  end
  member_action :invite_freelancers, method: :get do
    @openned_job = Job.find(params[:id])
  end
  collection_action :search_freelancers, method: :get do
    @users = User.with_role(:freelancer).where(is_approved: true).search(params[:q]).result
    render json: @users.map { |u| { id: u.id, email: u.email, full_name: u.full_name, avatar_url: u.avatar_url} }.to_json
  end
end
