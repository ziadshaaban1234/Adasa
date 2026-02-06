import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import BlogData from '../../../../public/assets/data/posts.json';
import { Data, Post, Category, Author } from '../posts-cards/posts-cards.component';
import { PostCardComponent } from '../posts-cards/components/post-card/post-card.component';
@Component({
  selector: 'app-home',
  imports: [RouterLink, PostCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private _data: Data = BlogData;
  private _posts: Post[] = this._data.posts;
  public featuredPosts?: Post[] = this._posts.filter((post) => post.featured).slice(0, 3);
  public categories: Category[] = this._data.categories;
  public recentPosts: Post[] = this._posts.slice(0, 3)
  public categoriesIcons: string[] = []; 

  public formatDate(dateString: string | undefined): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ar-EG', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  }
  public getCategoryIcon(categoryName: string) {
    switch (categoryName) {
      case 'إضاءة':
        return 'fa-sun';
        break;
      case 'بورتريه':
        return 'fa-user';
        break;
      case 'مناظر طبيعية':
        return 'fa-mountain-sun';
        break;
      case 'تقنيات':
        return 'fa-sliders';
        break;
      default:
        return 'fa-sun';
        break;
    }
  }
}
