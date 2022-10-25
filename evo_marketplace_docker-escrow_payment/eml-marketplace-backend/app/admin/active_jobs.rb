ActiveAdmin.register Job, as: "ActiveJobs" do
  show do
    attributes_table do
      row :title
      row :description
      row("Posted By") { |b| b.user.full_name }
      row("Submitted At") { |b| b.created_at }
      row :approved_on
      row :is_approved
      row :accepted_freelancers do |job|
        job.accepted_freelancers.map(&:full_name).to_sentence
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
    column "Hired Freelancers" do |job|
      job.accepted_freelancers.count
    end
    actions defaults: false, dropdown: true do |job|
    end
  end
  controller do
    def scoped_collection
      Job.where(state: "active")
    end
  end


end
