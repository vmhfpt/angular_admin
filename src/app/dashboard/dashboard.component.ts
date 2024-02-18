import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product/product.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit{
  public success : number = 0;
  public process : number = 0;
  public cancel : number = 0;
  public chartOptionsPie : any = {};
  public chartOptionsColumn : any = {};
  public chartOptionsArea : any = {};
  public revenue : number = 0;
   constructor(private productService : ProductService){}
    public check(status : any, dataArray : any){
        for (var i = 0; i < dataArray.length; i ++){
          if(dataArray[i].status == status){
            return dataArray[i].count;
          }
        }
        return 0;
    }
    public showPieChart(result : any){
      this.chartOptionsPie = {
        animationEnabled: true,
        title: {
        text: "Statistic orders by status"
        },
        data: [{
        type: "pie",
        startAngle: -90,
        indexLabel: "{name}: {y}",
        yValueFormatString: "#,###.##' order(s)'",
        dataPoints: [
          { y: result[0], name: "Chưa tiếp nhận" },
          { y: result[1], name: "Đã tiếp nhận" },
          { y: result[2], name: "Đã rời kho" },
          { y: result[3], name: "Đang vận chuyển" },
          { y: result[4], name: "Đã đến nơi" },
          { y: result[5], name: "Hoàn thành" },
          { y: result[6], name: "Đã hủy" }
        ]
        }]
      }
    }
    public showColumnChart(result : any){
      this.chartOptionsColumn = {
        title:{
          text: "Statistic Number of products ordered"
        },
        animationEnabled: true,
        axisY: {
          includeZero: true,
          suffix: ""
        },
        data: [{
          type: "bar",
          indexLabel: "{y}",
          yValueFormatString: "#,###' Product(s)'",
          dataPoints: result
        }]
      }	
    }
    public showAreaChart(result : any){
      this.chartOptionsArea = {
        animationEnabled: true,
        theme: "light2",
        title:{
          text: "Statistic orders by days"
        },
        subtitles: [{
          text: "Vietnamese"
        }],
        axisY: {
          title: "Total by order",
          includeZero: true,
        },
        data: [{
          type: "stepArea",
          color: "#64B5F6",
          lineColor: "#0D47A1",
          markerColor: "#0D47A1",
          markerSize: 5,
          dataPoints: result
        }]
      }
    }
    public formatVNDCurrency(price : Number){
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price as any);
    }
   ngOnInit(): void {
      this.productService.getOrderSuccess().subscribe((dataOrder : any) => {

        //console.log(dataOrder)
        
        for(let item of dataOrder){
         
          this.productService.getRevenue(item._id).subscribe((data : any) => {
            this.revenue = this.revenue + Number(data[0].count);
          })
        }
        
      })
      this.productService.getStatisticProductInOrder().subscribe((data: any) => {
         

          const statisticProductName = data.map((item : any, key : any) => {
            return {label : item.product_id.name, y : item.count};
        })
           this.showColumnChart(statisticProductName);
       
      })
      this.productService.getStatisticOrderDay().subscribe((nextData : any) => {
        const statisticOrderByDay = nextData.map((item : any, key : any) => {
          return {
             label : `${item.date.day}/${item.date.month}/${item.date.year}`,
             y : item.count,
           
          }
        });
        this.showAreaChart(statisticOrderByDay);
      
      })

      this.productService.getStatisticOrderStatus().subscribe((thirdData : any) => {
        thirdData.map((item : any, key : any) => {
          if(item.status == 1){
              this.success = this.success + item.count;
          }
          if(item.status == 0){
              this.cancel = this.cancel + item.count;
          }
          if(item.status == 6 || item.status == 5 || item.status == 4 || item.status == 3 || item.status == 2){
              this.process = this.process + item.count;
          }
      })
          let statisticOrderStatus = [];
          for(var i = 6; i >= 0; i--){
            statisticOrderStatus.push(this.check(i, thirdData));
          }
          
          this.showPieChart(statisticOrderStatus);
      })
   }


}
