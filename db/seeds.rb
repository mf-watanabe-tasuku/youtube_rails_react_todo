SAMPLE_TODOS = [
    {
        name: 'Going around the world',
    },
    {
        name: 'graduating from college',
    },
    {
        name: 'publishing a book',
    }
]

SAMPLE_TODOS.each do |todo|
    Todo.create(todo)
end

SAMPLE_TODO_CATEGORIES = [
    {
        name: 'hobby',
    },
    {
        name: 'sports',
    },
    {
        name: 'study',
    },
    {
        name: 'social'
    }
]

SAMPLE_TODO_CATEGORIES.each do |category|
    TodoCategory.create(category)
end