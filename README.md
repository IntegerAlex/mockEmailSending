# Email Sending Service

This project is a simple email sending service using Express and TypeScript. It demonstrates handling email sending with retry logic, status tracking, and providing a basic admin panel for monitoring the status of sent emails.

## How It Works

The email sending service handles email delivery through two providers, providerOne and providerTwo, with a retry mechanism for each provider.

1.Email Sending Process:

 - Provider One: Initially, the service checks if the email is in the providerOne array. If found, it attempts to send the email. If the email sending fails, it retries up to three times, with an exponential backoff strategy (i.e., doubling the delay between retries). Each retry updates the status in the statusTracker object.
 - Provider Two: If the email is not handled by providerOne, the service then checks providerTwo. Similar to providerOne, it retries sending the email up to six times if it fails, with an exponential backoff delay.
Status Tracking:

The statusTracker object maintains the status of each email attempt. It records which provider was used, the number of retries, and whether the email was successfully sent or failed.
Frontend Integration:

An admin panel allows users to submit email requests and view the status of all sent emails. The panel updates every 20 seconds with the latest email statuses retrieved from the backend.

## Project Structure

src/index.ts - Main Express application with routes for sending emails and retrieving status.
src/mail.ts - Contains the logic for sending emails and retrying with different providers.
views/index.html - Frontend HTML for the admin panel.
[demo]()

## Setup

### Prerequisites
 - Node.js (>=18.x)
 - npm or yarn
 - TypeScript

### Installation

Clone the Repository

```bash
git clone https://github.com/IntegerAlex/mockEmailSending
cd mockEmailSending
```

Install Dependencies

`npm install`


Running the Application
Start the server with:

```bash
npm run build
npm run start
```

The server will be available at http://localhost:3000.

### Endpoints

`POST` /sendMail: Send an email.

Request Body:
json
Copy code
{ "client": "user@example.com" }
Response: JSON object with the status of the email.

`GET` /getStatusTracker: Retrieve the status of all sent emails.
Response: HTML with the status of each email.

Frontend
The admin panel is served at the root URL (/). It provides:

A form to send emails.
A section to display the status of all sent emails.

Notes

Email Providers: The current implementation uses mock providers. Replace with actual email provider logic as needed.

Logging: Detailed logs are included for debugging and tracing email sending and retry logic.
Contributing

License
This project is licensed under the MIT License. See the LICENSE file for details.
