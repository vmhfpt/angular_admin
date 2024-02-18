import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { UserModule } from './user/user.module';
//import { AreaModule } from './area/area.module';
import { TeamLeaderModule } from './team-leader/team-leader.module';
import { EmployeeModule } from './employee/employee.module';

import { AuthModule } from './auth/auth.module';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';

import { HttpClientModule } from '@angular/common/http';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';

import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';

import { OrderModule } from './order/order.module';

import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PageNotFoundComponent,
    HeaderComponent,
    FooterComponent,
  
  ],
  imports: [
    // CKEditorModule.forRoot({
    //   editor: ClassicEditor,
    // }),
    HttpClientModule,
    BrowserModule,
    TeamLeaderModule,
    EmployeeModule,
    UserModule,
    //AreaModule,
    OrderModule,
    CategoryModule,
    ProductModule,
    AuthModule,
    AppRoutingModule,
    CanvasJSAngularChartsModule

    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
