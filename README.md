# Document Management Application

**Introduction**
This is a simple full-stack application using React, mock service workers, and local storage to simulate API calls. The application displays a set of cards with document information and allows users to reorder, add, edit, and delete the cards.

**Communication and Thought Process**
**Thought Process**
Component Design:

CardList: This component is responsible for fetching the data, managing the state of cards, and handling the drag-and-drop functionality.
Card: This component represents individual cards. It handles the display and drag-and-drop logic for each card.
AddContent: This component provides the functionality to add new cards.
Overlay: This component is used to display forms for adding and editing cards and to show an enlarged view of the card image.
Data Management:

Mock Service Worker: Used to create a mock server to handle API requests. This allows the application to have data persistence without a real backend.
Local Storage: Data is stored in the browser's local storage to ensure data persistence across page reloads.
State Management:

React Hooks: Used useState, useEffect, and useRef to manage state and side effects.
Saving Data: Implemented auto-save functionality that triggers every 5 seconds if there are any changes to the cards. A spinner is displayed when saving is in progress, and the time since the last save is shown.
Drag and Drop:

Implemented drag-and-drop functionality using HTML5 drag-and-drop API to reorder cards.
Form Management:

Created reusable form components for adding and editing cards.
Used an overlay component to display these forms and handle form submissions.
Image Loading:

Displayed a spinner while images are loading to improve user experience.
Communication
Initial Load: The application fetches the initial data from the mock server and displays the cards.
Reordering: Cards can be dragged and dropped to reorder. The updated order is saved every 5 seconds.
Adding and Editing: Users can add new cards or edit existing ones using the form displayed in the overlay.
Deletion: Users can delete cards, and the updated list is saved.
How to Run the Project
Prerequisites
Node.js (>= 14.x)
npm or yarn
Installation
Clone the repository:

sh
Copy code
git clone https://github.com/your-repo/document-management-app.git
cd document-management-app
Install dependencies:

sh
Copy code
npm install
# or
yarn install
Running the Project
Start the mock service worker:

sh
Copy code
npm run start:msw
# or
yarn start:msw
Start the development server:

sh
Copy code
npm run dev
# or
yarn dev
Open your browser and navigate to http://localhost:3000 to view the application.

Project Structure
/components: Contains React components.
/helpers: Contains helper functions for API calls.
/mocks: Contains mock service worker setup and handlers.
/static: Contains static data and assets.
/App.css: Contains CSS styles for the application.
/App.jsx: Main entry point for the application.
/main.jsx: Sets up the service worker and renders the app.
Dependencies
React: Frontend framework.
msw: Mock Service Worker for simulating API calls.
react-dnd: For drag-and-drop functionality.
react-icons: For icons.
axios: For making API requests.
Conclusion
This project demonstrates a simple yet functional document management application using modern frontend development practices. It showcases the use of React hooks, mock service workers for API simulation, and local storage for data persistence. The code is modular, maintainable, and follows good practices.

Feel free to explore the code and modify it as per your requirements. Happy coding!
