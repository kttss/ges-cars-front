import { Injectable } from '@angular/core';
import swal from 'sweetalert2';

declare let $: any;

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  success(msg: string) {
    this.showAlert(msg, 'success');
  }

  error(msg: string) {
    this.showAlert(msg, 'danger');
  }

  info(msg: string) {
    this.showAlert(msg, 'info');
  }

  private showAlert(message: string, type: string) {
    $.notify(
      {
        icon: 'notifications',
        message,
      },
      {
        type,
        timer: 4000,
        placement: {
          from: 'top',
          align: 'right',
        },
        template:
          '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
          '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
          '</div>',
      }
    );
  }

  handleDelete() {
    return swal({
      title: 'Suppression!',
      text: 'Voulez-vous vraiment supprimer?',
      // type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, Supprimer',
      cancelButtonText: 'No',
      confirmButtonClass: 'btn btn-danger',
      cancelButtonClass: 'btn btn-link',
      buttonsStyling: false,
    });
    // .then((result) => {
    //   if (result.value) {
    //     request.subscribe((res: any) => {});
    //   }
    // });
  }

  handleSucces() {
    swal({
      title: 'Supprimé !',
      text: '',
      type: 'success',
      confirmButtonClass: 'btn btn-success',
      buttonsStyling: false,
    }).catch(swal.noop);
  }
}
