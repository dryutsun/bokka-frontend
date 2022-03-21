## BRIDGES APP / BOKKA

Hello Porter! Welcome to B.R.I.D.G.E.S, America's one and _only_ delivery service. Your task is to take on jobs and deliveries when our citizens need them! To do this, you'll need bridges app, a worker-facing interface to locate new oppotunities and jobs.

## MVP

### WORKER USER
- As a user, I would like to be able to log in as either a worker or a requester.
- As a porter user, I would ideally like to be greeted with the closest tasks made by requesters.
- As a porter user, I would like to be able to accept or decline jobs.
- As a porter user, I would like to be able to indicate that I've completed a job.

### REQUESTER USER
- As a requester user, I would like to be able to log in as a requester.
- As a requester user, I would like to be able to make make requests in the form of tasks or deliveries.
- As a requester, I would like to be able to indicate location and ideal time-frame for delivery.
- As a requester, I would like to be able to rate the delivery based upon the condition of the delivered item.

## STRETCH GOALS
- As a User, I would like to create a mock payment portal.
- As a User, I would like to be able to review the Porter.
- As a Porter User, I would like to be able to find the best pedestrian path to make my deliveries.
- As a Porter User/User, I would like to see the progress of my order.
- User should be able to add pictures of their packages.
- Maybe have an option to allow porters to order and customers to deliver.

## POTENTIAL BLOCKERS
- Not being able to call the Mapbox API In the way that I want.
- Model/Schema confusion.
- User Authentication/Permission with the multiple types of users.
- API Struggles.
- State management in Order Processing / Payment

## TECHNICAL STACK

Frontend: REACTJS

Backend:
- Django might make it easier to handle user accounts, permissions and views.
- Express/Node I have familiarity with -- not a big fan of the strategy though (tedious to test!).

Database:
- MongoDB or Postgresql?
  - I would like more experience with Mongo, but I also like the idea of having to architect everything prior.

### API:
https://docs.mapbox.com/help/glossary/directions-api/
https://docs.mapbox.com/api/navigation/directions/


### Stretch API:
Cloudinary API for Order Item Images?
https://docs.mapbox.com/help/glossary/directions-api/
https://docs.mapbox.com/api/navigation/directions/
https://github.com/Dashride/mongoose-stripe-customers
https://saasbase.dev/subscription-payments-2-keeping-track-of-customer-billing-information-using-mongo-and-stripe-webhooks/


ROUTES:
## PORTER

## ORDERS
| VERB  | ROUTE   | ACTION   | DESCRIPTION   |
|---|---|---|---|
|GET:|/orders/|Index(Read)|Displays a list of all available orders|
|GET:|/order/:id|Show(Read)|Displays a specific Order|
|POST:|/order/:orderid|Create(Create)|Creates an Order (Requester)
|PATCH:|/order/:orderId|Edit(Update)| Finds and edits a specific field in a created order.|
|DELETE:|/order/:orderid| Delete(destroy)  | Finds and Deletes a Specific Order   |

## ORDER ITEMS
| VERB  | ROUTE   | ACTION   | DESCRIPTION  |
|---|---|---|---|
|GET:| /:orderid/:itemid | Index (Read)   | Get All Items associated with an Order  |
|GET:| /:orderid/:itemid/  | Show  | Get One Item Associated with an Order  |
|POST:| /:orderid/ | Create   | Create a specific item as part of an order  |
|PATCH:| /:orderid/:itemid  | Update   | Update a specific item that is part of an order   |
|DELETE:| /:orderid/ | Delete/Destroy  | Remove an order  |
|DELETE:| /:orderid/:itemid  | Delete/Destroy  | Remove an item from an order  |

## USER:
| VERB  | ROUTE   | ACTION   | DESCRIPTION  |
|---|---|---|---|
|GET:|/users  | Index  |  Retrieves all profiles in the database |
|GET:|/users/:id  | Show  | Show’s a customer's profile page |
|GET:|/user/porter/:id | Show | Show a porter's profile page.
|POST:| /users  | Create  |  Create a username/location/usertype for your profile |













## SCHEMA & WIREFRAMES:
![Bridges_Bokka_app]('./assets/Bokka_BRIDGES_App.png')
![Porter_mockup]('./assets/porter_mockup.png')
[Mobile Mockup]('https://www.figma.com/file/TMrKTAyIDMylp8JWiUKfHd/Porter-App?node-id=0%3A1')
[USER FLOWS]('https://lucid.app/lucidchart/8425ee93-435f-4e19-af77-3045c29b0c3f/edit?beaconFlowId=6F399678627FF18A&invitationId=inv_4068f738-2120-461a-ac0d-6accd0c9fc9c&page=0_0#')





UI FLOW:
