import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import * as moment from 'moment';
import { ReservationService } from '../services/reservation.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  data: any = {};
  dateDebut = new FormControl();
  dateFin = new FormControl();
  cars: any[] = [];
  carsTemp: any[] = [];
  constructor(private reservationService: ReservationService) {}
  startAnimationForLineChart(chart: any) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on('draw', (data: any) => {
      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path
              .clone()
              .scale(1, 0)
              .translate(0, data.chartRect.height())
              .stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint,
          },
        });
      } else if (data.type === 'point') {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'ease',
          },
        });
      }
    });

    seq = 0;
  }
  startAnimationForBarChart(chart: any) {
    let seq2: any, delays2: any, durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on('draw', (data: any) => {
      if (data.type === 'bar') {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: 'ease',
          },
        });
      }
    });

    seq2 = 0;
  }

  loadCars() {
    this.reservationService
      .getCarsWithcontrat('', ''
      )
      .subscribe((res: any) => {
        this.cars = res;
        this.carsTemp = res;
      });
  }

  clear(){
    this.dateDebut.reset();
    this.dateFin.reset();
  }

  calculRevunu(contrat: any): string {
    const f: any[] = contrat.map((e: any) => {
      return {
        days: moment(e.backAt ? e.backAt : e.endAt ? e.endAt : moment()).diff(
          moment(e.satrtAt),
          'days'
        ),
        price: e.price,
      };
    });

    return new Intl.NumberFormat('fr-FR').format( f.reduce(
      (accumulator, currentValue) =>
        accumulator + currentValue.days * currentValue.price,
      0
    ))+' DH';
  }

  ngOnInit() {
    this.loadCars();
    this.dateDebut.valueChanges.subscribe((res) => {
      const startAt = this.dateDebut.value ? moment(this.dateDebut.value) : null;
      const endAt = this.dateFin.value ? moment(this.dateFin.value) : null;
      if(startAt && endAt){
        this.carsTemp = this.cars.map(r=> {
          return {
            ...r,
            contrats: r.contrats.filter((e:any)=>moment(e.endAt).diff(endAt,'days')<=0 && moment(e.satrtAt).diff(startAt,'days')>0)
          }
        });
      }else if(startAt){
        this.carsTemp = this.cars.map(r=> {
          return {
            ...r,
            contrats:r.contrats.filter((e:any)=>moment(e.satrtAt).diff(startAt,'days')>0)
          }
        });
      }
    });

    this.dateFin.valueChanges.subscribe((res) => {
      this.carsTemp = this.cars;
      const startAt = this.dateDebut.value ? moment(this.dateDebut.value) : null;
      const endAt = this.dateFin.value ? moment(this.dateFin.value) : null;
      
      if(startAt && endAt){
        this.carsTemp = this.cars.map((r,i)=> {
          return {
            ...r,
            contrats: r.contrats.filter((e:any)=>moment(e.endAt).diff(endAt,'days')<=0 && moment(e.satrtAt).diff(startAt,'days')>0)
          }
        });
      } else if(endAt){
        this.carsTemp = this.cars.map(r=> {
          return {
            ...r,
            contrats: r.contrats.filter((e:any)=>moment(e.endAt).diff(endAt,'days')<=0)
          }
        });
      }
      
    });

    this.reservationService.getStatistique().subscribe((res) => {
      this.data = res;
    });

    /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

    const dataDailySalesChart: any = {
      labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      series: [[12, 17, 7, 17, 23, 18, 38]],
    };

    const optionsDailySalesChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0,
      }),
      low: 0,
      high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    };

    const dailySalesChart = new Chartist.Line(
      '#dailySalesChart',
      dataDailySalesChart,
      optionsDailySalesChart
    );

    this.startAnimationForLineChart(dailySalesChart);

    /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

    const dataCompletedTasksChart: any = {
      labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
      series: [[230, 750, 450, 300, 280, 240, 200, 190]],
    };

    const optionsCompletedTasksChart: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0,
      }),
      low: 0,
      high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    };

    const completedTasksChart = new Chartist.Line(
      '#completedTasksChart',
      dataCompletedTasksChart,
      optionsCompletedTasksChart
    );

    // start animation for the Completed Tasks Chart - Line Chart
    this.startAnimationForLineChart(completedTasksChart);

    /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

    const datawebsiteViewsChart = {
      labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
      series: [[542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]],
    };
    const optionswebsiteViewsChart = {
      axisX: {
        showGrid: false,
      },
      low: 0,
      high: 1000,
      chartPadding: { top: 0, right: 5, bottom: 0, left: 0 },
    };
    const responsiveOptions: any[] = [
      [
        'screen and (max-width: 640px)',
        {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: (value: any) => {
              return value[0];
            },
          },
        },
      ],
    ];
    const websiteViewsChart = new Chartist.Bar(
      '#websiteViewsChart',
      datawebsiteViewsChart,
      optionswebsiteViewsChart,
      responsiveOptions
    );

    //start animation for the Emails Subscription Chart
    this.startAnimationForBarChart(websiteViewsChart);
  }
}
