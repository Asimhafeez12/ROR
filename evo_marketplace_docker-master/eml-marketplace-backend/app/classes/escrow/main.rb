require 'net/http'
require 'json'

class Escrow::Main

  def urn
    raise NotImplementedError
  end

  def data
    raise NotImplementedError
  end

  def uri
    @uri ||= URI(escrow[:url] + urn)
  end

  def response
    Hashit.new(JSON.parse(request.body))
  end

  def escrow
    @escrow ||= Rails.application.secrets[:escrow]
  end
  self.class_eval do
    %w(post patch).each do |klass_name|
      define_method klass_name do
        rq = "Net::HTTP::#{klass_name.titleize}".constantize.new(uri.request_uri).tap do |rq|
          rq["content-type"] = 'application/json'
          rq.basic_auth(escrow[:email], escrow[:api_key])
          rq.body = data.to_json
        end
        http.request(rq)
      end
    end
  end

  def http
    Net::HTTP.new(uri.host, uri.port).tap {|http| http.use_ssl = true}
  end
end
