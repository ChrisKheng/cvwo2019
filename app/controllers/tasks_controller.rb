class TasksController < ApplicationController
  before_action :load_task, only: %i[show edit update]

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

  def edit
  end

  def index
    @tasks = Task.all
  end

  def update
    if @task.update(task_param)
      flash[:notice] = 'Your task is updated'
      redirect_to task_path(@task)
    else
      render 'edit'
    end
  end

  private

  def load_task
    @task = Task.find(params[:id])
  end

  def task_param
    params.require(:task).permit(:title, :description)
  end
end
