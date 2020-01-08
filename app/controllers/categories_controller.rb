class CategoriesController < ApplicationController
    def index
        @categories =  Category.all
        render json: @categories
    end
    
    def show
        render json: "dummy"
    end

    def create
        @category = Category.new(category_param)
        if @category.save
            render json: @category
        else
            render json: @category.errors.full_messages
        end    
    end    

    # Check and filter params that are passed in
    def category_param
        params.require(:category).permit(:name)
    end    
end    