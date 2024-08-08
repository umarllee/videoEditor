import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  categoryId: string = 'All';
  searchQuery: string = '';

  videos: any[] = [];
  filteredVideos: any[] = [];
  selectedCategory: string = '';
  categories: any[] = [];  // Kateqoriyaların saxlanması üçün dəyişən

  @ViewChildren('videoElement') videoElements!: QueryList<ElementRef<HTMLVideoElement>>;

  constructor(
    private videoService: VideoService,
    private fb: FormBuilder,
  ) { }

  cardClicked(id: number) { 
    console.log('test')
    this.filteredVideos[id].state = !this.filteredVideos[id].state;
  }

  ngOnInit() {
    this.videoService.getAllVideos().subscribe(
      {
        next: data => {
          this.videos = data;
          this.filteredVideos = data;
          this.filteredVideos.forEach((item, key) => {
            this.filteredVideos[key].state = false;
          });
        },
        error: error => {
          console.error('Error fetching videos', error);
        }
      }
    );

    this.videoService.getAllCategories().subscribe(
      (data: any[]) => {
        this.categories = data;
      },
      (error: any) => {
        console.error('Error fetching categories', error);
      }
    );
  }

  ngAfterViewInit() {
    console.log('Video Elements:', this.videoElements.toArray());
  }

  onVideoClick(index: number): void {
    const videoArray = this.videoElements.toArray();
    console.log('Video Elements Array:', videoArray);

    if (index >= 0 && index < videoArray.length) {
      const currentVideo = videoArray[index].nativeElement;
      console.log('Current Video:', currentVideo);

      if (currentVideo instanceof HTMLVideoElement) {
        if (currentVideo.paused) {
          videoArray.forEach(video => {
            const videoElement = video.nativeElement;
            if (videoElement instanceof HTMLVideoElement && videoElement !== currentVideo) {
              videoElement.pause();
            }
          });
          currentVideo.play().catch(error => {
            console.error('Error playing video:', error);
          });
        } else {
          currentVideo.pause();
        }
      } else {
        console.error('The selected video element is not an HTMLVideoElement.');
      }
    } else {
      console.error('Invalid video index.');
    }
  }

  onSearch() {
    this.filteredVideos = this.videos.filter((dt:any) => String(dt.description).includes(this.searchQuery));
  }

  onCategoryChange() {
    this.categoryId == 'All' ? this.filteredVideos = this.videos :  this.filteredVideos = this.videos.filter((dt:any) => dt.categoryName == this.categoryId);
  }

  onMouseEnter(index: number) {
    console.log('Mouse entered on video index:', index);
    // Burada mouse enter hadisəsi ilə bağlı əlavə əməliyyatlar edə bilərsiniz
  }

  onMouseDown(index: number) {
    console.log('Mouse down on video index:', index);
    // Burada mousedown hadisəsi ilə bağlı əlavə əməliyyatlar edə bilərsiniz
  }
}
