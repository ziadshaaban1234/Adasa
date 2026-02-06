import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import BlogData from '../../../../public/assets/data/posts.json';
import {
  Data,
  Post,
  Author,
  Category,
  SiteInfo,
  Social,
} from '../posts-cards/posts-cards.component';

@Component({
  selector: 'app-post.component',
  imports: [RouterLink],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css',
})
export class PostComponent implements OnInit {
  private _router = inject(Router);
  private _route = inject(ActivatedRoute);
  private _posts: Post[] = (BlogData as Data).posts;
  public post?: Post;
  public postData?: { title: string; content: string }[];
  public recommendedPosts?: Post[];

  constructor() { }

  ngOnInit(): void {
    this._route.paramMap.subscribe((params) => {
      const slug = params.get('slug');
      this.init(slug ?? undefined);
    });
  }

  private init(s?: string) {
    const slug = s ?? this._route.snapshot.paramMap.get('slug');
    const found = this._posts.find((p) => p.slug === slug);

    if (found) {
      this.post = found;
      this.postData = this.parseContent(this.post.content);
      this.setRecommendedPosts();
    } else {
      this._router.navigateByUrl('/not-found', { replaceUrl: true });
    }
  }

  public formatDate(dateString: string | undefined): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ar-EG', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  }

  private parseContent(rawData: string): { title: string; content: string }[] {
    const sections = rawData.split(/##\s+/);
    const intro = sections.shift()?.trim();

    const formattedSections = sections.map((section) => {
      const lines = section.split('\n');
      const title = lines[0].trim();
      const content = lines.slice(1).join('\n').trim();
      return { title, content };
    });

    if (intro) {
      formattedSections.unshift({ title: 'المقدمة', content: intro });
    }

    return formattedSections;
  }

  private setRecommendedPosts() {
    this.recommendedPosts = this._posts
      .filter((post) => {
        return (
          post.category === this.post?.category && post.id !== this.post?.id
        );
      })
      .slice(0, 3);
  }

  public openRecommededPost(s: string) {
    this._router.navigate(['/blog', s]);
  }
}
