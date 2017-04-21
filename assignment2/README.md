Last week you learned to set up a Node.js web service that can receive requests.

This week, you'll update your application to display & modify a list of items of your choice (e.g. books, music albums, etc.), applying your knowledge of functions and modules.

create a dedicated JS module as shown in Ch.4 of the textbook, with:
a list of items, where each item has at least 3 fields (attributes). For this exercise, pick on attribute as a unique key (e.g. book title)
methods to get & delete an item. Export these methods for use by other scripts.
Call this new module into your index.js script,
Update your server script with routes for /get & /delete. Each route should invoke the corresponding method in your new module.
Users will request each route with parameters that identify a specific item in your list. For example:
http://localhost:3000/get?title=dune 

When the /get route is requested your application should display:
the requested item & it's details. For example:
searching for dune
{"title":"dune","author":"frank herbert","pubdate":1969}
a not-found message if item is not in the array (e.g. ‘No records found’)
When the /delete route is requested, your application should:
remove the requested item from your list, if found, and display the new total # of items. For example "[BOOK TITLE] removed. N total books"
 

Note:

You can use the Node.js QueryString module (https://nodejs.org/dist/latest-v6.x/docs/api/querystring.html (Links to an external site.)) to get request parameters 
For simplicity, assume the key field in your list must have unique values. For example, if you have a book list, book titles are unique,
For this assignment, it's sufficient to send a plain-text response, as on p.15 of the textbook. NOT necessary to create new html pages for each route.
Your get method should return an object. You'll need to convert it to a string, with JavaScript's JSON.stringify() method, to include it in the response. 
Your delete method should update the original list of items so that later requests (in the same server session) behave correctly. For example, list length should decrease by 1 with each deletion and users should be able to delete a given item only once.
