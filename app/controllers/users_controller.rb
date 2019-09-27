class UsersController < ApplicationController

  def edit
  end

  def update
   if current_users.update(user_params)
    redirect_to root_path
   else
    render :edit
  end
  
  def user_params
    params.require(:user).permit(:name,:email)
end
