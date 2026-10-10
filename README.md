# Printing House

Full-stack web platform that connects clients with print shops. Clients browse and order printed products, print shops manage their catalogue and orders, and companies can open a procurement auction that print shops bid on.

Course project for Internet Application Programming at the School of Electrical Engineering, University of Belgrade (2025/26).

## Roles

| Role | What they do |
| --- | --- |
| Client, individual | Searches products, orders through a cart, tracks orders, rates and comments on received products |
| Client, company | Same as an individual, but checkout opens a public procurement auction instead of creating invoices |
| Print shop | Manages products, print services and stock, processes orders, submits bids |
| Administrator | Approves registrations, manages users and product categories |

## Features

- **Registration with approval.** New accounts wait for an administrator to accept or reject them. Passwords are validated with a regular expression and stored as bcrypt hashes. The administrator signs in on a separate route.
- **Catalogue and search.** Search by name and category, sorting by clicking the column header, top 5 products by likes.
- **Product preparation and cart.** The client chooses colour, print service, text and quantity. The cart groups items by print shop.
- **Orders.** Checkout checks stock and creates one invoice per print shop. Order status moves from ordered to printing, delivered and received.
- **Public procurement.** A company's cart becomes a timed auction. Each print shop can submit one bid, and when time runs out the lowest bid from a shop that has every product in sufficient quantity wins and is invoiced automatically.
- **Product archive.** Clients mark deliveries as received, then like, dislike and comment on products.
- **Print shop tools.** Add products with colours, an image and print services, and update stock quantities.
- **Route guards** per role.

## Tech stack

- **Frontend:** Angular 20 with standalone components, TypeScript
- **Backend:** Node.js, Express, TypeScript
- **Database:** MongoDB with Mongoose

## Running the project

Requirements: Node.js and a local MongoDB instance.

1. Run `npm install` in both the backend and the frontend folder.
2. Start the backend, which listens on port 4000.
3. Start the frontend with `ng serve` and open `http://localhost:4200`.

## Scope

The following parts of the original specification are not implemented: password reset, PDF invoices by e-mail, online payment, map of the print shop, image rendering on the product, extra product images, JSON import, PDF procurement report and administrator statistics.
