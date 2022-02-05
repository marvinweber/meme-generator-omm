export interface MemeModel {
  _id: string;
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
    id: meme._id,
    createdAt: new Date(meme.createdAt),
    user: meme.owner.name,
  } as MemeModel;
}
