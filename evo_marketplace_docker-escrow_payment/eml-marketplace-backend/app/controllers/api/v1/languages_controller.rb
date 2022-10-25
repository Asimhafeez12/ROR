class Api::V1::LanguagesController < ApplicationController
  def index
    render json: ActsAsTaggableOn::Tag.where(id: ActsAsTaggableOn::Tagging.where(context: "languages").pluck(:tag_id).uniq)
  end
end
