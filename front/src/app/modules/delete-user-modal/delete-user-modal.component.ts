import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delete-user-modal',
  templateUrl: './delete-user-modal.component.html',
  styleUrls: ['./delete-user-modal.component.css']
})
export class DeleteUserModalComponent {
  @Output() closeModal = new EventEmitter<boolean>();
  @Output() deleteConfirmed = new EventEmitter<boolean>();

  confirmedDelete(){
    //Emitimos la confirmación de eliminacion del usuario al componente padre
    this.deleteConfirmed.emit(true);
  }

  cancelDelete(){
    //Emitimos la cancelación de eliminacion del usuario al componente padre
    this.closeModal.emit(false);
  }
}
