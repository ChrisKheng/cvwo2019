# A controller which performs categories (tags) related logic.
class CategoriesController < ApplicationController
    # Loads the category specified before update and destroy action
    before_action :load_category, only: %i[update destroy]

    # Returns all the categories created by the user as an array of custom hashes in JSON to the client
    # for front-end's need. For the detailed content of the hash, refer the documentation of the Tasks component
    # under the javascript folder.
    def index
        @categories =  Category.all
        response = @categories.map{|category| get_category_hash(category)}
        render json: response
    end
    
    # Creates a new category in the database using the specified url params and returns the category object 
    # as custom hash to the client if the action is successful. Otherwise, returns the error messages to the client.
    def create
        @category = Category.new(category_param)
        if @category.save
            render json: get_category_hash(@category)
        else
            render json: @category.errors.full_messages
        end    
    end    

    # Updates the specified category in the database and returns the updated category object as custom hash 
    # to the client if the action is successful. Otherwise, returns the error messages to the client.
    def update
        if @category.update(category_param)
            render json: get_category_hash(@category)
        else
            render json: @category.errors.full_messages
        end    
    end    

    # Deletes the specified category in the database.
    def destroy
        @category.destroy
    end    

    private
    # Loads the category specified in the url from the database into the category attribute
    # of the categories controller.
    def load_category
        @category = Category.find(params[:id])
    end    

    # Returns a custom hash representing the given category object. The attributes of the hash is the same as that of
    # a category object except the key "name" is changed to "label" instead for front-end's need.
    def get_category_hash(category)
        hash = category.attributes
        hash["label"] = hash.delete "name"
        hash
    end    

    # Checks if the category param is present in the url params, then whitelist the properties of the category param.
    def category_param
        result = params.require(:category).permit(:label)
        result["name"] = result.delete "label"
        result
    end    
end    