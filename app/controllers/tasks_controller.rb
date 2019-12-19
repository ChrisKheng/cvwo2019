class TasksController < ApplicationController
  def new
    @task = Task.new
  end

  def create
    @task = Task.new(task_param)
    if @task.save
      flash[:notice] = 'Your task is successfully saved!'
      redirect_to task_path(@task)
    else
      render 'new'
    end
  end

  private

  def task_param
    params.require(:task).permit(:title, :description)
  end
end
