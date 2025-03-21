# myBank

## Overview

**myBank** is a personal financial SaaS platform banking application designed to provide users with a seamless and intuitive banking experience. Built using modern web technologies, the app allows users to connect to multiple bank accounts, view transactions in real-time, and perform transfers of money to other platform users securely.

## Technologies Used

- **Next.js 14**: A powerful React framework for server-side rendering and static site generation.
- **TypeScript**: For type safety and enhanced development experience.
- **Appwrite**: A backend-as-a-service platform for user authentication and database management.
- **Plaid**: To securely connect user bank accounts and retrieve transaction data.
- **Dwolla**: To facilitate ACH transfers and manage payments.
- **React Hook Form**: For managing form state and validation with ease.
- **Zod**: For schema validation and type inference.
- **TailwindCSS**: A utility-first CSS framework for rapid UI development.
- **Chart.js**: For rendering interactive charts and data visualizations.
- **ShadCN**: A component library for building UI with a focus on accessibility and design.

## Features

- **User Authentication**: An ultra-secure SSR authentication with proper validations, using Appwrite.
- **Bank Account Integration**: Connect multiple bank accounts using Plaid.
- **Transaction Management**: View, filter, and analyze transactions.
- **Transfer Funds**: Easily transfer funds between accounts using Dwolla.
- **Responsive Design**: Fully responsive UI built with TailwindCSS.
- **Data Visualization**: Interactive charts to show available funds in each connected bank account using Chart.js.
- **Real-time Updates**: Reflects changes across all relevant pages upon connecting new bank accounts.
and many more, including code architecture and reusability.

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Mikael-duru/myBank.git
   cd myBank
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory and add your environment variables:

   ```
      # NEXT
      NEXT_PUBLIC_SITE_URL=

      #APPWRITE
      NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
      NEXT_PUBLIC_APPWRITE_PROJECT=
      APPWRITE_DATABASE_ID=
      APPWRITE_USER_COLLECTION_ID=
      APPWRITE_BANK_COLLECTION_ID=
      APPWRITE_TRANSACTION_COLLECTION_ID=
      APPWRITE_SECRET=
      
      #PLAID
      PLAID_CLIENT_ID=
      PLAID_SECRET=
      PLAID_ENV=
      PLAID_PRODUCTS=
      PLAID_COUNTRY_CODES=

      #DWOLLA
      DWOLLA_KEY=
      DWOLLA_SECRET=
      DWOLLA_BASE_URL=https://api-sandbox.dwolla.com
      DWOLLA_ENV=sandbox
   ```

4. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:3000`.

## Usage

- Register a new account or log in with existing credentials.
- Connect your bank account using Plaid to view transactions.
- Use the transfer feature to manage your funds seamlessly.
- Analyze your spending habits with visual charts.

## Acknowledgments

- Thanks to the creators of the libraries and tools used in this project.
- Special thanks to the open-source community for their contributions.
