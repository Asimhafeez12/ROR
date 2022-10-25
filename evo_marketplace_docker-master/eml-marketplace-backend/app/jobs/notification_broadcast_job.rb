class NotificationBroadcastJob < ApplicationJob
  queue_as :default

  def perform(notification, recipient_id=nil)
    ActionCable.server.broadcast "notifications:#{recipient_id || notification.recipient_id}", message: JSON.parse(render_notification(notification))
  end

  private
  def render_notification(notification)
    obj_controller(notification).render partial: c_to_s(notification).downcase, locals: { c_to_s(notification).downcase.to_sym  => notification}, formats: [:json]
  end

  def obj_controller(notification)
    "Api::V1::#{obj_controller_name(notification)}Controller".constantize
  end

  def obj_controller_name(notification)
    c_to_s(notification).pluralize
  end

  def c_to_s(notification)
    ({'ChatroomMessage':'Message'}.with_indifferent_access[_=notification.model_name.to_s] || 'Notification')
  end
end
