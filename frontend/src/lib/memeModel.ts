export interface MemeModel {
  id: string;
  title: string;
  createdAt: Date;
  captions: string[];
  tags: string[];
  commentCount: number;
  viewCount: number;
  likeCount: number;
  comments: any[];
  likes: any[];
  owner: {
    name: string;
    profilePicUrl: string;
  };
  url: string;
}

export function apiMemeToMemeModel(meme: any): MemeModel {
  return {
    ...meme,
    createdAt: new Date(meme.createdAt),
    user: meme.owner.name,
  } as MemeModel;
}
