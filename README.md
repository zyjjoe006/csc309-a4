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
    * Example Response
```
         {
             "_id": {
                 "$oid": "56fdd0a677599cac2ba499b8"
             },
             "owner_email": "Nick@n.com",
             "posting_date": {
                 "$date": "2016-04-01T01:36:38.555Z"
             },
             "title": "Nick's project",
             "description": "Nick needs test input",
             "comments": [
                 {
                     "comment_date": {
                         "$date": "2016-04-01T01:46:23.327Z"
                     },
                     "commenter_email": "Nick@n.com",
                     "content": "Hi, this is Nick",
                     "_id": {
                         "$oid": "56fdd2ef659679481f4e33a0"
                     }
                 },
                 {
                     "comment_date": {
                         "$date": "2016-04-01T02:09:29.078Z"
                     },
                     "commenter_email": "Ryan@r.com",
                     "content": "You suck",
                     "_id": {
                         "$oid": "56fdd859659679481f4e33a2"
                     }
                 },
                 {
                     "comment_date": {
                         "$date": "2016-04-01T02:11:28.051Z"
                     },
                     "commenter_email": "Nick@n.com",
                     "content": "Stop taking my CS",
                     "_id": {
                         "$oid": "56fdd8d0659679481f4e33a3"
                     }
                 }
             ],
             "developer_email": [
                 "Ryan@r.com"
             ],
             "tags": [],
             "__v": 4
         }
```
        
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
