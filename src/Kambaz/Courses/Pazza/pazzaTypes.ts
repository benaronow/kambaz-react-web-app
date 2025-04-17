export type UserType = "instructor" | "student";

export interface User {
  _id: string;
  type: UserType;
  name: string;
  profilePic: string;
  viewedPosts: Post[];
}

export interface Authorable {
  text: string;
  author: User;
  date: Date;
}

export type PostType = "question" | "note";

export interface Post extends Authorable {
  _id: string;
  type: PostType;
  title: string;
  pinned: boolean;
  folder: FolderType;
  views: number;
  endorser?: User | undefined;
  studentAnswer?: Answer;
  instructorAnswer?: Answer;
  goodNotes: User[];
  followUps: FollowUp[];
}

export interface Answer extends Authorable {
  endorser?: User | undefined;
  thanks: User[];
}

export interface FollowUp extends Authorable {
  replies: Reply[];
  resolved: boolean;
  helpful: User[];
}

export interface Reply extends Authorable {
  helpful: User[];
}

export type PageType = "Q & A" | "Manage Classes" | "";

export type FolderType =
  | "hw1"
  | "hw2"
  | "hw3"
  | "hw4"
  | "hw5"
  | "hw6"
  | "project"
  | "exam"
  | "logistics"
  | "other"
  | "office_hours"
  | "";
