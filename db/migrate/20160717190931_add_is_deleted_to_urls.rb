class AddIsDeletedToUrls < ActiveRecord::Migration
  def change
    add_column :urls, :is_deleted, :boolean
  end
end
