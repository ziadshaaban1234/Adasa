import { Component } from '@angular/core';
import { PostsCardsComponent } from "../posts-cards/posts-cards.component";

@Component({
  selector: 'app-blog',
  imports: [PostsCardsComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css',
})
export class BlogComponent {

}
