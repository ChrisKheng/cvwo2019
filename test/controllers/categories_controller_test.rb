require 'test_helper'

class CategoriesControllerTest < ActionDispatch::IntegrationTest
    def setup
        @category = Category.create(name: "chores")
    end    

    test  "should get categories index" do
        get categories_path
        assert_response :success
    end
    
    test "should get show" do
        get category_path(@category)
        assert_response :success
    end    

    test "should create new category" do
        assert_difference  'Category.count', 1 do
            post categories_path, params: {category: {name: "workout"}}
        end    
        
        newCategory = Category.find_by name: "workout"
        assert newCategory.present?
    end    
end    