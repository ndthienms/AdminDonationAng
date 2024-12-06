// import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-map',
//   standalone: true,
//   templateUrl: './map.component.html',
//   styleUrls: ['./map.component.css'],
// })
// export class MapComponent implements AfterViewInit {
//   @ViewChild('mapContainer', { static: false }) mapElement!: ElementRef;

//   map: google.maps.Map | null = null;
//   heatmap: google.maps.visualization.HeatmapLayer | null = null;

//   // Dữ liệu heatmap từ server
//   heatmapData: google.maps.LatLngLiteral[] = [];

//   // Tọa độ trung tâm và zoom
//   center: google.maps.LatLngLiteral = { lat: 10.8380623, lng: 106.646811 };
//   zoom = 10;

//   // URL API
//   private apiUrl = 'https://localhost:44388/Get-locations/';

//   // Mặc định độ màu
//   heatmapOpacity = 0.6;

//   constructor(private http: HttpClient) {}

//   ngAfterViewInit() {
//     this.loadLocations();
//   }

//   // Gọi API để lấy dữ liệu heatmap
//   loadLocations() {
//     this.http.get<any[]>(this.apiUrl).subscribe(
//       (locations) => {
//         // Chỉ lấy dữ liệu Latitude và Longitude
//         this.heatmapData = locations.map((loc) => ({
//           lat: loc.Latitude,
//           lng: loc.Longitude,
//         }));
//         this.loadHeatMap(); // Khởi tạo bản đồ sau khi dữ liệu sẵn sàng
//       },
//       (error) => {
//         console.error('Error loading locations:', error);
//       }
//     );
//   }

//   // Khởi tạo bản đồ và heatmap
//   loadHeatMap() {
//     // Tạo bản đồ
//     this.map = new google.maps.Map(this.mapElement.nativeElement, {
//       center: this.center,
//       zoom: this.zoom,
//     });
  
//     // Định nghĩa Gradient với màu đỏ nổi bật hơn
//     // const gradient = [
//     //   'rgba(0, 255, 255, 0)', // Màu nhạt nhất (trong suốt)
//     //   'rgba(0, 255, 255, 1)',
//     //   'rgba(0, 191, 255, 1)',
//     //   'rgba(0, 127, 255, 1)',
//     //   'rgba(0, 63, 255, 1)',
//     //   'rgba(0, 0, 255, 1)',
//     //   'rgba(255, 0, 0, 1)', // Tăng cường màu đỏ
//     //   'rgba(255, 63, 0, 1)',
//     //   'rgba(255, 127, 0, 1)',
//     //   'rgba(255, 191, 0, 1)',
//     //   'rgba(255, 255, 0, 1)',
//     //   'rgba(255, 255, 255, 1)', // Màu sáng nhất
//     // ];
//     const gradient = [
//       'rgba(255, 0, 0, 0)',     // Trong suốt
//       'rgba(255, 50, 50, 0.8)', // Đỏ nhạt
//       'rgba(255, 0, 0, 1)',     // Đỏ đậm tiêu chuẩn
//       'rgba(200, 0, 0, 1)',     // Đỏ sẫm hơn
//       'rgba(150, 0, 0, 1)',     // Đỏ rất sẫm
//       'rgba(100, 0, 0, 1)',     // Đỏ đậm tối
//       'rgba(50, 0, 0, 1)',      // Đỏ gần như tối hoàn toàn
//     ];
    
    
//     // Tạo heatmap
//     this.heatmap = new google.maps.visualization.HeatmapLayer({
//       data: this.heatmapData.map((point) => new google.maps.LatLng(point.lat, point.lng)),
//       opacity: this.heatmapOpacity, // Cài đặt độ trong suốt ban đầu
//       gradient: gradient, // Sử dụng gradient tùy chỉnh
//     });
  
//     // Gắn heatmap vào bản đồ
//     this.heatmap.setMap(this.map);
  
//     // Lắng nghe sự kiện click
//     this.map.addListener('click', (event: google.maps.MapMouseEvent) => {
//       if (event.latLng) {
//         this.center = event.latLng.toJSON();
//         this.map!.setCenter(this.center);
//       }
//     });
//   }
  
//   // Điều chỉnh độ màu của heatmap
//   adjustHeatmapOpacity(event: Event) {
//     const input = event.target as HTMLInputElement;
//     this.heatmapOpacity = parseFloat(input.value);

//     if (this.heatmap) {
//       this.heatmap.setOptions({ opacity: this.heatmapOpacity });
//     }
//   }
// }
import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  imports: [FormsModule],
})
export class MapComponent implements AfterViewInit {
  @ViewChild('mapContainer', { static: false }) mapElement!: ElementRef;

  map: google.maps.Map | null = null;
  heatmap: google.maps.visualization.HeatmapLayer | null = null;

  heatmapData: google.maps.LatLngLiteral[] = [];
  center: google.maps.LatLngLiteral = { lat: 10.8380623, lng: 106.646811 };
  zoom = 10;
  heatmapOpacity = 0.6;

  // API URL
  private apiUrl = 'https://localhost:44388/Get-locations/';

  // Ngày bắt đầu và kết thúc
  startDate: string = '';
  endDate: string = '';

  isDateRangeValid: boolean = false; // Trạng thái hợp lệ của khoảng ngày

  constructor(private http: HttpClient) {}

  ngAfterViewInit() {
    this.initializeMap();
  }
  // Khởi tạo bản đồ
  initializeMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      center: this.center,
      zoom: this.zoom,
    });
  }

   // Kiểm tra tính hợp lệ của khoảng ngày
   validateDateRange() {
    if (this.startDate && this.endDate) {
      this.isDateRangeValid = new Date(this.startDate) <= new Date(this.endDate);
    } else {
      this.isDateRangeValid = false;
    }
  }
  // Gọi API để lấy dữ liệu theo khoảng ngày
  loadLocationsByDateRange() {
    if (!this.isDateRangeValid) return;
  
    // Convert startDate and endDate to ISO string (YYYY-MM-DDT00:00:00)
    const startDateISO = new Date(this.startDate).toISOString();
    const endDateISO = new Date(this.endDate).toISOString();
  
    const apiUrlWithDates = `${this.apiUrl}?startDate=${startDateISO}&endDate=${endDateISO}`;
    console.log('Requesting data from API:', apiUrlWithDates);
  
    this.http.get<any[]>(apiUrlWithDates).subscribe(
      (locations) => {
        console.log('API response:', locations);
  
        // Làm mới dữ liệu heatmap
        this.heatmapData = locations.map((loc) => ({
          lat: loc.Latitude,
          lng: loc.Longitude,
        }));
  
        console.log('Heatmap data after update:', this.heatmapData);
  
        // Reset và cập nhật heatmap
        this.resetHeatmap();
        this.updateHeatmap();
      },
      (error) => {
        console.error('Error loading locations:', error);
      }
    );
  }
  
  //Reset
  resetHeatmap() {
    if (this.heatmap) {
      this.heatmap.setMap(null); // Xóa heatmap cũ khỏi bản đồ
      this.heatmap = null; // Đặt về null để khởi tạo lại
    }
  }
  
  
   // Cập nhật heatmap
   updateHeatmap() {
    if (!this.map) return;
  
    // Nếu heatmap đã tồn tại, loại bỏ trước khi tạo mới
    if (this.heatmap) {
      this.heatmap.setMap(null); // Xóa heatmap cũ
    }
  
    // Tạo heatmap mới với dữ liệu cập nhật
    this.heatmap = new google.maps.visualization.HeatmapLayer({
      data: this.heatmapData.map((point) => new google.maps.LatLng(point.lat, point.lng)),
      opacity: this.heatmapOpacity,
    });
  
    // Gắn heatmap mới vào bản đồ
    this.heatmap.setMap(this.map);
  }
  
 // Điều chỉnh độ trong suốt của heatmap
 adjustHeatmapOpacity(event: Event) {
  const input = event.target as HTMLInputElement;
  this.heatmapOpacity = parseFloat(input.value);
  if (this.heatmap) {
    this.heatmap.setOptions({ opacity: this.heatmapOpacity });
  }
}

}
