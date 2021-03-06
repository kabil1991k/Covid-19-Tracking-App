import { Component, OnInit } from '@angular/core';
import { DateWiseData } from 'src/app/models/date-wise-data';
import { GlobalDataSummary } from 'src/app/models/gloabl-data';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {
  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  selectedCountryData : DateWiseData[]; 
  dateWiseData ;
data : GlobalDataSummary[];
countries :string[] = [];
  constructor(private service: DataServiceService) { }

  ngOnInit(): void {
    this.service.getDateWiseData().subscribe((result)=>
    {
      this.dateWiseData=result;
console.log(result);
    })
    this.service.getGlobalData().subscribe(result=>{
this.data=result;
this.data.forEach(cs=>{
  this.countries.push(cs.country)
})
    })
  }
  updateValues(country : string)
  {
console.log(country);
this.data.forEach(cs=>{
  if(cs.country==country)
  {
    this.totalActive=cs.active;
    this.totalConfirmed=cs.confirmed;
    this.totalDeaths=cs.deaths;
    this.totalRecovered=cs.recovered;
  }
})
this.selectedCountryData = this.dateWiseData[country]
console.log(this.selectedCountryData);
  }
}
