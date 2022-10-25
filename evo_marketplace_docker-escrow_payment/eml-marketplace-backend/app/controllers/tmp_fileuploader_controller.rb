class TmpFileuploaderController < ApplicationController
  #before_filter :authenticate_user!
  skip_before_action :verify_authenticity_token

  def create
    @file = TempUploader.new
    @file.store!(params[:tmp_file])
    render json: {file: @file.url, id: rand(1..9999), name: @file.url.split("/").last, small: (@file.galery.url rescue ""), geometery: @file.get_geometery }, status: 200
  end
end
