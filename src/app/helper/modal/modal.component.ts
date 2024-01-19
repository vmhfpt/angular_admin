import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  
})
export class ModalComponent  {
  @Input() nameDelete: string = '';
  @Output() onConfirmDelete = new EventEmitter<string>();

  public onDelete(){
    this.onConfirmDelete.emit();
  }
}
