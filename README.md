CSC309A4 Project Server API Version 1.2
=========================

Responses are in JSON format.

Sturcture for the objects:
* Posting
    * title (String) ... title
    * description (String) ... description
    * tags ([string]) ... can be null
    * posting_date (Date) ... posting date
    * start_date (Date) ... can be null
    * end_date (Date) ... can be null
    * owner_email (String) ... email of owner
    * developer_email ([String]) ... email of developers
    * Status (String) ... status
    * rating (Number) ... rating
    * comments:
         * comment_date (Date)
         * commenter_email (String)
         * content (String)

* User
    * username (string) ... username
    * password (string) ... password
    * email (string) ... unique
    * gender (string) ... m/f
    * address (string) ... address
    * education: 
        * school (String)
        * program (String)
        * degree (String)
        * year (Number)
    * experience: 
        * job_title (String)
        * description (String)
        * rating (Number)
        * comment (String)
    * type (Boolean)
    * projects: [{type: ObjectId}, {ref: 'Posting'}] ... current projects the user participated

When creating an object you need to provide those fields (except the id which will generate automatically). For the cases that ids of other classes are required, you need to know those ids first.

The api: 

Coding
--------

###User
* **/userManager**
    * Method: GET
    * No Parameter
    * Response
        * user (list of objects) ... user object lists
        
* **/userManager/searchUser**
    * Method: GET
    * No Parameter
    * Response
        * user (object) ... user object
    * Example Reponse:  
```
            {
                "_id": {
                    "$oid": "56fdbe78e3e053302369fc51"
                },
                "email": "Ryan@r.com",
                "password": "$2a$10$gLfO5vjakRw4O8M60cu2VOo5UvDFEdl.Mt0qnsnzoAL2Alcxknzpm",
                "username": "Ryan",
                "projects": [
                    {
                        "$oid": "56fc7bf38055882c1dd7848f"
                    },
                    {
                        "$oid": "56fc7ca0a7903a5426ce4eb0"
                    },
                    {
                        "$oid": "56fda4a89d590e24149777b2"
                    }
                ],
                "experience": [],
                "education": [],
                "__v": 3
            }
```

* **/userManager/updateUser** (Keep fields unchanged if they dont need to be modified )
    * Method: PUT
    * parameters
        * email (String)
        * user (object)
    * Response
        * user (object) ... user object
        
* **/userManager/deleteUser** (might be useful in the admin)
    * delete user with email
    * parameters
        * email (String)
    * Response
        * user (object) ... the user just deleted

###Posting
* **/postingManager/viewAllPost**
    * Method: GET
    * no parameter
    * Response
        * postings (list of objects) ... posting objects

* **/postingManager** (get all projects that the user participated in)
    * Method: GET
    * no parameter
    * Response
        * posting (list of objects) ... posting object
       
* **/postingManager/joinPost**
    * Method: GET
    * Parameters
        * id (String) ... id
    * Response
        * redirect to '/postingManager'

* **/postingManager/view_detail**
    * Method: GET
    * Parameters
        * id (String) ... posting id
    * Response
        * user (object) ... current user
        * posting (object)

* **/postingManager/comment** 
    * Method: POST
    * parameters  
        * id (String) ... posting id
        * email (String) ... email
        * content (String) ... commentMessage
    * Response
        * posting (object) ... posting object
        
* **/postingManager/createpost**
    * Method: POST
    * parameters
        * Posting (Object)
    * Response
        * redirect to '/postingManager'

* **/postingManager/deletepost**
    * Method: GET
    * parameters
        * id (String) ... posting id
    * Response
        * redirect to '/postingManager'

* **/postingManager/search**
    * Method: GET
    * parameters
        * keyword (String) ... keyword
    * Response
        * list of posting objects

* **/postingManager/updatePosting**
    * Method: POST
    * parameters
        * id (String) ... posting id
        * posting (object)
    * Response
        * posting object
