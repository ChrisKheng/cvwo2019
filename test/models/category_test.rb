require 'test_helper'

class CategoryTest < ActiveSupport::TestCase
    def setup
        @category = Category.new(name:  "school")
    end  
    
    test "sample category should be valid" do
        assert @category.valid?
    end
    
    test "category name should not be empty" do
        @category.name = "  "
        assert_not @category.valid?
    end    

    test "category name should be unique" do
        @category.save
        category2 = Category.new(name: "school")
        assert_not category2.valid?
    end    

    test "category name should be at a maximum of 60 characters" do
        @category.name = "a" * 61
        assert_not @category.valid?

        @category.name = "a" *  60
        assert @category.valid?
    end    
end    