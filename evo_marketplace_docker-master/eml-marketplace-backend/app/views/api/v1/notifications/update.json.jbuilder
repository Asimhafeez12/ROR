json.notifications do
  json.array! @notifications, partial: 'notification', as: :notification
end
json.unread_counts current_user.unread_notified_notifications_count
