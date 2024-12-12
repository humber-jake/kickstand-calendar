# KICKSTAND CALENDAR

https://kickstand-calendar.netlify.app/

### Problem:

Kickstand is a community bike repair shop that is 100% run by volunteers. Each week, volunteers will sign up for shifts depending on their availability. Currently, the schedule is a spreadsheet hosted on Google Sheets.

### Objective:

Create a scheduling web app for the Kickstand volunteers to sign up for shifts at the shop.

### Goals Implemented:

#### Calendar

The calendar is dynamically rendered using JavaScript Date Objects. Months can require anywhere from 4-6 rows to render all the days.

#### MiniCalendar

The miniCalendar component in the sidebar and the shift modals can be used for navigation and selecting a day.

#### Supabase

This project uses Supabase to store data and add, edit, or delete shifts.

### 🛠 TODOS: 👷‍♀️

#### Mobile Responsiveness

This app is NOT responsive for mobile. It is intended for desktop use, but I will still create a responsive design for mobile web browsers.

#### Login / Auth

User auth will be implemented to add a login page, as well as permission levels for different users (keyholder, site admins).

#### Data Validation

Users should not be able to edit / delete shifts that do not belong to them. The "name" field will be automatically filled once auth is implemented.
