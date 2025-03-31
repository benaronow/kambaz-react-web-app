import { genDate } from "./dateUtils";
import { Answer, FollowUp, Post, Reply, User } from "./pazzaTypes";

export const instructor1: User = {
  _id: "123",
  type: "instructor",
  name: "Instructor 1",
  profilePic: "/profiles/redpanda.png",
  viewedPosts: [],
};

export const instructor2: User = {
  _id: "234",
  type: "instructor",
  name: "Instructor 2",
  profilePic: "/profiles/chimp.png",
  viewedPosts: [],
};

export const instructor3: User = {
  _id: "345",
  type: "instructor",
  name: "Instructor 3",
  profilePic: "/profiles/crocodile.png",
  viewedPosts: [],
};

export const student1: User = {
  _id: "456",
  type: "student",
  name: "Student 1",
  profilePic: "/profiles/elephant.png",
  viewedPosts: [],
};

export const student2: User = {
  _id: "567",
  type: "student",
  name: "Student 2",
  profilePic: "/profiles/goat.png",
  viewedPosts: [],
};

export const student3: User = {
  _id: "678",
  type: "student",
  name: "Student 3",
  profilePic: "/profiles/koala.png",
  viewedPosts: [],
};

export const student4: User = {
  _id: "789",
  type: "student",
  name: "Student 4",
  profilePic: "/profiles/panda.png",
  viewedPosts: [],
};

export const student5: User = {
  _id: "890",
  type: "student",
  name: "Student 5",
  profilePic: "/profiles/pig.png",
  viewedPosts: [],
};

export const student6: User = {
  _id: "901",
  type: "student",
  name: "Student 6",
  profilePic: "/profiles/tiger.png",
  viewedPosts: [],
};

export const student7: User = {
  _id: "012",
  type: "student",
  name: "Student 7",
  profilePic: "/profiles/toucan.png",
  viewedPosts: [],
};

export const instructors = [instructor1, instructor2, instructor3];
export const students = [
  student2,
  student2,
  student3,
  student4,
  student5,
  student6,
  student7,
];
export const users = [...instructors, ...students];

export const studentAnswer1: Answer = {
  text: "This is the first student answer.",
  author: student1,
  date: genDate(19),
  endorser: instructor1,
  thanks: users.slice(0, 8),
};

export const studentAnswer2: Answer = {
  text: "This is the second student answer.",
  author: student3,
  date: genDate(16),
  endorser: undefined,
  thanks: users.slice(0, 7),
};

export const studentAnswer3: Answer = {
  text: "This is the third student answer.",
  author: student5,
  date: genDate(10),
  endorser: instructor2,
  thanks: users.slice(0, 6),
};

export const studentAnswer4: Answer = {
  text: "This is the fourth student answer.",
  author: student7,
  date: genDate(7),
  endorser: undefined,
  thanks: users.slice(0, 5),
};

export const instructorAnswer1: Answer = {
  text: "This is the first instructor answer.",
  author: instructor1,
  date: genDate(18),
  endorser: undefined,
  thanks: users.slice(0, 4),
};

export const instructorAnswer2: Answer = {
  text: "This is the second instructor answer.",
  author: instructor2,
  date: genDate(13),
  endorser: instructor3,
  thanks: users.slice(0, 3),
};

export const instructorAnswer3: Answer = {
  text: "This is the third instructor answer.",
  author: instructor3,
  date: genDate(9),
  endorser: undefined,
  thanks: users.slice(0, 2),
};

export const instructorAnswer4: Answer = {
  text: "This is the fourth instructor answer.",
  author: instructor1,
  date: genDate(4),
  endorser: instructor1,
  thanks: users.slice(0, 1),
};

export const studentAnswers = [
  studentAnswer1,
  studentAnswer2,
  studentAnswer3,
  studentAnswer4,
];
export const instructorAnswers = [
  instructorAnswer1,
  instructorAnswer2,
  instructorAnswer3,
  instructorAnswer4,
];
export const answers = [...studentAnswers, ...instructorAnswers];

export const reply1: Reply = {
  text: "This is a reply to the first followup.",
  author: instructor1,
  date: genDate(5),
  helpful: [],
};

export const followUp1: FollowUp = {
  text: "This is the first followup.",
  author: student1,
  date: genDate(10),
  replies: [reply1],
  resolved: true,
  helpful: [student1],
};

export const followUp2: FollowUp = {
  text: "This is the second followup.",
  author: student2,
  date: genDate(0),
  replies: [],
  resolved: false,
  helpful: [],
};

export const note1: Post = {
  _id: "123",
  text: "This is the first note.",
  author: instructor1,
  date: genDate(21),
  type: "note",
  title: "Note 1",
  pinned: true,
  folder: "other",
  views: 10,
  endorser: undefined,
  goodNotes: users,
  followUps: [followUp2],
};

export const note2: Post = {
  _id: "234",
  text: "This is the second note.",
  author: instructor2,
  date: genDate(11),
  type: "note",
  title: "Note 2",
  pinned: false,
  folder: "other",
  views: 7,
  endorser: undefined,
  goodNotes: users.slice(0, 9),
  followUps: [],
};

export const note3: Post = {
  _id: "345",
  text: "This is the third note.",
  author: instructor3,
  date: genDate(1),
  type: "note",
  title: "Note 3",
  pinned: false,
  folder: "other",
  views: 4,
  endorser: undefined,
  goodNotes: users.slice(0, 8),
  followUps: [],
};

export const question1: Post = {
  _id: "456",
  text: "This is the first question.",
  author: student1,
  date: genDate(20),
  type: "question",
  title: "Question 1",
  pinned: false,
  folder: "hw1",
  views: 12,
  endorser: instructor1,
  studentAnswer: studentAnswer1,
  instructorAnswer: instructorAnswer1,
  goodNotes: users.slice(0, 7),
  followUps: [followUp1],
};

export const question2: Post = {
  _id: "567",
  text: "This is the second question.",
  author: student2,
  date: genDate(17),
  type: "question",
  title: "Question 2",
  pinned: false,
  folder: "hw1",
  views: 10,
  endorser: undefined,
  studentAnswer: studentAnswer2,
  goodNotes: users.slice(0, 6),
  followUps: [],
};

export const question3: Post = {
  _id: "678",
  text: "This is the third question.",
  author: student3,
  date: genDate(14),
  type: "question",
  title: "Question 3",
  pinned: false,
  folder: "project",
  views: 8,
  endorser: instructor2,
  instructorAnswer: instructorAnswer2,
  goodNotes: users.slice(0, 5),
  followUps: [],
};

export const question4: Post = {
  _id: "789",
  text: "This is the fourth question.",
  author: student4,
  date: genDate(11),
  type: "question",
  title: "Question 4",
  pinned: false,
  folder: "hw2",
  views: 6,
  endorser: undefined,
  studentAnswer: studentAnswer3,
  instructorAnswer: instructorAnswer3,
  goodNotes: users.slice(0, 4),
  followUps: [],
};

export const question5: Post = {
  _id: "890",
  text: "This is the fifth question.",
  author: student5,
  date: genDate(8),
  type: "question",
  title: "Question 5",
  pinned: false,
  folder: "hw2",
  views: 4,
  endorser: instructor3,
  studentAnswer: studentAnswer4,
  goodNotes: users.slice(0, 3),
  followUps: [],
};

export const question6: Post = {
  _id: "901",
  text: "This is the sixth question.",
  author: student6,
  date: genDate(5),
  type: "question",
  title: "Question 6",
  pinned: false,
  folder: "hw3",
  views: 2,
  endorser: undefined,
  instructorAnswer: instructorAnswer4,
  goodNotes: users.slice(0, 2),
  followUps: [],
};

export const question7: Post = {
  _id: "012",
  text: "This is the seventh question.",
  author: student7,
  date: genDate(0),
  type: "question",
  title: "Question 7",
  pinned: false,
  folder: "project",
  views: 0,
  endorser: instructor1,
  goodNotes: users.slice(0, 1),
  followUps: [],
};

export const notes = [note1, note2, note3];
export const questions = [
  question1,
  question2,
  question3,
  question4,
  question5,
  question6,
  question7,
];
export const allPosts = [...notes, ...questions];
