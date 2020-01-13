class CategoriesController < ApplicationController
    before_action :load_category, only: %i[update destroy]

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

    def update
        if @category.update(category_param)
            render json: @category
        else
            render json: @category.errors.full_messages
        end    
    end    

    def destroy
    end    

    private
    def load_category
        @category = Category.find(params[:id])
    end    

    # Check and filter params that are passed in
    def category_param
        params.require(:category).permit(:name, :id)
    end    
end    