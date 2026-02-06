import { Component } from '@angular/core';
import BlogData from '../../../../public/assets/data/posts.json';
import { Category } from '../posts-cards/posts-cards.component'
import { RouterLink } from "@angular/router";
@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  public categories: Category[] = BlogData.categories
}
