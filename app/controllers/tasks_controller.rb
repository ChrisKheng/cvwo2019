# A controller which performs task related logic.
class TasksController < ApplicationController
  # Loads the task specified by the id given in the url before update and destroy action is performed.
  before_action :load_task, only: %i[update destroy]

  # Returns all the tasks created by the user as an array of custom hashes in JSON to the client
  # for front-end's need. For the detailed content of the hash, refer the documentation of the Tasks component
  # under the javascript folder.
  def index
    @tasks = Task.all
    response = @tasks.map{|task| getTaskHash(task)}
    render json: response
  end

  # Creates a new task in the database using the specified url params and returns the task object as custom hash
  # to the client if the action is successful. Otherwise, returns the error messages to the client.
  def create
    @task = Task.new(task_param)
    if @task.save
      render json: getTaskHash(@task)
    else
      render json: @task.errors.full_messages  
    end
  end

  # Updates the specified task in the database and returns the updated task object as custom hash 
  # to the client if the action is successful. Otherwise, returns the error messages to the client.
  def update
    if @task.update(task_param)
      render json: getTaskHash(@task)
    else
      render json: @task.errors.full_messages
    end
  end

  # Deletes the specified task in the database.
  def destroy
    @task.destroy
  end

  private
  # Loads the task specified in the url from the database into the task attribute of the tasks controller.
  def load_task
    @task = Task.find(params[:id])
  end

  # Returns a custom hash representing the given task object. The attributes of the hash is the same as that of
  # a task object except the hash contains a "tags" attribute which is an array of tags assigned to the task.
  def getTaskHash(task)
    hash = task.attributes
    hash["tags"] = task.categories.to_ary.map{|category|
      attributes = category.attributes
      attributes["label"] = attributes.delete "name"
      attributes
    }
    hash
  end   

  # Checks if task param is present in the url params, then whitelist the properties of the task param.
  def task_param
    params.require(:task).permit(:title, :description, category_ids: [])
  end
end
