import {Component, OnInit} from '@angular/core';
import {ReclamationService} from "../../../_services/reclamation.service";
import {User} from "../../../models/User";
import {MatTableDataSource} from "@angular/material/table";
import {Reclamation} from "../../../models/Reclamation";

@Component({
  selector: 'app-reclamation-charts',
  templateUrl: './reclamation-charts.component.html',
  styleUrls: ['./reclamation-charts.component.scss']
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
  dataStatus: any
  dataTypes: any
  dataTargets: any
  datasets: any
  selectedYear!: number
  yearlyCount = 0
  yearlyProcessed = 0
  clubsCount = 0
  eventsCount = 0
  otherCount = 0

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

  filterCountByYear(year: number) {

    this.yearlyCount = 0
    this.yearlyProcessed = 0
    this.clubsCount = 0
    this.eventsCount = 0
    this.otherCount = 0
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
      //console.log(res)
      this.reclamationsTypeCount = res;
      this.reclamationsTypeCount.forEach(e => {
        //console.log('type: ' + e[0] + ' count: ' + e[1]);
        e[0] === 'EVENT' ? this.eventsCount = e[1] :
          e[0] == 'CLUB' ? this.clubsCount = e[1] :
            e[0] == 'OTHER' ? this.otherCount = e[1] :
              console.log('null: ' + e)
      })

      this.dataTypes = {
        labels: ['Clubs', 'Events', 'Other'],
        datasets: [
          {
            label: 'Type',
            backgroundColor: ['#DD1B16', '#be4807', 'rgba(208,185,185,0.19)'],
            data: [this.clubsCount, this.eventsCount, this.otherCount]
          }
        ]
      }
    })

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
        this.datasets.backgroundColor.push('#' + Math.floor(Math.random()*16777215).toString(16))
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
