import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ItemOverviewComponent } from "./components/item-overview/item-overview.component";
import { CommonModule } from "@angular/common";

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'item/:itemName', component: ItemOverviewComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
    CommonModule,
  ],
})
export class AppRoutingModule {}
