export type UserType = "instructor" | "student";

export interface User {
  type: UserType;
  username: string;
  profilePic: string;
}

export interface Authorable {
  text: string;
  author: User;
  date: Date;
}

export type PostType = "question" | "note";

export interface Post extends Authorable {
  type: PostType;
  title: string;
  pinned: boolean;
  folder: string;
  views: number;
  instructorEndorsed: boolean;
  studentAnswer?: Answer;
  instructorAnswer?: Answer;
  followUps: FollowUp[];
}

export interface Answer extends Authorable {
  instructorEndorsed: boolean;
  thanks: number;
}

export interface FollowUp extends Authorable {
  helpful: number;
}
