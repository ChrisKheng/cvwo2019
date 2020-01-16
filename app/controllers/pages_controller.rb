# A general controller which is used to load certain pages.
class PagesController < ApplicationController
  def home
  end

  def app
    current_uri = request.env['PATH_INFO']
    if (current_uri.match(/^\/app\/tasks\/tags\/\d+$/))
      id = params["tagId"].to_i
      begin
        Category.find(id)
      rescue
        raise ActionController::RoutingError, 'Not Found'
      end  
    end  
  end
end
