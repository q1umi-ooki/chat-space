class Api::MessagesController < ApplicationController
    before_action :set_group ,only: :index
    def index 
        @messages = @group.messages.where("id > ?",params[:id])
        # @all_messages.each do |message|
        #     if  message.id > params[:id].to_i then
        #          @all_messages << message
        #     end           
        respond_to do |format|
            format.json
        end        
    end
    
    private
    def set_group
        @group = Group.find(params[:group_id])
    end

end
