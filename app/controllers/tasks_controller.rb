class TasksController < ApplicationController
  before_action :load_task, only: %i[show]

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

  def show
  end

  def index
    @tasks = Task.all
  end

  private

  def load_task
    @task = Task.find(params[:id])
  end

  def task_param
    params.require(:task).permit(:title, :description)
  end
end
