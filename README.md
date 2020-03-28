* Studio model
  * name
  * address: { city, state, country}
* Studio routes
  * create
  * get all
  * get by id FIX FOR FILMS
* Actor model
  * name
  * dob
  * pob
* Actor routes
  * create
  * get all
  * get by id FIX FOR FILMS
* Reviewer model
  * name
  * company
* Reviewer routes
  * create
  * get all
  * get by id FIX FOR REVIEWS
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
  * get by id FIX FOR REVIEWS
* Review model
  * rating
  * reviewer
  * review
  * film  
* Review routes
  * create
  * get all
  * delete

* FIXED ROUTES
* studios - get by id (FILMS)
* actors - get by id (FILMS)
* reviewer - get by id (REVIEWS)
* film - get by id (REVIEWS)

* reviewers - deleted only if no reviews