import { Component, Input } from '@angular/core';
import { Post } from '../../posts-cards.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-post-card',
  imports: [RouterLink],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css',
})
export class PostCardComponent {
  @Input({ required: true }) post!: Post;
  @Input({ required: false }) isListView: boolean = false;

  public formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ar-EG', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  }
}
