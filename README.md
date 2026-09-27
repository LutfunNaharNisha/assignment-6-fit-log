# 🏋️ FitLog — Workout & Routine Tracker

FitLog is a modern, responsive web application designed for fitness enthusiasts to browse workouts, build daily lift plans, and save favorite exercises. Built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**.

---

## ✨ Features

- **Workout Explorer:** Filter and browse exercises by muscle group, equipment, and difficulty.
- **Daily Lift Planner:** Cap daily exercises at 5 lifts, track total target minutes, and calculate estimated calorie burn.
- **Saved Lifts Library:** Bookmark exercises to easily add them to future plans.
- **Dynamic Navbar & Badge Indicators:** Real-time badge highlighting that reflects your active tab (`Today Plan` vs `Saved`).
- **Mobile Responsive Drawer:** Seamless mobile navigation with quick stats overlay.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Optimization:** Next.js `<Image />` component for static assets.

---

## 📁 Project Structure

```text
├── public/
│   └── assets/
│       └── logo.png             # Brand logo image
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout with FitLogContext Provider
│   │   ├── page.tsx             # Workouts listing page
│   │   ├── my-plan/
│   │   │   └── page.tsx         # Plan & Saved lifts dashboard page
│   ├── components/
│   │   ├── Navbar.tsx           # Dynamic header with navigation & live badges
│   │   ├── Footer.tsx           # Footer component with logo
│   │   ├── PlanCard.tsx         # Workout card component
│   └── context/
│       └── FitLogContext.tsx    # State management for today's plan & saved items
├── package.json
└── README.md
```
