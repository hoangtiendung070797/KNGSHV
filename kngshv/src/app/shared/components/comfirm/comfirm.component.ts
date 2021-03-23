import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-comfirm',
  templateUrl: './comfirm.component.html',
  styleUrls: ['./comfirm.component.scss']
})
export class ComfirmComponent implements OnInit {

  message = '';
  subMessage = null;
  matTooltip = '';
  matTooltipPosition = 'below';
  colorOK = 'primary';
  colorCancel = 'warn';
  constructor(
    @Inject(MAT_DIALOG_DATA) private messageBlock: any,
    private dialogRef: MatDialogRef<ComfirmComponent>,
    public dialog: MatDialog,
  ) {
    this.initializeMessages();
  }

  ngOnInit() {
  }

  public initializeMessages() {
    this.message = this.messageBlock.message;
    this.matTooltip = this.messageBlock.matTooltip;
    this.matTooltipPosition = this.messageBlock.matTooltipPosition;
    this.colorOK = this.messageBlock.colorOK;
    this.colorCancel = this.messageBlock.colorCancel;
    this.subMessage = this.messageBlock?.subMessage;
  }


}
