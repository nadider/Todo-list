import TodoListItem from '../TodoListItem';
import './index.css';

const TodoList = ({ todos, onToggleImportant, onToggleDone, onDelete }) => {

    const elements = todos.map((item) => {
        const { id, ...itemProps } = item;
        return (
            <li key={id} className="list-group-item">
                <TodoListItem
                    { ...itemProps }
                    onToggleImportant={ () => onToggleImportant(id) }
                    onToggleDone={ () => onToggleDone(id) }
                    onDelete={ () => onDelete(id) } />
            </li>
        );
    });

    return (<ul className="todo-list list-group">{ elements }</ul>);
};

export default TodoList;
