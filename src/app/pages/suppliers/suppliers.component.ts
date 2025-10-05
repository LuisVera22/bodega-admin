import { Component } from '@angular/core';
import { PageBreadcrumbComponent } from '../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { BasicTableTwoComponent } from '../../shared/components/tables/basic-tables/basic-table-two/basic-table-two.component';

@Component({
  selector: 'app-suppliers',
  imports: [
    PageBreadcrumbComponent,
    BasicTableTwoComponent,
  ],
  templateUrl: './suppliers.component.html'
})
export class SuppliersComponent {

}
