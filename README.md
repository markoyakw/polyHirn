# PolyHirn

**PolyHirn** is a web application for creating, managing, and analyzing quizzes and tests with AI-powered assistance.

The goal of the project is to make test creation faster, test evaluation smarter, and learning insights more useful for teachers, students, and educational platforms.

🔗 **Live demo:** [poly-hirn.vercel.app](https://poly-hirn.vercel.app/tests/new)

---

## About the Project

PolyHirn is being built as a modern test and quiz platform focused on two things:

- **powerful manual test construction**
- **AI-supported test generation and analysis**

The app is designed to help educators and content creators:

- create quizzes and tests more efficiently
- generate test ideas and question sets from a topic
- review answers faster
- analyze where students struggle most
- get clearer insights per student, per test, and per question

---

## Current Focus

Right now, the main area in development is the **Test Constructor**.

### In progress
- building the test constructor UI
- finishing the **Match Pairs** question type
- creating the **Fill the Gaps** question type

---

## Planned Features

### Test creation
- more question types
- intuitive drag-and-drop test constructor
- reusable question structures

### Test taking
- student-friendly test-taking interface
- clear navigation and progress

### Analytics
- results per student
- results per test
- results per question in question vault
- identifying questions or topics many users fail on
- visual charts for test/quizz performance tracking

### Test management
- **Test/Question Vault** for storing and organizing created tests and reusable questions
- easier access to previously created quizzes

### AI support
- generating tests from a topic or prompt
- helping teachers review essay/text answers faster
- surfacing weak areas based on student results
- improving feedback and analysis workflows

---

## Vision

PolyHirn aims to become more than just a quiz builder.

The long-term vision is to create a platform where:

- teachers save time on repetitive work
- students get clearer and more structured learning experiences
- educational data becomes actionable
- AI meaningfully supports the teaching process instead of just adding automation for the sake of automation

---

## Tech Stack

PolyHirn is built with modern frontend tooling.

### Current stack
- **Next.js**
- **React**
- **TypeScript**
- **Zustand**
- **DND Kit**

More tooling and infrastructure will be added as the project grows.

---

## Project Status

PolyHirn is currently in active development.

The project is at an early stage, with the core constructor experience being built first.  
New question types, test-taking, analytics, storage, and AI features are planned next.

---

## Roadmap

### Near-term
- finish **Match Pairs**
- implement **Fill the Gaps**
- improve the test constructor experience to be as intuitibe and user-friendly as possible

### Next
- build the **test-taking flow**
- add **results charts and analytics**
- implement a **tests vault**
- add **AI-assisted test generation**

### Later
- improve answer checking workflows
- deeper analytics
- better content reuse and organization
- possible deployment and public demo

---

## Installation

At the moment, PolyHirn can be run locally like a normal Next.js app.

```bash
npm install
npm run dev
