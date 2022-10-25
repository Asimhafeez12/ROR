class User < ApplicationRecord
  acts_as_taggable_on :skills
  acts_as_taggable_on :languages
  acts_as_reader
  rolify
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  include Devise::JWT::RevocationStrategies::JTIMatcher

  devise :database_authenticatable, :registerable, :jwt_authenticatable, :confirmable,
         :recoverable, :rememberable, :trackable, :validatable, jwt_revocation_strategy: self
  mount_uploader :avatar, FileUploader
  has_many :jobs, dependent: :destroy
  has_many :job_ratings, dependent: :destroy
  has_many :job_incentives, dependent: :destroy
  has_many :invited_user_jobs, -> { where(is_accepted: true) } ,dependent: :destroy
  has_many :jobs_invitations, through: :invited_user_jobs, source: :job
  has_many :user_skills
  has_many :skills, through: :user_skills
  has_many :user_languages
  has_many :languages, through: :user_languages
  has_many :notifications, dependent: :destroy
  has_many :notified_notifications, foreign_key: :recipient_id, dependent: :destroy, class_name: 'Notification'
  has_many :user_chatrooms, dependent: :destroy
  has_many :chatrooms, through: :user_chatrooms
  has_many :chatroom_buddies, through: :chatrooms, source: :users
  has_many :accept_freelancers, dependent: :destroy
  has_many :accepted_jobs, through: :accept_freelancers, source: :job
  has_many :project_milestones, dependent: :destroy
  has_many :user_educations, dependent: :destroy
  has_many :user_certificates, dependent: :destroy
  has_many :user_portfolios, dependent: :destroy
  has_many :user_experiences, dependent: :destroy
  has_many :user_billings, dependent: :destroy

  accepts_nested_attributes_for :notified_notifications, allow_destroy: true, reject_if: true
  accepts_nested_attributes_for :user_chatrooms, allow_destroy: true, reject_if: true
  accepts_nested_attributes_for :user_certificates, allow_destroy: true, reject_if: true
  accepts_nested_attributes_for :user_experiences, allow_destroy: true, reject_if: true
  def total_unread_messages
    ChatroomMessage.where('chatroom_id IN (?) and user_id != ?', UserChatroom.where(user_id: self.id).pluck(:chatroom_id), self.id).unread_by(self).count || false
  end

  def member_since
    created_at.strftime("%B %Y")
  end

  def freelancers_hired_count
    AcceptFreelancer.where('job_id in (?)',self.jobs.pluck(:id)).count
  end

  def member_since
    created_at.strftime("%B %Y")
  end

  def freelancers_hired_count
    AcceptFreelancer.where('job_id in (?)',self.jobs.pluck(:id)).count
  end

  def active_for_authentication?
    super and self.is_not_active.nil?
  end

  def all_job_ratings
    JobRating.where(user_id: self.id)
  end

  def unread_notified_notifications_count
    self.notified_notifications.unread_by(self).count
  end
  def full_name=(val)
    self.first_name, self.last_name = val.split(" ", 2)
  end

  def full_name
    [first_name, last_name].join(" ")
  end
  def role_adder=(role)
    self.add_role({ 1 => 'client', 2 => 'freelancer' }[role.to_i])
  end
  def _r
    roles.pluck(:name)
  end
  def is_confirmed
    self.confirmed_at
  end

  def active_jobs
    self.jobs.where(state: :active).order(created_at: :desc)
  end

  def active_jobs_length
    self.jobs.where(state: :active).count
  end

  def openned_jobs_length
    self.jobs.where(state: :open).count
  end

  def total_job_count_for_freelancer
    self.accepted_jobs.count + self.jobs.where(state: :completed).count
  end

  def job_cover_letters
    JobCoverLetter.where(user_id: self.id).pluck(:job_id)
  end

  def cover_letters
    JobCoverLetter.where(user_id: self.id)
  end

  def expertise_list
    ActsAsTaggableOn::Tagging.all.where(taggable_type: 'User', context: 'skills', taggable_id: self.id).where.not(expert_level: nil).pluck(:expert_level)
  end

  def expertise_list_count
    self.expertise_list.count
  end

  def jobs_count
    self.jobs.count
  end

  def average_job_rating_for_all_jobs
    ((JobRating.where(user_id: self.id).sum(:overall_rating))/(JobRating.where(user_id: self.id).count)).round if JobRating.where(user_id: self.id).count > 0
  end

  def as_json(options={})
    super(methods: [:full_name, :_r, :avatar_url, :is_confirmed, :title, :summary, :skill_list, :language_list, :active_jobs, :expertise_list, :first_name, :last_name, :job_cover_letters, :escrow_knowledge, :phone_number, :active_jobs_length, :openned_jobs_length])
  end

  def avatar=(file)
    file = File.open(Rails.root.join("public").to_s + (@temp_file_path = file)) if file.kind_of? String
    super(file)
  end
  def is_approved=(val)
    write_attribute(:is_approved, val)
    val && write_attribute(:approved_on,  val && DateTime.now || nil) && ApprovedNotification.new(self).notified!
  end
end
