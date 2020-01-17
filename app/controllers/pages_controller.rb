# A general controller which is used to load certain pages.
class PagesController < ApplicationController
  # Shows the product website of the application.
  def home
  end

  # Shows the application page.
  def app
    current_uri = request.env['PATH_INFO']

    # If the current path is filtered tasks page, check if the tag (category) specified exists.
    # If the tag doesn't exist, return a 404 page not found.
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
