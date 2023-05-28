import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BannerComponent } from './banner/banner.component';
import { HorizontalScrollComponent } from './horizontal-scroll/horizontal-scroll.component';

const routes: Routes = [
  { path: 'banner', component: BannerComponent },
  { path: 'hscroll', component: HorizontalScrollComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
