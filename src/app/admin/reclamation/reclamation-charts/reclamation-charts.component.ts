import {Component, OnInit} from '@angular/core';
import {ReclamationService} from "../../../_services/reclamation.service";
import { ChartjsComponent } from '@coreui/angular-chartjs';

@Component({
  selector: 'app-reclamation-charts',
  templateUrl: './reclamation-charts.component.html',
  styleUrls: ['./reclamation-charts.component.scss'],
})
export class ReclamationChartsComponent implements OnInit {

  constructor(private RS: ReclamationService) {
  }

  years: number[] = [2020, 2021, 2022, 2023, 2024]
  reclamationCount!: number[][]
  reclamationStatusCount!: number[][]
  reclamationsTypeCount!: any[][]
  reclamationsTargetCount!: any[][]
  dataMonths: any
  dataCompared: any
  dataComparison:any
  dataStatus: any
  dataTypes: any
  dataTargets: any
  datasets: any
  dataPrevSets: any
  selectedYear!: number
  selectPrevYear!: number
  yearlyCount = 0
  yearlyProcessed = 0

  allReclamations = 0

  January = 0
  February = 0
  March = 0
  April = 0
  May = 0
  June = 0
  July = 0
  August = 0
  September = 0
  October = 0
  November = 0
  December = 0

  ngOnInit(): void {

    this.RS.countAllReclamation().subscribe(res => this.allReclamations = res);

  }

  compareCountByYear(year: number) {

    this.January = 0
    this.February = 0
    this.March = 0
    this.April = 0
    this.May = 0
    this.June = 0
    this.July = 0
    this.August = 0
    this.September = 0
    this.October = 0
    this.November = 0
    this.December = 0

    this.RS.countAllReclamationByMonth(year).subscribe(res => {
      //console.log(res);
      this.reclamationCount = res;
      this.reclamationCount.forEach(e => {
        //console.log(' month: ' + e[0] + ' count: ' + e[1]);
        switch (e[0]) {
          case 1:
            this.January = e[1];
            break;
          case 2:
            this.February = e[1];
            break;
          case 3:
            this.March = e[1];
            break;
          case 4:
            this.April = e[1];
            break;
          case 5:
            this.May = e[1];
            break;
          case 6:
            this.June = e[1];
            break;
          case 7:
            this.July = e[1];
            break;
          case 8:
            this.August = e[1];
            break;
          case 9:
            this.September = e[1];
            break;
          case 10:
            this.October = e[1];
            break;
          case 11:
            this.November = e[1];
            break;
          case 12:
            this.December = e[1];
            break;
        }
      })
      this.dataComparison = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
          {
            label: 'Selected Year',
            backgroundColor: 'rgba(39, 41, 245, 0.97)',
            borderColor: 'rgba(39, 41, 245, 0.97)',
            pointBackgroundColor: 'rgba(39, 41, 245, 0.97)',
            pointBorderColor: '#fff',
            data: []
          },
          {
            label: 'Compared Year',
            backgroundColor: 'rgba(245, 39, 80, 0.97)',
            borderColor: 'rgba(245, 39, 80, 0.97)',
            pointBackgroundColor: 'rgba(245, 39, 80, 0.97)',
            pointBorderColor: '#fff',
            data: []
          }
        ]
      }
      this.dataCompared = {
        datasets: [
          {
            data: [this.January, this.February, this.March, this.April, this.May, this.June, this.July, this.August, this.September, this.October, this.November, this.December]
          }
        ]
      }
      this.dataCompared.datasets[0].data.forEach((e: any)=>{
        this.dataComparison.datasets[0].data.push(e)
      })
      this.dataMonths.datasets[0].data.forEach((e: any)=>{
        this.dataComparison.datasets[1].data.push(e)
      })
      //this.dataComparison.datasets[0].data.fill(this.dataCompared.datasets[0].data);
      console.log("dataCompared "+this.dataCompared.datasets[0].data)
      //this.dataComparison.datasets[1].data.fill(this.dataMonths.datasets[0].data);
      console.log("dataMonths "+this.dataMonths.datasets[0].data)
      console.log("dataComparison 0 "+this.dataComparison.datasets[0].data)
      console.log("dataComparison 1 "+this.dataComparison.datasets[1].data)
      console.log("dataComparison "+this.dataComparison.datasets)

      // this.dataTypes.datasets.fill(this.datasets,1)
    });
  }

  filterCountByYear(year: number) {

    this.yearlyCount = 0
    this.yearlyProcessed = 0
    this.January = 0
    this.February = 0
    this.March = 0
    this.April = 0
    this.May = 0
    this.June = 0
    this.July = 0
    this.August = 0
    this.September = 0
    this.October = 0
    this.November = 0
    this.December = 0

    this.RS.countAllReclamationByMonth(year).subscribe(res => {
      //console.log(res);
      this.reclamationCount = res;
      this.reclamationCount.forEach(e => {
        //console.log(' month: ' + e[0] + ' count: ' + e[1]);
        this.yearlyCount += e[1]
        switch (e[0]) {
          case 1:
            this.January = e[1];
            break;
          case 2:
            this.February = e[1];
            break;
          case 3:
            this.March = e[1];
            break;
          case 4:
            this.April = e[1];
            break;
          case 5:
            this.May = e[1];
            break;
          case 6:
            this.June = e[1];
            break;
          case 7:
            this.July = e[1];
            break;
          case 8:
            this.August = e[1];
            break;
          case 9:
            this.September = e[1];
            break;
          case 10:
            this.October = e[1];
            break;
          case 11:
            this.November = e[1];
            break;
          case 12:
            this.December = e[1];
            break;
        }
      })

      this.dataMonths = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
          {
            label: 'Reclamations',
            backgroundColor: '#e12222',
            data: [this.January, this.February, this.March, this.April, this.May, this.June, this.July, this.August, this.September, this.October, this.November, this.December]
          }
        ]
      }
    });

    this.RS.countReclamationStatusByYear(year).subscribe(res => {
      //console.log(res)
      this.reclamationStatusCount = res;
      this.reclamationStatusCount.forEach(e => {
        this.yearlyProcessed = e[0];
      })

      this.dataStatus = {
        labels: ['Open', 'Closed'],
        datasets: [
          {
            label: 'Status',
            backgroundColor: ['#DD1B16', '#1bd507'],
            data: [this.yearlyCount - this.yearlyProcessed, this.yearlyProcessed]
          }
        ]
      }
    })

    this.RS.countReclamationTypeByYear(year).subscribe(res => {
      this.reclamationsTypeCount = res
      this.datasets = {
        backgroundColor: [],
        data: []
      }
      this.dataTypes = {
        labels: [],
        datasets: [
          {
            label: 'Type',
            backgroundColor: [],
            data: []
          }
        ]
      }

      this.reclamationsTypeCount.forEach(e => {
        this.datasets.data.push(e[1]);
        this.datasets.backgroundColor.push('#' + Math.floor(Math.random() * 16777215).toString(16))
        this.dataTypes.labels.push(e[0])
        // this.dataTargets.labels.datasets.data.push(e[1])
        // this.dataTargets.labels.datasets.backgroundColor.push('#DD1B16')
      })
      this.dataTypes.datasets.fill(this.datasets)
      // this.dataTargets.datasets.push(this.datasets.data)

      console.log(this.dataTypes)
    });

    this.RS.countReclamationTargetByYear(year).subscribe(res => {
      //console.log(res)
      this.reclamationsTargetCount = res;
      this.datasets = {
        backgroundColor: [],
        data: []
      }
      this.dataTargets = {
        labels: [],
        datasets: [
          {
            label: 'Target',
            backgroundColor: [],
            data: []
          }
        ]
      }

      this.reclamationsTargetCount.forEach(e => {
        this.datasets.data.push(e[1]);
        this.datasets.backgroundColor.push('#' + Math.floor(Math.random() * 16777215).toString(16))
        this.dataTargets.labels.push(e[0])
        // this.dataTargets.labels.datasets.data.push(e[1])
        // this.dataTargets.labels.datasets.backgroundColor.push('#DD1B16')
      })
      this.dataTargets.datasets.fill(this.datasets)
      // this.dataTargets.datasets.push(this.datasets.data)

      console.log(this.dataTargets)
    })

    //console.log('yearly count: ' + this.yearlyCount)
    //console.log('yearly processed: ' + this.yearlyProcessed)


  }

}
