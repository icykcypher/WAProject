# E-shop

**E-shop** is a React and TypeScript-based web application built with Tailwind CSS, designed as a demo online store for adult products. The app integrates with **NorthAuth** for age verification and provides a simple shopping experience including browsing products, viewing details, managing a cart, and simulating purchases.

---

## Description

The application leverages React, TypeScript, and Tailwind CSS, with state management handled using React Context. Key features include:

- **Product Catalog:** Browse a list of products with images, names, and prices.
- **Product Cards:** Detailed product view with the ability to add items to the cart.
- **Shopping Cart:** Add, remove, and clear items in the cart, with a simulated checkout flow.
- **Authorization:** Integration with NorthAuth for age verification before checkout.
- **Responsive UI:** Grid-based product layout, hover effects, gradient-styled buttons, header, and footer.

---

## Folder Structure

The source code is organized by feature rather than technical layers to improve maintainability.

### Client side
```
client/
├── src/
│ ├── components/
│ │ ├── Header.tsx
│ │ ├── Footer.tsx
│ │ └── ProductCard.tsx
│ ├── contexts/
│ │ ├── CartContext.tsx
│ │ └── SessionContext.tsx
│ ├── hooks/
│ │ └── useCart.tsx
│ ├── pages/
│ │ ├── Home.tsx
│ │ ├── Product.tsx
│ │ ├── Cart.tsx
│ │ ├── About.tsx
│ │ └── AuthRedirect.tsx
│ ├── data/
│ │ └── products.ts
│ ├── App.tsx
│ └── main.tsx
```

- **components/** – Reusable UI components like Header, Footer, ProductCard.  
- **contexts/** – React Contexts for managing cart state and session/user info.  
- **hooks/** – Custom hooks such as `useCart` for accessing the cart context.  
- **pages/** – Individual page components for routing (Home, Product, Cart, About, AuthRedirect).  
- **data/** – Static data for products.  
- **App.tsx** – Main router defining route-to-page mappings.  
- **main.tsx** – React entry point mounting the app.

---

## Technologies

- **Frontend:** React, TypeScript, Tailwind CSS  
- **State Management:** React Context  
- **Routing:** React Router  
- **Authentication:** NorthAuth integration  
- **Styling:** Responsive grid, gradient buttons, hover effects  

---

## Requirements

To run this application locally, ensure you have the following installed:

- Node.js (version 16 or higher recommended)  
- npm or yarn package manager  

---


- **components/** – Reusable UI components like Header, Footer, ProductCard.  
- **contexts/** – React Contexts for managing cart state and session/user info.  
- **hooks/** – Custom hooks such as `useCart` for accessing the cart context.  
- **pages/** – Individual page components for routing (Home, Product, Cart, About, AuthRedirect).  
- **data/** – Static data for products.  
- **App.tsx** – Main router defining route-to-page mappings.  
- **main.tsx** – React entry point mounting the app.

---

## Technologies

- **Frontend:** React, TypeScript, Tailwind CSS  
- **State Management:** React Context  
- **Routing:** React Router  
- **Authentication:** NorthAuth integration  
- **Styling:** Responsive grid, gradient buttons, hover effects  

---

## Requirements

To run this application locally, ensure you have the following installed:

- Node.js (version 16 or higher recommended)  
- npm or yarn package manager  

---

## Installation and Usage

### Client

1. Go to the `client` directory:  

```bash
cd client
```
# Install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```
# Server

The application relies on NorthAuth for authentication and authorization. Make sure the NorthAuth service is running and accessible.

# Notes

The cart and purchase flow are simulated for demonstration purposes.

Product images currently use placeholder images (https://via.placeholder.com/150) and can be replaced with real images.

The app demonstrates an example of integrating an external OAuth-like service for age verification.