class Api::V1::TodoCategoriesController < ApplicationController
    def index
        todo_categories = TodoCategory.order(created_at: :desc)
        render json: todo_categories
    end

    def show
        todo_category = TodoCategory.find(params[:id])
        render json: todo_category
    end

    def create
        todo_category = TodoCategory.new(todo_category_params)
        if todo_category.save
            render json: todo_category
        else
            render json: todo_category.errors, status: 422
        end
    end

    def update
        todo_category = TodoCategory.find(params[:id])
        if todo_category.update(todo_category_params)
            render json: todo_category
        else
            render json: todo_category.errors, status: 422
        end
    end

    def destroy
        todo_category = TodoCategory.find(params[:id])
        if todo_category.destroy
            render json: todo_category
        else
            render json: { error: "Failed to destroy" }, status: 422
        end
    end

    private

    def todo_category_params
        params.require(:todo_category).permit(:name)
    end
end