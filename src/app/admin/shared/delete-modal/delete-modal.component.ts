import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit {
  @Output() ConfirmEvent = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

}
