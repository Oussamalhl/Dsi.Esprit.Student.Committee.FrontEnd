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
  dataMonths: any
  dataStatus: any
  dataTypes: any
  selectedYear!: number
  yearlyCount = 0
  yearlyProcessed = 0
  clubsCount = 0
  eventsCount = 0
  otherCount = 0

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
    this.RS.countAllReclamationByMonth().subscribe(res => {
      console.log(res);
      this.reclamationCount = res;
    });

    this.RS.countReclamationStatusByYear().subscribe(res => {
      //console.log(res)
      this.reclamationStatusCount = res;
    })
    this.RS.countReclamationTypeByYear().subscribe(res => {
      //console.log(res)
      this.reclamationsTypeCount = res;
    })

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
    this.eventsCount = 0
    this.clubsCount = 0
    this.otherCount = 0

    this.reclamationCount.forEach(e => {
      if (e.includes(year)) {
        console.log('year: ' + e[0] + ' month: ' + e[1] + ' count: ' + e[2]);
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
      this.reclamationStatusCount.forEach(e => {
        if (e.includes(year)) {
          this.yearlyProcessed = e[1];
        }
      })
      this.reclamationsTypeCount.forEach(e => {
        if (e.includes(year)) {
          console.log('year: ' + e[0] + ' type: ' + e[1] + ' count: ' + e[2]);
          e[1] === 'EVENT' ? this.eventsCount = e[2] :
            e[1] == 'CLUB' ? this.clubsCount = e[2] :
              e[1] == 'OTHER' ? this.otherCount = e[2] :
                console.log(this.otherCount)

        }
      })

    })
    console.log('yearly count: ' + this.yearlyCount)
    console.log('yearly processed: ' + this.yearlyProcessed)
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
      labels: ['Open', 'Closed'],
      datasets: [
        {
          label: 'Status',
          backgroundColor: ['#DD1B16', '#1bd507'],
          data: [this.yearlyCount - this.yearlyProcessed, this.yearlyProcessed]
        }
      ]
    }
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
  }

}
