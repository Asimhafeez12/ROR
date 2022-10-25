class Api::V1::SkillsController < ApplicationController
  def index
    render json: ActsAsTaggableOn::Tag.where(id: ActsAsTaggableOn::Tagging.where(context: "skills").pluck(:tag_id).uniq)
  end
end
