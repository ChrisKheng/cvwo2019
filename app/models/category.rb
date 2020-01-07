class Category < ApplicationRecord
    validates :name, presence: true, length: {maximum: 60}
    validates_uniqueness_of :name
end    