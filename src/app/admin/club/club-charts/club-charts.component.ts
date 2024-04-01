import {Component, OnInit} from '@angular/core';
import {ClubService} from "../../../_services/club.service";

@Component({
  selector: 'app-club-charts',
  templateUrl: './club-charts.component.html',
  styleUrls: ['./club-charts.component.scss']
})
export class ClubChartsComponent implements OnInit {

  constructor(private CS: ClubService) {
  }

  topClubEvents!: any[][]
  clubStatusCount!: any[][]
  clubTypeCount!: any[][]
  clubEventsCount!: number
  dataStatus: any
  dataTypes: any
  dataBests: any
  dataTops: any
  datasets: any
  clubs!: string[]
  selectedClub!: string
  allCount = 0
  allParticipations = 0
  ClubParticipations!: any[][]

  ngOnInit(): void {

    this.CS.FindAllClubNames().subscribe(res => {
      //console.log(res)
      this.clubs = res;
    })

    this.CS.countAllClubs().subscribe(res => {
      //console.log(res)
      this.allCount = res;
    })
    this.CS.countAllClubsParticipations().subscribe(res => {
      //console.log(res)
      this.allParticipations = res;
    })


    this.CS.countAllClubsByStatus().subscribe(res => {
      //console.log(res)
      this.clubStatusCount = res;
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

      this.clubStatusCount.forEach(e => {
        this.datasets.data.push(e[1]);
        this.datasets.backgroundColor.push('#' + Math.floor(Math.random() * 16777215).toString(16))
        this.dataStatus.labels.push(e[0])
        // this.dataTargets.labels.datasets.data.push(e[1])
        // this.dataTargets.labels.datasets.backgroundColor.push('#DD1B16')
      })
      this.dataStatus.datasets.fill(this.datasets)
      // this.dataTargets.datasets.push(this.datasets.data)

      console.log(this.dataStatus)
    })

    this.CS.countAllClubsByType().subscribe(res => {
      //console.log(res)
      this.clubTypeCount = res;
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

      this.clubTypeCount.forEach(e => {
        this.datasets.data.push(e[1]);
        this.datasets.backgroundColor.push('#' + Math.floor(Math.random() * 16777215).toString(16))
        this.dataTypes.labels.push(e[0])
        // this.dataTargets.labels.datasets.data.push(e[1])
        // this.dataTargets.labels.datasets.backgroundColor.push('#DD1B16')
      })
      this.dataTypes.datasets.fill(this.datasets)
      // this.dataTargets.datasets.push(this.datasets.data)

      console.log(this.dataTypes)
    })

    this.CS.topClubParticipations().subscribe(res => {
      //console.log(res)
      this.ClubParticipations = res;
      this.datasets = {
        backgroundColor: [],
        data: []
      }
      this.dataBests = {
        labels: [],
        datasets: [
          {
            label: 'Club',
            backgroundColor: [],
            data: []
          }
        ]
      }

      this.ClubParticipations.forEach(e => {
        this.datasets.data.push(e[0]);
        this.datasets.backgroundColor.push('#' + Math.floor(Math.random() * 16777215).toString(16))
        this.dataBests.labels.push(e[1])
        // this.dataTargets.labels.datasets.data.push(e[1])
        // this.dataTargets.labels.datasets.backgroundColor.push('#DD1B16')
      })
      this.dataBests.datasets.fill(this.datasets)
      // this.dataTargets.datasets.push(this.datasets.data)

      console.log(this.dataBests)
    })
  }


  bestClubEvent(ClubName: string) {

    console.log(ClubName)
    this.CS.GetClubId(ClubName).subscribe(cid => {
      console.log(cid)
      this.CS.bestClubEvents(cid).subscribe(res => {
        this.topClubEvents = res
        this.datasets = {
          backgroundColor: [],
          data: []
        }
        this.dataTops = {
          labels: [],
          datasets: [
            {
              label: 'Event',
              backgroundColor: [],
              data: []
            }
          ]
        }

        this.topClubEvents.forEach(e => {
          this.datasets.data.push(e[0]);
          this.datasets.backgroundColor.push('#' + Math.floor(Math.random() * 16777215).toString(16))
          this.dataTops.labels.push(e[1])
          // this.dataTargets.labels.datasets.data.push(e[1])
          // this.dataTargets.labels.datasets.backgroundColor.push('#DD1B16')
        })
        this.dataTops.datasets.fill(this.datasets)
        // this.dataTargets.datasets.push(this.datasets.data)

        console.log(this.dataTops)
      });
    })


  }

}
