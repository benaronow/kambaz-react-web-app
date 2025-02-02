import { genDate } from "./dateUtils";
import { Answer, Post, User } from "./pazzaTypes";

export const instructor1: User = {
  type: "instructor",
  username: "Instructor1",
  profilePic: "/images/profiles/redpanda.png",
};

export const instructor2: User = {
  type: "instructor",
  username: "Instructor2",
  profilePic: "/images/profiles/chimp.png",
};

export const instructor3: User = {
  type: "instructor",
  username: "Instructor3",
  profilePic: "/images/profiles/crocodile.png",
};

export const student1: User = {
  type: "student",
  username: "Student1",
  profilePic: "/images/profiles/elephant.png",
};

export const student2: User = {
  type: "student",
  username: "Student2",
  profilePic: "/images/profiles/goat.png",
};

export const student3: User = {
  type: "student",
  username: "Student3",
  profilePic: "/images/profiles/koala.png",
};

export const student4: User = {
  type: "student",
  username: "Student4",
  profilePic: "/images/profiles/panda.png",
};

export const student5: User = {
  type: "student",
  username: "Student5",
  profilePic: "/images/profiles/pig.png",
};

export const student6: User = {
  type: "student",
  username: "Student6",
  profilePic: "/images/profiles/tiger.png",
};

export const student7: User = {
  type: "student",
  username: "Student7",
  profilePic: "/images/profiles/toucan.png",
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
  instructorEndorsed: true,
  thanks: 15,
};

export const studentAnswer2: Answer = {
  text: "This is the second student answer.",
  author: student3,
  date: genDate(16),
  instructorEndorsed: false,
  thanks: 11,
};

export const studentAnswer3: Answer = {
  text: "This is the third student answer.",
  author: student5,
  date: genDate(10),
  instructorEndorsed: true,
  thanks: 7,
};

export const studentAnswer4: Answer = {
  text: "This is the fourth student answer.",
  author: student7,
  date: genDate(7),
  instructorEndorsed: false,
  thanks: 3,
};

export const instructorAnswer1: Answer = {
  text: "This is the first instructor answer.",
  author: instructor1,
  date: genDate(18),
  instructorEndorsed: false,
  thanks: 13,
};

export const instructorAnswer2: Answer = {
  text: "This is the second instructor answer.",
  author: instructor2,
  date: genDate(13),
  instructorEndorsed: true,
  thanks: 9,
};

export const instructorAnswer3: Answer = {
  text: "This is the third instructor answer.",
  author: instructor3,
  date: genDate(9),
  instructorEndorsed: false,
  thanks: 5,
};

export const instructorAnswer4: Answer = {
  text: "This is the fourth instructor answer.",
  author: instructor1,
  date: genDate(4),
  instructorEndorsed: true,
  thanks: 1,
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

export const note1: Post = {
  text: "This is the first note.",
  author: instructor1,
  date: genDate(21),
  type: "note",
  title: "Note 1",
  pinned: true,
  folder: "other",
  views: 10,
  instructorEndorsed: false,
  followUps: [],
};

export const note2: Post = {
  text: "This is the second note.",
  author: instructor2,
  date: genDate(11),
  type: "note",
  title: "Note 2",
  pinned: false,
  folder: "other",
  views: 7,
  instructorEndorsed: false,
  followUps: [],
};

export const note3: Post = {
  text: "This is the third note.",
  author: instructor3,
  date: genDate(1),
  type: "note",
  title: "Note 3",
  pinned: false,
  folder: "other",
  views: 4,
  instructorEndorsed: false,
  followUps: [],
};

export const question1: Post = {
  text: "This is the first question.",
  author: student1,
  date: genDate(20),
  type: "question",
  title: "Question 1",
  pinned: false,
  folder: "hw1",
  views: 12,
  instructorEndorsed: true,
  studentAnswer: studentAnswer1,
  instructorAnswer: instructorAnswer1,
  followUps: [],
};

export const question2: Post = {
  text: "This is the second question.",
  author: student2,
  date: genDate(17),
  type: "question",
  title: "Question 2",
  pinned: false,
  folder: "hw1",
  views: 10,
  instructorEndorsed: false,
  studentAnswer: studentAnswer2,
  followUps: [],
};

export const question3: Post = {
  text: "This is the third question.",
  author: student3,
  date: genDate(14),
  type: "question",
  title: "Question 3",
  pinned: false,
  folder: "project",
  views: 8,
  instructorEndorsed: true,
  instructorAnswer: instructorAnswer2,
  followUps: [],
};

export const question4: Post = {
  text: "This is the fourth question.",
  author: student4,
  date: genDate(11),
  type: "question",
  title: "Question 4",
  pinned: false,
  folder: "hw2",
  views: 6,
  instructorEndorsed: false,
  studentAnswer: studentAnswer3,
  instructorAnswer: instructorAnswer3,
  followUps: [],
};

export const question5: Post = {
  text: "This is the fifth question.",
  author: student5,
  date: genDate(8),
  type: "question",
  title: "Question 5",
  pinned: false,
  folder: "hw2",
  views: 4,
  instructorEndorsed: true,
  studentAnswer: studentAnswer4,
  followUps: [],
};

export const question6: Post = {
  text: "This is the sixth question.",
  author: student6,
  date: genDate(5),
  type: "question",
  title: "Question 6",
  pinned: false,
  folder: "hw3",
  views: 2,
  instructorEndorsed: false,
  instructorAnswer: instructorAnswer4,
  followUps: [],
};

export const question7: Post = {
  text: "This is the seventh question.",
  author: student7,
  date: genDate(0),
  type: "question",
  title: "Question 7",
  pinned: false,
  folder: "project",
  views: 0,
  instructorEndorsed: true,
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
export const posts = [...notes, ...questions];
