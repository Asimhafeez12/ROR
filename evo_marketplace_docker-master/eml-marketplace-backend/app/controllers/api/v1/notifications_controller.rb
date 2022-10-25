class Api::V1::NotificationsController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!

  def index
    #@notifications = current_user.notified_notifications.unread_by(current_user).order(created_at: :desc)
    @notifications = current_user.notified_notifications.limit(8).order(created_at: :desc)
  end

  def update
  	Notification.where(recipient_id: current_user.id).mark_as_read! :all, for: current_user if Notification.where(recipient_id: current_user.id).unread_by(current_user).count > 0
  	@notifications = current_user.notified_notifications.limit(8).order(created_at: :desc)
  end

  def all_notifications
    @notifications = current_user.notified_notifications.order(created_at: :desc)
  end

  private
  def notification
    @notification = Notification.find(params[:id])
  end
end
