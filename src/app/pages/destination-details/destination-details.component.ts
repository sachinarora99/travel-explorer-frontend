import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContentfulService } from 'src/app/services/contentful.service';
// import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

@Component({
  selector: 'app-destination-details',
  templateUrl: './destination-details.component.html',
  styleUrls: ['./destination-details.component.css']
})
export class DestinationDetailsComponent implements OnInit {
  destination: any = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private contentfulService: ContentfulService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.fetchDestination(id);
  }

  fetchDestination(id: string) {
    this.contentfulService.getDestinationById(id)
      .then((res: any) => {
        const fields = res.fields;
        this.destination = {
          name: fields.name,
          location: fields.location,
          image: fields.image?.fields?.file?.url,
          // descriptionHTML: fields.description
          //   ? documentToHtmlString(fields.description)
          //   : ''
        };
        this.loading = false;
      })
      .catch((err: any) => {
        console.error('Error fetching destination:', err);
        this.loading = false;
      });
  }
}
