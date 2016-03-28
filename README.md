CSC309A4 Project Server API Version 1.0
=========================

Responses are in JSON format.

Sturcture for the objects:
* Posting
    * title (String) ... title
    * description (String) ... description
    * tags ([string]) ... can be null
    * keywords([string]) ... can be null
* User
    * email (string) ... unique, used to login 
    * hashed_password (string) ... title, such as "L0101"
    * salt (string) ...
    * UserName (string) ...
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

When creating an object you need to provide those fields (except the id which will generate automatically). For the cases that ids of other classes are required, you need to know those ids first.

The api: 

Coding
--------

###user
* **/findUser/:email[GET]**
    * Get user with unique email
    * parameters
        * email (String)
        * password (String)
    * Response
        * user (object) ... user object
        
* **/createUser[PUT]**
    * Create a user
    * Parameters
        * email (string) ... email
        * password (string) ... password
    * Response
        * user (object) ... user object

* **/editUser/:id[POST]** (Keep fields unchanged if they dont need to be modified )
    * modify user with id
    * parameters
        * user (object)
    * Response
        * user (object) ... user object
        
* **/deleteUser/:id[DELETE]** (might be useful in the admin)
    * delete user with email
    * parameters
        * email (String)
    * Response
        * Success/Fail (String)

###Postings
* **/findAllPostings[GET]**
    * Get all postings
    * no parameters
    * Response
        * postings (list of objects) ... posting objects

* **/findPosting/:id[GET]**
    * Get user with unique id
    * parameters
        * id (String)
    * Response
        * posting (object) ... posting object
        
* **/createPosting[PUT]**
    * Create a posting
    * Parameters
        * title (string) ... title
        * description (string) ... description
        * tags ([String]) ... tags
        * keywords ([String]) ... keywords
    * Response
        * posting (object) ... posting

* **/editPosting/:id[POST]** (Keep fields unchanged if they dont need to be modified )
    * modify posting with id
    * parameters
        * posting (object)
    * Response
        * posting (object) ... posting object
        
* **/deletePosting/:id[DELETE]** (might be useful in the admin/business user)
    * delete posting with id
    * parameters
        * id (String)
    * Response
        * Success/Fail (String)
