class Task < ApplicationRecord
  has_many :task_categories
  has_many :categories, through: :task_categories
  validates :title, presence: true
  validates :description, presence: true
end