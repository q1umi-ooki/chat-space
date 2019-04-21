class Api::MessagesController < ApplicationController
    before_action :set_group ,only: :index
    def index 
        @messages = @group.messages.where("id > ?",params[:id])      
        respond_to do |format|
            format.json
        end        
    end
    
    private
    def set_group
        @group = Group.find(params[:group_id])
    end

end
