export type UserRole = "STUDENT" | "FACULTY" | "ADMIN" | "USER" | "TA";

export interface User {
  _id: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  dob: Date;
  role: UserRole;
  loginId: string;
  section: string;
  lastActivity: Date;
  totalActivity: string;
  profilePic?: string;
}

export interface Authorable {
  text: string;
  author: User;
  date: Date;
}

export type PostType = "QUESTION" | "NOTE";

export interface Post extends Authorable {
  _id?: string;
  pType: PostType;
  for: string[];
  title: string;
  pinned: boolean;
  folders: Folder[];
  views: string[];
  endorser?: User;
  studentAnswer?: Answer;
  instructorAnswer?: Answer;
  goodNotes: string[];
  followUps: FollowUp[];
  course: string;
}

export interface Answer extends Authorable {
  endorser?: User;
  thanks: string[];
}

export interface FollowUp extends Authorable {
  replies: Reply[];
  resolved: boolean;
  helpful: string[];
}

export interface Reply extends Authorable {
  helpful: string[];
}

export type PageType = "Q_A" | "MANAGE_CLASSES";

export type Folder = {
  _id: string;
  name: string;
  number: number;
};
