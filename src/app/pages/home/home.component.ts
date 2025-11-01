import { Component, OnInit } from '@angular/core';
import { ContentfulService } from 'src/app/services/contentful.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  destinations: any[] = [];
  filteredDestinations: any[] = [];
  searchText: string = '';

  constructor(private contentfulService: ContentfulService) {}

  ngOnInit(): void {
    this.fetchDestinations();
  }

  fetchDestinations() {
    this.contentfulService.getDestinations()
      .then((res: any) => {
        this.destinations = res.items.map((item: any) => {
          const fields = item.fields;
          return {
            id: item.sys.id,
            name: fields.name,
            location: fields.location,
            image: fields.image?.fields?.file?.url
          };
        });

        // Set filtered list initially
        this.filteredDestinations = [...this.destinations];
      })
      .catch((err: any) => console.error('Error fetching data:', err));
  }

  filterDestinations() {
    const search = this.searchText.toLowerCase();
    this.filteredDestinations = this.destinations.filter(d =>
      d.name.toLowerCase().includes(search) ||
      d.location.toLowerCase().includes(search)
    );
  }
}
