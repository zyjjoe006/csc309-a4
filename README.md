CSC309A4 Project Server API Version 1.1
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
    * comments ([ObjectId]) ...

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

When creating an object you need to provide those fields (except the id which will generate automatically). For the cases that ids of other classes are required, you need to know those ids first.

The api: 

Coding
--------

###user
* **/getUser/:email[GET]**
    * Get user with unique email
    * parameters
        * email (String)
        * password (String)
    * Response
        * user (object) ... user object
        
* **/createUser[POST]**
    * Create a user
    * Parameters
        * email (string) ... email
        * password (string) ... password
    * Response
        * user (object) ... user object

* **/updateUser/:email[PUT]** (Keep fields unchanged if they dont need to be modified )
    * modify user with id
    * parameters
        * user (object)
    * Response
        * user (object) ... user object
        
* **/deleteUser/:email[DELETE]** (might be useful in the admin)
    * delete user with email
    * parameters
        * email (String)
    * Response
        * Success/Fail (String)

###Postings
* **/getAllPostings[GET]**
    * Get all postings
    * no parameters
    * Response
        * postings (list of objects) ... posting objects

* **/getPosting/:id[GET]**
    * Get user with unique id
    * parameters
        * id (String)
    * Response
        * posting (object) ... posting object
        
* **/createPosting[POST]**
    * Create a posting
    * Parameters
        * title (string) ... title
        * description (string) ... description
        * tags ([String]) ... tags
        * keywords ([String]) ... keywords
    * Response
        * posting (object) ... posting

* **/updatePosting/:id[PUT]** (Keep fields unchanged if they dont need to be modified )
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
