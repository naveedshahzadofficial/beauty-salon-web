import { mergeMap, take } from 'rxjs/operators';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ClientService } from '@services/client.service';
import { IService } from '@interfaces/service.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '@services/shared.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent implements OnInit, OnDestroy {
  services: IService[] = [];
  checkoutClicked!: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private clientService: ClientService,
    private sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      mergeMap((resp: any) => this.clientService
        .getCategoryServices(resp.slug)),
    ).subscribe((resp) => (this.services = resp));

    this.checkoutClicked = this.sharedService.getCheckoutClicked().subscribe((resp: boolean) => {
      if (resp) {
        this.router.navigate(['client/categories/checkout']);
      }
    })
  }

  ngOnDestroy(): void {
    this.sharedService.checkoutClicked.next(false);
    this.checkoutClicked.unsubscribe();
  }
}
