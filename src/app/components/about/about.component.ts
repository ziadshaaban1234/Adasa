import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import BlogData from '../../../../public/assets/data/posts.json';
import { Author, Data, Post } from '../posts-cards/posts-cards.component';

@Component({
  selector: 'app-about',
  imports: [RouterLink],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {
  private _data: Data = BlogData;
  private _posts: Post[] = this._data.posts;
  public authors: Author[] = [];
  constructor() {
    this._posts.forEach((post) => {
      if (!this.authors.includes(post.author)) this.authors.push(post.author);
    });
  }
}
