import { Component } from '@angular/core';
import { PageBreadcrumbComponent } from '../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { BasicTableThreeComponent } from '../../shared/components/tables/basic-tables/basic-table-three/basic-table-three.component';

@Component({
  selector: 'app-customer-credit',
  imports: [
    PageBreadcrumbComponent,
    BasicTableThreeComponent
  ],
  templateUrl: './customer-credit.component.html'
})
export class CustomerCreditComponent {

}
