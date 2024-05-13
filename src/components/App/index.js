import React from 'react';
import AppHeader from '../AppHeader';
import SearchBar from '../SearchBar';
import TodoList from '../TodoList';
import StatusFilter from '../StatusFilter';
import AddItem from '../AddItem';
import './index.css';

class App extends React.Component {
  
  maxId = 200;

  state = {
    todoData: [
      { label: 'Drink Coffee', isImportant: false, done: false, id: 1 },
      { label: 'Learn React', isImportant: true, done: false, id: 2 },
      { label: 'Build React App', isImportant: true, done: true, id: 3 },
    ],
    search: '',
    filter: 'all',
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex(el => el.id === id);
      const beforeArray = todoData.slice(0, idx);
      const afterArray = todoData.slice(idx + 1);
      const newArray = [...beforeArray, ...afterArray];

      return {
        todoData: newArray,
      };
    });
  };

  onToggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex(el => el.id === id);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    const newArr = [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];

    return {
      todoData: newArr,
    };
  };

  onToggleImportant = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex(el => el.id === id);
      const oldItem = todoData[idx];
      const newItem = { ...oldItem, isImportant: !oldItem['isImportant'] };

      const newArr = [
        ...todoData.slice(0, idx),
        newItem,
        ...todoData.slice(idx + 1),
      ];

      return {
        todoData: newArr,
      };
    });
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => this.onToggleProperty(todoData, id, 'done')
    );
  };

  onSearchChange = (find) => {
    this.setState({
      search: find,
    });
  };

  onFilterChange = (name) => {
    this.setState({
      filter: name,
    });
  };

  addItem = (text) => {
    const newItem = {
      label: text,
      isImportant: false,
      done: false,
      id: this.maxId++,
    };

    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem];

      return {
        todoData: newArr,
      };
    });
  };

  render() {
    const { todoData, filter, search } = this.state;

    const doneCount = this.state.todoData.filter(el => el.done).length;
    const todoCount = this.state.todoData.length - doneCount;

    const filtered = todoData.filter(item => {
      if (filter === 'all') {
        return true;
      }

      if (filter === 'active') {
        return !item.done;
      }

      if (filter === 'done') {
        return item.done;
      }
    });

    const FilterFind = filtered.filter(
      item =>
        item.label.toLowerCase().indexOf(this.state.search.toLowerCase()) >= 0
    );

    return (<div className='app-todo'>
        <AppHeader toDo={todoCount} done={doneCount} />
        <SearchBar onSearchChange={this.onSearchChange} />
        <StatusFilter filter={filter} onFilterChange={this.onFilterChange} />
        <TodoList
          todos={FilterFind}
          onDelete={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <AddItem onItemAdded={this.addItem} />
      </div>);
  }
}

export default App;
