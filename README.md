* Studio model
  * name
  * address: { city, state, country}
* Studio routes
  * create
  * get all
  * get by id (ADD FILMS)
* Actor model
  * name
  * dob
  * pob
* Actor routes
  * create
  * get all
  * get by id (ADD FILMS)
* Reviewer model
  * name
  * company
* Reviewer routes
  * create
  * get all
  * get by id (ADD REVIEWS)
  * update
  * delete
* Film model
  * title
  * studio
  * released
  * cast [role, actor]  
* Film routes
  * create
  * get all
  * get by id (ADD REVIEWS)
* Review model
  * rating
  * reviewer
  * review
  * film  
* Review routes
  * create
  * get all
  * delete

* UPDATE ROUTES
* studios - get by id (FILMS)
* actors - get by id (FILMS)
* reviewer - get by id (REVIEWS)
* film - get by id (REVIEWS)
* reviewers - deleted only if no reviews

* refactor 
* improve chance in seed
* make sure all requirements are met (models, routes)
* test all routes in postman (get films by id has id, get actors by id has id)

* deploy on heroku