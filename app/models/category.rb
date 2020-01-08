class Category < ApplicationRecord
    has_many :task_categories
    has_many :tasks, through: :task_categories
    validates :name, presence: true, length: {maximum: 60}
    validates_uniqueness_of :name
end    