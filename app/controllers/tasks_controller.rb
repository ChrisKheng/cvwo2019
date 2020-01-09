# A controller which performs task related logic.
class TasksController < ApplicationController
  # Loads the task specified by the id given in the url before update and destroy action is performed.
  before_action :load_task, only: %i[update destroy]

  # Fetches all tasks and return them.
  def index
    @tasks = Task.all
    response = @tasks.map{|task| getTaskHash(task)}
    render json: response
  end

  # Creates a new task in the database and return the task object as JSON to the client if
  # the action is successful. Otherwise, returns the error message to the client.
  def create
    @task = Task.new(task_param)
    if @task.save
      render json: getTaskHash(@task)
    else
      render json: @task.errors.full_messages  
    end
  end

  # Updates the task specified by the id given in the database and return the updated task object as JSON to the client 
  # if the action is successful. Otherwise, returns the error message to the client.
  def update
    if @task.update(task_param)
      render json: @task
    else
      render json: @task.errors.full_messages
    end
  end

  # Deletes the task specified by the id given in the database.
  def destroy
    @task.destroy
  end

  private

  # Loads the task specified by the id given in the url from the database into the task attribute
  # of the task controller object.
  def load_task
    @task = Task.find(params[:id])
  end

  def getTaskHash(task)
    hash = task.attributes
    hash["tags"] = task.categories.to_ary.map{|category| category.attributes}
    hash
  end   

  # Checks the title and description of the task is empty using the task model.
  # Also filters the params that are passed in
  def task_param
    params.require(:task).permit(:title, :description, category_ids: [])
  end
end
