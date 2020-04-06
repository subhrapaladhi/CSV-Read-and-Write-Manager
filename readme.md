# CSV-Download-Manager
<br/>

## About

This node application has four endpoints to enable the user to read data from a CSV file, insert to into Mongo DB database, pause the read and insertion process, resume the process and terminate the process and delete the inserted data.

## Starting server

```bash
docker-compose up --build
```
PORT: <b>3000</b>

## Request and response table

___
Route:<b> /read</b>
<br/>
type: GET
</br>
Response:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if success :<b> &nbsp;&nbsp;{"status": "data insertion complete"}</b>
<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if error&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : <b>&nbsp;&nbsp;{"status":"error"}</b>
<br/><br/>
This endpoint is used to read the csv file and insert it's data into Mongo DB.
___
Route:<b> /pause</b>
<br/>
type: GET
</br>
Response : &nbsp; <b>{"status":"paused"}</b>
<br/><br/>
This endpoints is called to pause an ongoing read process.
___
Route:<b> /resume</b>
<br/>
type: GET
</br>
Response :  &nbsp;<b>{"status":"resumed"}</b>
<br/><br/>
This endpoint is called to resume a paused read process.
___
Route:<b> /read</b>
<br/>
type: GET
</br>
Response:  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if success :<b> &nbsp;&nbsp;{"status": "process terminated and inserted data deleted from db"}</b>
<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if error&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : <b>&nbsp;&nbsp;{"status": "error while deleting inserted data"}</b>
<br/><br/>
This stops the read process and deletes the data that has been inserted into the database.
___
