import React from 'react';

const TodoItem = ({ todo, toggleTodo }) => {
	const { id, task, isComplete } = todo;

	const handleTodoClick = () => {
		toggleTodo(id);
	};

	return (
		<li>
			<input type="checkbox" checked={isComplete} onChange={handleTodoClick} />
			{task}
		</li>
	);
}

export default TodoItem;