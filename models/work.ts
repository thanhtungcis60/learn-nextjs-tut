export interface Work {
  id: string;
  title: string;
  tagList: string[];
  shortDescription: string;
  fullDescription: string;
  createdAt: string;
  updatedAt: string;
  thumbnailUrl: string;
}

export interface WorkFiltersPayload {
  search: string;
  taglist_search?: string;

  selectedTagList?: string[]; //temp value to store autocomplete, not send to API
}
