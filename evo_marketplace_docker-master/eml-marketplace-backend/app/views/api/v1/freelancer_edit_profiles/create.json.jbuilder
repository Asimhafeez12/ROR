if @user.errors.any?
    json.errors @user.errors
else
    json.extract! @user, :summary
end