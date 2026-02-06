import { Component, ElementRef, inject, viewChild, OnInit } from '@angular/core';
import { PostCardComponent } from './components/post-card/post-card.component';
import BlogData from '../../../../public/assets/data/posts.json';
import { ActivatedRoute } from '@angular/router';

export interface Data {
  posts: Post[];
  categories: Category[];
  siteInfo: SiteInfo;
}

export interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: Author;
  image: string;
  date: string;
  readTime: string;
  featured: boolean;
  tags: string[];
}

export interface Author {
  name: string;
  avatar: string;
  role: string;
}

export interface Category {
  name: string;
  count: number;
  color: string;
}

export interface SiteInfo {
  name: string;
  tagline: string;
  description: string;
  email: string;
  social: Social;
}

export interface Social {
  twitter: string;
  github: string;
  linkedin: string;
  youtube: string;
}

@Component({
  selector: 'app-posts-cards',
  imports: [PostCardComponent],
  templateUrl: './posts-cards.component.html',
  styleUrl: './posts-cards.component.css',
})
export class PostsCardsComponent implements OnInit {
  private _route = inject(ActivatedRoute);
  private _filterInput = viewChild<ElementRef<HTMLInputElement>>('filterSelector');
  private _data: Data = BlogData;
  private _categories: Category[] = this._data.categories;
  private _posts: Post[] = this._data.posts;
  private _currentCategory: Category | null = null;
  private _filter: string | null = null;
  private _currentPageNumber: number = 1;
  private readonly _postsPerPage: number = 6;
  public isListView: boolean = false;
  constructor() { }
  ngOnInit(): void {
    this._route.queryParamMap.subscribe((params) => {

      const categoryName = params.get('category');

      if (categoryName) {

        const foundCategory = this._categories.find(
          (cat) => cat.name === categoryName
        );

        this._currentCategory = foundCategory ?? null;

      } else {
        this._currentCategory = null;
      }

      this.openPageNumber(1);

    });
  }


  public getAllPosts(): Post[] {
    const search = this._filter?.toLowerCase();
    return this._posts.filter((post) => {
      const matchesCategory =
        !this._currentCategory || post.category === this._currentCategory.name;
      const matchesSearch =
        !search ||
        post.title?.toLowerCase().includes(search) ||
        post.excerpt?.toLowerCase().includes(search);

      return matchesCategory && matchesSearch;
    });
  }
  public getPosts(): Post[] {
    return this.getAllPosts().slice(
      (this._currentPageNumber - 1) * this._postsPerPage,
      this._currentPageNumber * this._postsPerPage,
    );
  }
  public getCategories() {
    return this._categories;
  }
  public getCurrentCategory(): Category | null {
    return this._currentCategory;
  }
  public setCurrentCategory(category: Category | null) {
    this._currentCategory = category;
  }
  public getFilter(): string | null {
    return this._filter;
  }
  public setFilter(filter: string | null): void {
    this._filter = filter?.trim() || null;
    this.openPageNumber(1);
  }
  public getCurrentPageNumber(): number {
    return this._currentPageNumber;
  }
  public getMaxPageNumber() {
    return Math.ceil(this.getAllPosts().length / this._postsPerPage);
  }
  public getPageNumbers(): number[] {
    return Array.from({ length: this.getMaxPageNumber() }, (_, i) => i + 1);
  }
  public openPageNumber(pageNumber: number): void {
    const maxPageNumber: number = this.getMaxPageNumber();
    if (pageNumber >= maxPageNumber) this._currentPageNumber = maxPageNumber;
    else if (pageNumber <= 1) this._currentPageNumber = 1;
    else this._currentPageNumber = pageNumber;
  }
  public resetPosts(): void {
    this.setCurrentCategory(null);
    this.setFilter(null);
    if (this._filterInput()) {
      this._filterInput()!.nativeElement.value = '';
    }
    this.openPageNumber(1);
  }
}
