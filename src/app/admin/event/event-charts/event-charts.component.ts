import {Component, OnInit} from '@angular/core';
import {EventService} from "../../../_services/event.service";

@Component({
  selector: 'app-event-charts',
  templateUrl: './event-charts.component.html',
  styleUrls: ['./event-charts.component.scss']
})
export class EventChartsComponent implements OnInit {


  constructor(private ES: EventService) {
  }

  years: number[] = [2020, 2021, 2022, 2023, 2024]
  eventCount!: number[][]
  eventStatusCount!: any[][]
  eventTypeCount!: any[][]
  bestYearlyEvents!: any[][]
  dataMonths: any
  dataStatus: any
  dataTypes: any
  dataBests: any
  datasets: any

  selectedYear!: number
  allCount = 0
  allConfirmed = 0
  allParticipations = 0

  yearlyCount = 0
  virtualCount = 0
  inpersonCount = 0
  startedCount = 0
  ongoingCount = 0
  cancelledCount = 0
  endedCount = 0

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

    this.ES.countAllEvents().subscribe(res => {
      //console.log(res)
      this.allCount = res;
    })
    this.ES.countAllEventsParticipations().subscribe(res => {
      //console.log(res)
      this.allParticipations = res;
    })
    this.ES.countAllConfirmedEvents().subscribe(res => {
      //console.log(res)
      this.allConfirmed = res;
    })
  }

  bestOfYear(year: number) {

    this.ES.bestEventsOfTheYear(year).subscribe(res => {
      //console.log(res)
      this.bestYearlyEvents = res;
      this.datasets = {
        backgroundColor: [],
        data: []
      }
      this.dataBests = {
        labels: [],
        datasets: [
          {
            label: 'Event',
            backgroundColor: [],
            data: []
          }
        ]
      }

      this.bestYearlyEvents.forEach(e => {
        this.datasets.data.push(e[1]);
        this.datasets.backgroundColor.push('#' + Math.floor(Math.random()*16777215).toString(16))
        this.dataBests.labels.push(e[2])
        // this.dataTargets.labels.datasets.data.push(e[1])
        // this.dataTargets.labels.datasets.backgroundColor.push('#DD1B16')
      })
      this.dataBests.datasets.fill(this.datasets)
      // this.dataTargets.datasets.push(this.datasets.data)

      console.log(this.dataBests)
    })

  }


  filterCountByYear(year: number) {

    this.yearlyCount = 0
    this.virtualCount = 0
    this.inpersonCount = 0
    this.startedCount = 0
    this.ongoingCount = 0
    this.cancelledCount = 0
    this.endedCount = 0

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


    this.bestOfYear(year);

    this.ES.countAllEventByMonth(year).subscribe(res => {
      //console.log(res);

      this.eventCount = res;
      this.eventCount.forEach(e => {
        //console.log('month: ' + e[0] + ' count: ' + e[1]);
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

    this.ES.countEventStatusByYear(year).subscribe(res => {
      this.eventStatusCount = res
      this.datasets = {
        backgroundColor: [],
        data: []
      }
      this.dataStatus = {
        labels: [],
        datasets: [
          {
            label: 'Status',
            backgroundColor: [],
            data: []
          }
        ]
      }

      this.eventStatusCount.forEach(e => {
        this.datasets.data.push(e[1]);
        this.datasets.backgroundColor.push('#' + Math.floor(Math.random() * 16777215).toString(16))
        this.dataStatus.labels.push(e[0])
        // this.dataTargets.labels.datasets.data.push(e[1])
        // this.dataTargets.labels.datasets.backgroundColor.push('#DD1B16')
      })
      this.dataStatus.datasets.fill(this.datasets)
      // this.dataTargets.datasets.push(this.datasets.data)

      console.log(this.dataStatus)
    });
    this.ES.countEventTypeByYear(year).subscribe(res => {
      this.eventTypeCount = res
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

      this.eventTypeCount.forEach(e => {
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


    //console.log('yearly count: ' + this.yearlyCount)


  }

}
