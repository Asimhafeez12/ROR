# encoding: utf-8
class TempUploader < CarrierWave::Uploader::Base
  #include CarrierWave::RMagick
  include CarrierWave::MiniMagick

  IMAGE_EXTENSIONS = %w(jpg jpeg gif png)
  DOCUMENT_EXTENSIONS = %w(pdf doc docx xlsx ppt pptx odt fodt ods fods odp fodp)
  VIDEO_EXTENSIONS = %w(mp4 flv mpg avi mov)

  storage :file

  process :resize_to_limit => [700, 500], :if => :is_image?
  def store_dir
    "uploads/temp/#{Date.current.to_s}/"
  end

  # Provide a default URL as a default if there hasn't been a file uploaded:
  #def default_url
  #  "/images/fallback/" + [version_name, "default.png"].compact.join('_')
  #end

  # create a new "process_extensions" method.  It is like "process", except
  # it takes an array of extensions as the first parameter, and registers
  # a trampoline method which checks the extension before invocation
  def self.process_extensions(*args)
    extensions = args.shift
    args.each do |arg|
      if arg.is_a?(Hash)
        arg.each do |method, args|
          processors.push([:process_trampoline, [extensions, method, args]])
        end
      else
        processors.push([:process_trampoline, [extensions, arg, []]])
      end
    end
  end

  # our trampoline method which only performs processing if the extension matches
  def process_trampoline(extensions, method, args)
    extension = File.extname(original_filename).downcase
    extension = extension[1..-1] if extension[0, 1] == '.'
    self.send(method, *args) if extensions.include?(extension)
  end

  #version :encode, :if => :not_doc? do
  #  process_extensions VIDEO_EXTENSIONS, :encode_video
  #end

  version :thumb, :if => :not_doc? do
    process_extensions IMAGE_EXTENSIONS, :resize_to_fit => [100, 70]
    process_extensions VIDEO_EXTENSIONS, :convert => 'png'
  end

   version :galery, :if => :not_doc? do
    process_extensions IMAGE_EXTENSIONS, :resize_to_fit => [84, 74]
    process_extensions VIDEO_EXTENSIONS, :convert => 'png'
   end

  def extension_white_list
    IMAGE_EXTENSIONS + DOCUMENT_EXTENSIONS + VIDEO_EXTENSIONS
  end
  def get_geometery
    `identify -format "%wx%h" #{file.path}`.gsub("\n", "").split("x") if is_image?(file)
  end

  def filename
    "#{original_filename.split('.').first}_#{secure_token}.#{file.extension}" if original_filename
  end
  protected
  def secure_token(length=16)
    @secure_token ||= SecureRandom.hex(8)
  end

  def not_doc?(new_file)
    !(TempUploader::DOCUMENT_EXTENSIONS.include?(new_file.file.split(".").last))
  end
  def is_image?(new_file)
    (TempUploader::IMAGE_EXTENSIONS.include?(( new_file.file.split(".").last.downcase rescue new_file.file.original_filename.split(".").last.downcase )))
  end
end
