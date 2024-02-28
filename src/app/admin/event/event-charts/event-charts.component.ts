import {Component, OnInit} from '@angular/core';
import {ReclamationService} from "../../../_services/reclamation.service";
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
  selectedYear!: number
  yearlyCount = 0
  virtualCount = 0
  inpersonCount = 0
  startedCount = 0
  ongoingCount = 0
  cancelledCount = 0
  endedCount = 0

  allCount = 0
  allConfirmed = 0
  allParticipations = 0

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
    this.ES.countAllEventByMonth().subscribe(res => {
      //console.log(res);
      this.eventCount = res;
    });

    this.ES.countEventStatusByYear().subscribe(res => {
      //console.log(res)
      this.eventStatusCount = res;
    })
    this.ES.countEventTypeByYear().subscribe(res => {
      //console.log(res)
      this.eventTypeCount = res;
    })

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
    this.bestYearlyEvents = []
    this.ES.bestEventsOfTheYear(year).subscribe(res => {
      if (res.length > 0) {
        this.bestYearlyEvents = res;
        console.log("best of year: " + res[0][1])
        console.log("this best of year: " + this.bestYearlyEvents)
        this.dataBests = {
          labels: [this.bestYearlyEvents[0][2], this.bestYearlyEvents[1][2], this.bestYearlyEvents[2][2], this.bestYearlyEvents[3][2], this.bestYearlyEvents[4][2]],
          datasets: [
            {
              label: 'Type',
              backgroundColor: ['#DD1B16', '#f57a3b', '#8ff53b', '#3b5af5', '#f57a3b'],
              data: [this.bestYearlyEvents[0][1], this.bestYearlyEvents[1][1], this.bestYearlyEvents[2][1], this.bestYearlyEvents[3][1], this.bestYearlyEvents[4][1]]
            }
          ]
        }
        this.bestYearlyEvents = []

        console.log("this best of year: " + this.bestYearlyEvents)

      }

    })

  }

  filterCountByYear(year: number) {

    this.yearlyCount = 0
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
    this.virtualCount = 0
    this.inpersonCount = 0
    this.cancelledCount = 0
    this.endedCount = 0
    this.startedCount = 0
    this.ongoingCount = 0
    this.bestYearlyEvents = [[], []]

    this.bestOfYear(year);

    this.eventCount.forEach(e => {
      if (e.includes(year)) {
        //console.log('year: ' + e[0] + ' month: ' + e[1] + ' count: ' + e[2]);
        this.yearlyCount += e[2]
        e[1] == 1 ? this.January = e[2] :
          e[1] == 2 ? this.February = e[2] :
            e[1] == 3 ? this.March = e[2] :
              e[1] == 4 ? this.April = e[2] :
                e[1] == 5 ? this.May = e[2] :
                  e[1] == 6 ? this.June = e[2] :
                    e[1] == 7 ? this.July = e[2] :
                      e[1] == 8 ? this.August = e[2] :
                        e[1] == 9 ? this.September = e[2] :
                          e[1] == 10 ? this.October = e[2] :
                            e[1] == 11 ? this.November = e[2] :
                              e[1] == 12 ? this.December = e[2] :
                                console.log('null: ' + e)

      }
      this.eventStatusCount.forEach(e => {
        if (e.includes(year)) {
          //console.log('year: ' + e[0] + ' status: ' + e[1] + ' count: ' + e[2]);
          e[1] === 'STARTED' ? this.startedCount = e[2] :
            e[1] == 'CANCELLED' ? this.cancelledCount = e[2] :
              e[1] == 'ONGOING' ? this.ongoingCount = e[2] :
                e[1] == 'ENDED' ? this.endedCount = e[2] :

                  console.log("")

        }
      })
      this.eventTypeCount.forEach(e => {
        if (e.includes(year)) {
          //console.log('year: ' + e[0] + ' type: ' + e[1] + ' count: ' + e[2]);
          e[1] === 'VIRTUAL' ? this.virtualCount = e[2] :
            e[1] == 'INPERSON' ? this.inpersonCount = e[2] :
              console.log("")

        }
      })

    })
    console.log('yearly count: ' + this.yearlyCount)
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
    this.dataStatus = {
      labels: ['STARTED', 'CANCELLED', 'ONGOING', 'ENDED'],
      datasets: [
        {
          label: 'Status',
          backgroundColor: ['#0fbbe1', '#d51807', '#0741d5', '#1bd507'],
          data: [this.startedCount, this.cancelledCount, this.ongoingCount, this.endedCount]
        }
      ]
    }
    this.dataTypes = {
      labels: ['Virtual', 'Inperson'],
      datasets: [
        {
          label: 'Type',
          backgroundColor: ['#DD1B16', '#f57a3b'],
          data: [this.virtualCount, this.inpersonCount]
        }
      ]
    }

  }

}
