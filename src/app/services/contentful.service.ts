import { Injectable } from '@angular/core';
import { createClient, Entry } from 'contentful';

@Injectable({
  providedIn: 'root'
})
export class ContentfulService {

  private client = createClient({
    space: 'gzzt8vdpfvi4',
    accessToken: 'hSQ5lvTX_RkigOuRg88pVR-FHK60C2_T7uVrWZpqqGg'
  });

  constructor() { }

  // Fetch all destinations
  getDestinations() {
    return this.client.getEntries({
      content_type: 'destination'
    });
  }
  getDestinationById(id: string) {
  return this.client.getEntry(id);
}

}
