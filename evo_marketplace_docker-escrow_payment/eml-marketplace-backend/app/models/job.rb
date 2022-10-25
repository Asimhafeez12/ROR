class Job < ApplicationRecord
  acts_as_taggable_on :skills

  belongs_to :user, optional: true
  has_many :job_ratings, dependent: :destroy
  has_many :chatrooms, dependent: :destroy
  attr_accessor :invite_freelancer
  has_many :project_milestones, dependent: :destroy
  has_many :job_incentives, dependent: :destroy
  has_many :invited_user_jobs, dependent: :destroy
  # freelancer will apply on job using invited_freelancers
  has_many :invited_freelancers, through: :invited_user_jobs, source: :user
  accepts_nested_attributes_for :invited_user_jobs, reject_if: :all_blank, allow_destroy: true
  # job owner will accept freelancers
  has_many :accept_freelancers, dependent: :destroy
  has_many :accepted_freelancers, through: :accept_freelancers, source: :user
  has_many :job_advisors, dependent: :destroy
  has_many :job_cover_letters, dependent: :destroy
  accepts_nested_attributes_for :accept_freelancers, reject_if: :all_blank, allow_destroy: true
  state_machine initial: :open do
    after_transition open: :active do |job_obj, transition|
      # trigger onces job moved to active state
      job_obj.invited_user_jobs.where("user_id NOT IN (?)", job_obj.accepted_freelancers.pluck(:id)).update_all(is_accepted: false)
    end
    after_transition active: :completed do | job, transition |
    end
    event :active do
      transition open: :active
    end
    event :completed do
      transition active: :completed
    end
  end

  has_many :job_skills
  has_many :skills, through: :job_skills
  has_many :notifications, as: :notifiable

  has_many :job_files, dependent: :destroy
  accepts_nested_attributes_for :job_files, allow_destroy: true, reject_if: :all_blank
  delegate :full_name, :email, :avatar_url, :country, to: :user, allow_nil: true, prefix: true

  def job_cover_letters
    JobCoverLetter.where(job_id: self.id)
  end

  def job_cover_letter_ids
    JobCoverLetter.where(job_id: self.id).pluck(:user_id)
  end

  def accepted_freelancer_ids
    self.accepted_freelancers.pluck(:id)
  end

  def accepted_freelancer_id
    self.accepted_freelancers[0].try(:id)
  end

  def accepted_freelancer
    self.accepted_freelancers[0]
  end

  def all_job_ratings_for_client
    JobRating.where(user_id: self.user_id, job_id: self.id)
  end

  def all_job_ratings_for_freelancer
    JobRating.where(user_id: self.accepted_freelancer_id, job_id: self.id)
  end

  def open_milestones_count
    self.project_milestones.where(is_delivered: false).count
  end

  def amount_paid_for_completed_milestones
    self.project_milestones.where(is_delivered: true).sum(:price_cents) if self.project_milestones.count > 0
  end

  def amount_remaining_for_open_milestones
    self.project_milestones.where(is_delivered: false).sum(:price_cents) if self.project_milestones.count > 0
  end

  def invited_freelancers_count
    self.invited_freelancers.count
  end

  def invited_freelancers_list
    self.invited_freelancers; 
  end

  def accept_freelancers_count
    self.accepted_freelancers.count
  end

  def accept_freelancers_list
    self.accepted_freelancers
  end

  def translated_duration
    @values = ["1-3 Months", "3-6 Months", "More then 6 Months", "Not Sure"]; @options = ["a", "b", "c", "d"]; @index = @options.index(self.duration); @translated_duration = @values[@index];
  end

  def translated_availability
    @values = ["2 Days a week", "4 Days a week", "5 Days a week", "Part Time", "Full Time"]; @options = ["a", "b", "c", "d", "e"]; @index = @options.index(self.availability); @translated_availability = @values[@index];
  end

  def translated_desired_profile
    @values = ["Junior", "Senior", "Expert"]; @options = ["a", "b", "c"]; @index = @options.index(self.desired_profile); @translated_desired_profile = @values[@index];
  end

  def job_client
    User.find_by(id: self.user_id)
  end

  def average_job_rating_for_all_jobs_for_job_client
    ((JobRating.where(user_id: self.job_client.id).sum(:overall_rating))/(JobRating.where(user_id: self.job_client.id).count)).round if JobRating.where(user_id: self.job_client.id).count > 0
  end

  def job_client_payment_status
    User.find(self.job_client.id).payment_verified
  end

  def job_category
    JobCategory.find_by(id: self.job_category_id).try(:name)
  end

  def job_category_avatar_url
    JobCategory.find_by(id: self.job_category_id).try(:avatar_url)
  end

  def created_at_format
    self.created_at.strftime("%a %b %d %Y %-l:%M %p")
  end

  def state_event=(event)
    self.send(event)
  end

  def is_approved=(val)
    write_attribute(:is_approved, val)
    val && write_attribute(:approved_on,  val && DateTime.now || nil) || ApprovedNotification.new(self).notified!
  end

  def can_view_project_milestone?(current_user)
    accepted_freelancers.include?(current_user)
  end

  delegate :email, to: :user, allow_nil: true
end
