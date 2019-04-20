class UsersController < ApplicationController

  def index 
    @group = Group.find(params[:group_id])
    @members = @group.users
    @searchedUsers = User.where('name LIKE(?)', "#{params[:name]}%") #.where.not(id: current_user.id)
    @users = @searchedUsers - @members
      respond_to do |format|
          format.html 
          format.json
      end 
  end

  def edit
  end

  def update
    if current_user.update(user_params) #current_user.update(user_paramsが成功したとき)
      redirect_to root_path
    else
      render :edit
    end
  end

private
  def user_params
    params.require(:user).permit(:name, :email)
  end

end
