ActiveAdmin.register Job, as: "OpennedJobs" do
  permit_params :is_approved, invited_user_jobs_attributes: [:id, :_destroy, :user_id, :referred_by_admin]

  show do
    attributes_table do
      row :title
      row :description
      row("Posted By") { |b| b.user.full_name }
      row("Submitted At") { |b| b.created_at }
      row :approved_on
      row :is_approved
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
    column "Posted By", :user
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
      super and Notification.create(action: "notifications.job.approved", recipient_id: @openned_job.user_id, notifiable_type: "Job", notifiable_id: @openned_job.id) if params[:job][:is_approved].present? 
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
