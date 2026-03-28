# Scheduling Platform (Cal.com Clone)
SDE Intern Fullstack Assignment

## Description
This is a functional scheduling/booking web application that replicates Cal.com's core design and user workflow. It allows an admin to create event types, set their availability by timezone, and lets users book time slots through uniquely generated public booking links.

## Tech Stack
- **Frontend**: Next.js (App Router), React, Tailwind CSS, Lucide React
- **Backend**: Next.js Server Actions (acting as the backend API layer)
- **Database**: PostgreSQL with Prisma ORM

## Setup Instructions
1. Install dependencies:
   ```bash
   yarn install
   ```
2. Configure your Environment Variables:
   Rename `.env.example` to `.env` or edit the existing `.env` file to include your PostgreSQL connection string:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/calcom?schema=public"
   ```
3. Initialize the Database and Seed Sample Data:
   ```bash
   npx prisma db push
   npx prisma generate
   yarn run prisma seed
   ```
4. Start the Application:
   ```bash
   yarn dev
   ```

## Key Capabilities & Features
1. **Event Types Management**: Manage event duration, title, URL slug from `/dashboard/event-types`.
2. **Availability Settings**: Configure weekly working hours and default Timezone under `/dashboard/availability`.
3. **Public Booking**: Share a link (e.g. `http://localhost:3000/15min`) and users will see available slots generated dynamically based on timezone and availability, avoiding double-bookings.
4. **Dashboard**: View upcoming and past bookings in `/dashboard/bookings` and cancel them.

## Assumptions
- **Authentication**: As per the requirements, no login system is built. Instead, the application seeds a default user (`admin@cal.com`) and assumes they are logged in when accessing the `/dashboard` administrative routes.
- **Backend Architecture**: Used Next.js 15+ Server Actions to fulfill the requirements of a Fullstack Node.js Backend directly inside Next.js, allowing seamless end-to-end type safety with Prisma.
