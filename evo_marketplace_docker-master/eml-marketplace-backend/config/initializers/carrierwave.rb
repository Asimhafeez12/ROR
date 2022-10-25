CarrierWave.configure do |config|
  config.fog_provider = 'fog/aws'                        # required
  config.fog_credentials = {
    provider:              'AWS',                        # required
    aws_access_key_id:     'AKIAIVXKFQJRJGOJF65Q',                        # required
    aws_secret_access_key: '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',                        # required
    region: 'us-east-2'
  }

  config.fog_directory  = 'evomarketplace'                                  # required
  #config.fog_attributes = { cache_control: "public, max-age=#{365.days.to_i}" } # optional, defaults to {}
  Rails.env.development? && config.asset_host = "http://localhost:8080/" || nil
end
