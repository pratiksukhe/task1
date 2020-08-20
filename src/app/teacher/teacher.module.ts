import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing.module';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { AddEditComponent } from './add-edit/add-edit.component';
import { ListComponent } from './list/list.component';
import { LayoutComponent } from './layout/layout.component';
import { MaterialModule } from '../material/material.module';
@NgModule({
  declarations: [
    TeacherDashboardComponent,
    AddEditComponent,
    ListComponent,
    LayoutComponent,
  ],
  imports: [CommonModule, MaterialModule, TeacherRoutingModule],
})
export class TeacherModule {}
