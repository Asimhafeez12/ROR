class ApprovedNotification
  attr_accessor :obj
  def initialize(obj)
    self.obj = obj
  end
  
  def notified!
    find_user.notified_notifications.build(action: "notifications.#{action}.approved",notifiable_type: "User", notifiable_id: find_user.id)
  end
 def find_user
   obj.is_a?(User) && obj || job.user
 end
 def action
   obj.class.model_name.to_s.downcase
 end
end
