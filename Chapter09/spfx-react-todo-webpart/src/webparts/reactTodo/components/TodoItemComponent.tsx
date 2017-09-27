import * as React from 'react';
import {ITodoItemProps} from "./ITodoItemProps";
import {ITodoItemState} from "./ITodoItemState";
import { CommandButton, PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { ITodoItem } from "../ITodoItem";

export default class TodoItemComponent extends
  React.Component<ITodoItemProps,ITodoItemState> {
constructor (props: ITodoItemProps) {
  super(props);
  this.state = {
      itemDone: this.props.itemDone,
      itemTitle: this.props.itemTitle,
      itemId: this.props.itemId,
      showPanel: false
  };
}
public closePanel(): void {
  this.setState({
      itemTitle: this.props.itemTitle,
      itemDone: this.props.itemDone,
      showPanel: false
  });
}
public showPanel(): void {
  this.setState({
      showPanel: true
  });
}
private itemClicked(e: any, Id: number): void {
    this.setState({showPanel: true});
}
private titleChange(value: string): void {
    this.setState({ itemTitle: value});
}
private toggleDone(e: any): void {
  this.setState((prevState, props) => ({
    itemDone: !prevState.itemDone
  }));
}
private saveClick(): void {
    const changedItem: ITodoItem = {
        Id: this.state.itemId,
        Title: this.state.itemTitle,
        Done: this.state.itemDone
      };
    this.props.edit(changedItem);
    this.setState({showPanel: false});
}
private deleteClick(): void {
  this.props.delete(this.state.itemId);
  this.setState({showPanel: false});
}
public render(): React.ReactElement<ITodoItemProps> {
  const resolvedIconName: string =
    (this.props.itemDone) ? "CheckboxComposite" : "Checkbox";
  return (
      <div>
    <CommandButton
      iconProps={{iconName: resolvedIconName}}
      onClick={(e) => this.itemClicked(e,this.props.itemId)}>
      {this.props.itemTitle}</CommandButton>
    <Panel
      isOpen={this.state.showPanel}
      type={PanelType.smallFixedFar}
      onDismiss={this.closePanel.bind(this)}
      headerText="To-do item details"
      onRenderFooterContent={ () => {
      return (
        <div>
          <PrimaryButton
            onClick={this.saveClick.bind(this)}
            style={ { 'marginRight': '8px' } } >
            Save
          </PrimaryButton>
          <DefaultButton
            onClick={this.closePanel.bind(this)}>
            Cancel
          </DefaultButton>
          <hr/>
          <CommandButton
            iconProps={{iconName:"Remove"}}
            onClick={this.deleteClick.bind(this)}>
            Delete this item
          </CommandButton>
        </div>
      );}}>
        <TextField
          label="Task" underlined
          value={this.state.itemTitle}
          onChanged={this.titleChange.bind(this)}  />
        <Toggle
          label="Done"
          checked={this.state.itemDone}
          onChanged={this.toggleDone.bind(this)} />
      </Panel>  
    </div>
  );
}
}