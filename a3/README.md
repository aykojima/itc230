This week, create a simple Search feature for your ‘list’ application, using Express, request/response objects, and basic templating.

Install the express-handlebars & body-parser npm modules as application dependencies,
Convert your index.js script from the previous HW to Express application syntax,
Update your home.html page to display a ‘Search’ form with a text field corresponding the key field in your list. For example, if your application is a book list, users could search for a book title.
When submitted, the form should post to a ‘/get’ route in your application. The route should respond with a view that displays:
the user’s entry (e.g. ‘Searching for [BOOK TITLE]’)
item details & a delete link, if found in the array,
show a not-found message if item is not in the array (e.g. ‘[BOOK TITLE] not found’)
 When clicked, the 'delete' link should passes the key value (e.g book title) to your 'delete' route, which should respond with a view that shows the key value, whether it was deleted, and the remaining total in your list
Tips:

To serve up your home.html page via Express, you can use the 'sendfile() method
Keep your search field simple. Avoid requiring entries to have spaces or mixed case to match items in your list,
Client-side form validation isn’t required for this assignment, but you can use HTML5 field attributes like ‘required’ and ‘maxlength’ to prevent the most basic errors.
Focus on the assignment's functional requirements before making it pretty,
Rubric
