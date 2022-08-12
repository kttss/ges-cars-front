import { Component, OnInit } from '@angular/core';
import { jsPDF } from 'jspdf';
import * as $ from 'jquery';
import html2canvas from 'html2canvas';
import { map, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ReservationService } from '../../services/reservation.service';
import { FileService } from '../../services/file.service';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ges-cars-contrat-page',
  templateUrl: './contrat-page.component.html',
  styleUrls: ['./contrat-page.component.scss'],
})
export class ContratPageComponent implements OnInit {
  image = '';
  data: any;
  constructor(
    private http: HttpClient,
    private contartService: ReservationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.url.subscribe((url) => {
      const id = Number(url[1].path);
      this.loadData(id);
    });
  }

  loadData(id: any) {
    this.contartService.getcontratdata(id).subscribe((res) => {
      this.data = res;

      this.data.days = moment(this.data.end_at).diff(
        moment(this.data.start_at),
        'days'
      );

      const url = this.data.logo;
      const ext = url.substring(url.lastIndexOf('.') + 1, url.length);

      this.imageUrlToBase64(url).subscribe((dd) => {
        this.image = 'data:image/' + ext + ';base64,' + dd;
      });
    });
  }

  imageUrlToBase64(urL: string) {
    return this.http
      .get(urL, {
        observe: 'body',
        responseType: 'arraybuffer',
      })
      .pipe(
        take(1),
        map((arrayBuffer: any) =>
          btoa(
            Array.from(new Uint8Array(arrayBuffer))
              .map((b) => String.fromCharCode(b))
              .join('')
          )
        )
      );
  }

  async getBase64FromUrl(url: string) {
    const data = await fetch(url);
    const blob = await data.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result;
        resolve(base64data);
      };
    });
  }

  download() {
    const c = document.getElementById('contrat');
    if (c) {
      html2canvas(c, { scale: 5 }).then((canvas) => {
        let width = canvas.width;
        let height = canvas.height;
        // const pdf = new jsPDF('p', 'px', 'a4');
        const pdf = new jsPDF({ format: 'a4' });

        width = pdf.internal.pageSize.getWidth();
        height = pdf.internal.pageSize.getHeight();

        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        pdf.internal.scaleFactor = 0.9;
        pdf.addImage(imgData, 'JPEG', 5, 5, 200, 285);

        pdf.save('contrat.pdf');
      });
    }
  }
}
