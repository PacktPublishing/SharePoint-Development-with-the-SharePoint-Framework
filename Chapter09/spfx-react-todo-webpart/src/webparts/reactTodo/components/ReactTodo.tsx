import * as React from 'react';
import styles from './ReactTodo.module.scss';
import { IReactTodoProps } from './IReactTodoProps';
import { ITodoItem } from '../ITodoItem';
import { IReactTodoState } from './IReactTodoState';
import TodoItemComponent from './TodoItemComponent';
import { CommandButton, PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

export default class ReactTodo extends React.Component<IReactTodoProps, IReactTodoState> {
constructor(props: IReactTodoProps) {
  super(props);
  this.state = {
    todoItems: [],
    showNewTodoPanel: false
  };
  this.props.todoClient.getItems()
  .then((resolvedTodoItems) => {
    this.setState({
      todoItems: resolvedTodoItems
    });
  });
}
private addItem(): void {
  this.setState({showNewTodoPanel: true});
}
private closeNewTodoPanel(): void {
  this.setState({
    showNewTodoPanel: false,
    newItemDone: false,
    newItemTitle: ""
  });
}
private saveNewTodo(): void {
  this.props.todoClient
    .add(this.state.newItemTitle, this.state.newItemDone).then(() => {
      this.setState({newItemDone: false, newItemTitle: "", showNewTodoPanel: false});
      this.refreshTodoItems();
    });
}
private newItemTitleChange(value: string): void {
  this.setState({newItemTitle: value});
}
private toggleNewItemDone(e: any): void {
  this.setState((prevState, props) => ({
    newItemDone: !prevState.newItemDone
  }));
}
private delete(Id: number): void {
  this.props.todoClient.delete(Id);
  this.refreshTodoItems();
}
private edit(TodoItem: ITodoItem): void {
  this.props.todoClient.edit(TodoItem);
  this.refreshTodoItems();
}
public refreshTodoItems(): void {
  this.props.todoClient.getItems().then((resolvedTodoItems: ITodoItem[]) => {
    this.setState({
      todoItems: resolvedTodoItems
    });
  });
}
public render(): React.ReactElement<IReactTodoProps> {
  const items: any[] = [];
  this.state.todoItems.forEach((todoItem: ITodoItem) => {
    items.push(
      <li>
        <TodoItemComponent
          itemId={todoItem.Id}
          itemTitle={todoItem.Title}
          itemDone={todoItem.Done}
          edit={this.edit.bind(this)}
          delete={this.delete.bind(this)}>
        </TodoItemComponent>
      </li>
    );
  });
  return (
    <div className={styles.reactTodo}>
        <div className={styles.container}>
          <div className="ms-font-xxl">To-do list</div>
          <CommandButton
            iconProps={{iconName:"Add"}}
            onClick={this.addItem.bind(this)}>
            Add new To-do
          </CommandButton>
          <Panel
              isOpen={this.state.showNewTodoPanel}
              type={PanelType.smallFixedFar}
              onDismiss={this.closeNewTodoPanel.bind(this)}
              headerText="Add new To-do"
              onRenderFooterContent={ () => {
              return (
                <div>
                  <PrimaryButton
                    onClick={this.saveNewTodo.bind(this)}
                    style={ { 'marginRight': '8px' } } >
                    Save
                  </PrimaryButton>
                  <DefaultButton
                    onClick={this.closeNewTodoPanel.bind(this)}>
                    Cancel
                  </DefaultButton>
                </div>
              );
            } }>
            <TextField
              label="Title"
              underlined
              placeholder="Give your to-do a title"
              value={this.state.newItemTitle}
              onChanged={this.newItemTitleChange.bind(this)}  />
            <Toggle
              label="Done"
              checked={this.state.newItemDone}
              onChanged={this.toggleNewItemDone.bind(this)} />
          </Panel>  
          <ul className={styles.todoList}>
            {items}
          </ul>        
        </div>
      </div>
  );
}
}
