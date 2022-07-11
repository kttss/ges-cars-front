import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { SearchService } from '../../../services/search.service';

@Component({
  selector: 'ges-cars-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() title = '';
  @Input() icon = '';
  @Input() classes = '';
  search = new FormControl();

  constructor(private searchService: SearchService) {}

  ngOnInit() {
    this.search.valueChanges.pipe(debounceTime(300)).subscribe((res) => {
      this.searchService.onsearch.next(res);
    });
  }
}
