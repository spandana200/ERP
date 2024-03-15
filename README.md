# ERP - ReactJS Project

## About

The goal of this project is to create a simplified interface for an ERP (Enterprise Resource Planning) system, designed to manage basic business operations efficiently. The system will consist of the following pages:
1. Dashboard - Provides an overview of the system's features.
2. Products Management - Allows for the management of product listings.
3. Orders Management - Facilitates viewing and handling orders.
4. Clients - Shows the client listing
5. Appointments - Shows the appointment listing
6. Orders Calendar View - A calendar interface displaying orders based on their expected delivery dates.

## Prerequisites

### Install Node JS
Refer to https://nodejs.org/en/ to install nodejs


## Cloning and Running the Application in local

Clone the project into local and checkout to branch:main

Install all the npm packages. Go into the project folder and type the following command to install all npm packages

```bash
npm install
```

In order to run the application Type the following command

```bash
npm start
```

The Application Runs on **localhost:3000**

## Application design

#### Components
All components includes navigation links for quick access to different pages within the application  and uses Mock Data present in mockData folder for implementaion
1. **Dashboard** Component :

-This React component displays a summary of various data points in Graphs 
  - Today's Orders based on Status
  - Today's Appointments
  - Products based on Today's Orders 
  - Orders by Month
  - Products based on Category in Chart Form
- Shows the Info of Total Clients and Top Selling Products

2.**Products** Component:
- This component lists all  the products 
- includes add, delete, edit operations
- includes pagination
- Mock data is used to list the products

3.**Orders** Component:
- This component lists all the orders
- includes operations -shows the entire order details on view, deletes, update Order status  by using drop-down of status 
- includes pagination
  
4.**Calendar View** Component:
  -Includes a calendar view that displays orders on their expected delivery dates.
  -Provide the ability to click on a date to view all orders due for delivery that day.
  
5.**Clients** Component: Lists the clients

6.**Appointments** Component: Lists the Appointments


## Screenshots
https://drive.google.com/drive/folders/15ikFnA1LGvAlVelzFzdiAE_HmfdhgQpD?usp=sharing

The above link includes all the screenshots related to the application
