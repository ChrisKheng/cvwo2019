class CategoriesController < ApplicationController
    before_action :load_category, only: %i[update destroy]

    def index
        @categories =  Category.all
        response = @categories.map{|category| getCategoryHash(category)}
        render json: response
    end
    
    def create
        @category = Category.new(category_param)
        if @category.save
            render json: getCategoryHash(@category)
        else
            render json: @category.errors.full_messages
        end    
    end    

    def update
        if @category.update(category_param)
            render json: getCategoryHash(@category)
        else
            render json: @category.errors.full_messages
        end    
    end    

    def destroy
        @category.destroy
    end    

    private
    def load_category
        @category = Category.find(params[:id])
    end    

    def getCategoryHash(category)
        hash = category.attributes
        hash["label"] = hash.delete "name"
        hash
    end    

    # Check and filter params that are passed in
    def category_param
        result = params.require(:category).permit(:label)
        result["name"] = result.delete "label"
        result
    end    
end    