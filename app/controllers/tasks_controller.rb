class TasksController < ApplicationController
  before_action :load_task, only: %i[show edit update destroy]

  def index
    @tasks = Task.all
  end

  def new
    @task = Task.new
  end

  def edit
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

  def update
    if @task.update(task_param)
      flash[:notice] = 'Your task is updated'
      redirect_to task_path(@task)
    else
      render 'edit'
    end
  end

  def show
  end

  def destroy
    @task.destroy
    flash[:notice] = 'Task is deleted'
    redirect_to tasks_path
  end

  private

  def load_task
    @task = Task.find(params[:id])
  end

  def task_param
    params.require(:task).permit(:title, :description)
  end
end
