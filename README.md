# warehouse_management

http://localhost:8080/portal/viewProducts


stores:

1. http://localhost:8080/portal/addStoreRequest   (post)
	[{"key":"req_desc","value":"description of request goes here","description":""},{"key":"qty_req","value":"500","description":""},{"key":"req_status","value":"processing","description":""},{"key":"pname","value":"soaps","description":""},{"key":"sname","value":"RK Goods","description":""},{"key":"wname","value":"wallmart","description":""}]

2. http://localhost:8080/portal/fetchStoreRequests?wname=flipkart => fetching store requests by wallmart

3. http://localhost:8080/portal/fetchStoreRequests?sname=SMK supermarket => fetching store requests by store name to 	   display in store dashboard


warehouse actions

status => accepted / out of stock / in progress

1. case accepted :
		required in request => pid, sid, p_qty, s_qty, comments(optional)
		pid -> product id
		sid -> store request id
		p_qty -> products quantity from products object
		s_qty -> quantity that mentioned in store request object

		endpoint : http://localhost:8080/portal/acceptStoreRequest (post)

2. case out of stock :
		required in request => sid, comments(optional)
		sid -> store request id

		endpoint : http://localhost:8080/portal/rejectStoreRequest (post)
3. create a supplies request
	http://localhost:8080/portal/addSuppliesRequest (post)

	example
	[{"key":"req_desc","value":"description","description":""},{"key":"qty_req","value":"2000","description":""},{"key":"pname","value":"dishes","description":""},{"key":"supname","value":"logistics","description":""},{"key":"wname","value":"wallmart","description":""}]


suppliers Actions

1. case accepted :
	required in request => supid, sp_comments (optional)
	endpoint : http://localhost:8080/portal/acceptSuppliesRequest

2. case rejected :
	required in request => supid, sp_comments (optional)
	endpoint : http://localhost:8080/portal/rejectSuppliesRequest

3. http://localhost:8080/portal/fetchSuppliesRequests?wname=flipkart => fetching store requests by wallmart

4. http://localhost:8080/portal/fetchSuppliesRequests?supname=SMK supermarket => fetching store requests by store name to 	    display in store dashboard




-----------------------------

/addWarehouses
/addStores
/addSuppliers 

fields in src/model/<warehouses/stores/supplies>


