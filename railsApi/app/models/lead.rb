class Lead < ApplicationRecord

    validates :nome, :email, :cargo, presence: true
end
