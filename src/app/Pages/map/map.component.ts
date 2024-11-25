
import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-map',
  standalone:true,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements AfterViewInit {
  @ViewChild('mapContainer', { static: false }) mapElement!: ElementRef;

  map: google.maps.Map | null = null;
  heatmap: google.maps.visualization.HeatmapLayer | null = null;

  // Dữ liệu heatmap
  heatmapData: google.maps.LatLngLiteral[] = [
    { lat: 10.8380623, lng: 106.646811 },
    { lat: 10.8380623, lng: 106.647811 },
    { lat: 10.8390623, lng: 106.646811 },
    { lat: 10.8400623, lng: 106.646811 },
    { lat: 10.8385623, lng: 106.648811 },
    { lat: 10.8370623, lng: 106.649811 },
    { lat: 10.8380623, lng: 106.650811 },
  ];

  // Tọa độ trung tâm và zoom
  center: google.maps.LatLngLiteral = { lat: 10.8380623, lng: 106.646811 };
  zoom = 10;

  // // Tọa độ chuột hiển thị
  // display: any;

  ngAfterViewInit() {
    this.loadHeatMap();
    this.toggleHeatmap();
  }

  // Khởi tạo bản đồ và heatmap
  loadHeatMap() {
    // Tạo bản đồ
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      center: this.center,
      zoom: this.zoom,
    });

    // Tạo heatmap
    this.heatmap = new google.maps.visualization.HeatmapLayer({
      data: this.heatmapData.map((point) => new google.maps.LatLng(point.lat, point.lng)),
    });

    // Gắn heatmap vào bản đồ
    this.heatmap.setMap(this.map);

       // Lắng nghe sự kiện click
    this.map.addListener('click', (event: google.maps.MapMouseEvent) => {
      if (event.latLng) {
        this.center = event.latLng.toJSON();
        this.map!.setCenter(this.center);
      }
    });
  }

  // Toggle Heatmap
  toggleHeatmap() {
    if (this.heatmap) {
      const currentMap = this.heatmap.getMap();
      this.heatmap.setMap(currentMap ? null : this.map);
    }
  }
}
