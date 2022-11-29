
'use-strict';
const {
    Sequelize: {ValidationError},
  } = require('sequelize');
const {listPaginate,
    listSearchPaginate,
    list,
    insert,
    fetchWithCondition,
    remove,
    update,
    get,
    fetchAllCondition} = require('../controllers/utilitycontroller')


class globalHandler {
    constructor() { }


    //products 
    /*
        View Products - This method is responsible to fetch all the products from Database and send it to UI
        This method is primary endpoint for UI to communicate and from here Node will communicate with MYSQL DB using sequelize package
    */
    async viewProducts(req, res){
        try {
            const response = await list(req.app.get('models')['products'],"pname");
            res.status(200).send({status:true,msg:"products fetched",data:response});
        } catch (error) {
            console.log(error);
        }
    }


    //supplies
    /*
        addStoreRequest - this method helps Store managet to crete a new request . if store manager want to trade an item from warehouse this endpoint
        responsible to initiate the request in DB
        
        this method accepts storeName , ProductName , Quantity Requested , Description , Status as primary parameters to create a new request
    */
    async addStoreRequest(req,res){
        try {
            if(!req.body){
                return res.status(400).send({status: false, msg:"Request body does not exists"})
            }
            req.body.qty_req = parseInt(req.body.qty_req);
            const response = await insert(req.app.get('models')['store_requests'],req.body);
            res.status(200).send({status:true,msg:"Request has been initiated"});
        } catch (error) {
            console.log(error);
        }
    }

    /*
        fetchStoreRequests - inorder to view all the requests created by store manager , this endpoint will fetch records from DB (store requests table) and send those
        requests to UI so that store manager can easily track their requests and also warehouse manager can update requests easily
    */
    async fetchStoreRequests(req, res){
        try {
            if(req.query.wname){
            const response = await fetchAllCondition(req.app.get('models')['store_requests'],{wname:req.query.wname});
            res.status(200).send({status:true,msg:"store requests fetched",data:response});
            }else if(req.query.sname){
                const response = await fetchAllCondition(req.app.get('models')['store_requests'],{sname:req.query.sname});
                res.status(200).send({status:true,msg:"store requests fetched",data:response});
            }
            else{
                const response = await fetchAllCondition(req.app.get('models')['store_requests']);
                res.status(200).send({status:true,msg:"store requests fetched",data:response});
            }
        } catch (error) {
            console.log(error);
        }
    }

    /*
        Accept Store Request- After reviewing request raised by store manager , warehouse manager should eiter accept or decline the request . here- this endpoint 
        is responsible to accept a store request
        
        If request is accepted then it will update the quantity of the product in product table based on trade quantity.
        If requested quantity is greater than avaliable quantity then it will stop processing request and displays an error to user in UI
    */
    async acceptStoreRequest(req, res){
        try {
            if(!req.body){
                res.status(200).send({status:false,msg:"invalid request"});
            }else{
                let sid = parseInt(req.body.sid);
                let quantity = parseInt(req.body.p_qty) - parseInt(req.body.s_qty);
                let pid = parseInt(req.body.pid);
                const response = await update(req.app.get('models')['products'],pid,{qty:quantity});
                const res1 = await update(req.app.get('models')['store_requests'],sid,{req_status:'accepted',wh_comments:req.body.commets})
                res.status(200).send({status:true,msg:'done'});
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    /*
        rejectStoreRequest -- This endpoint is responsible to decline/reject a request raised by store manager. If rejected then it will just update the request status
        in DB and no other data modifications will take place. User can also provide comments while rejecting a request
    */
    async rejectStoreRequest(req, res){
        try {
            if(!req.body){
                res.status(200).send({status:false,msg:"invalid request"});
            }else{
                let sid = parseInt(req.body.sid);
                // const response = await update(req.app.get('models')['products'],pid,{qty:qty});
                const res1 = await update(req.app.get('models')['store_requests'],sid,{req_status:'out of stock',wh_comments:req.body.comments})
                res.status(200).send({status:true,msg:'Rejected successfully'});
            }
        } catch (error) {
            
        }
    }


    /*
        addsuppliesRequest -- this endpoint will be used by warehouse manager to raise a request to supplier to trade products. Warehouse manager should provide
        product name , required quantity , warehouse name and supplier name he wants to trade
    */
    async addSuppliesRequest(req, res){
        try {
            if(!req.body){
                res.status(400).send({status:false,msg:"request body does not exists"});
            }else{
                req.body.req_status = 'in progress';
                req.body.qty_req = parseInt(req.body.qty_req);
                const response = await insert(req.app.get('models')['supplier_requests'],req.body);
                res.status(200).send({status:true,msg:"request initiated"});
            }
        } catch (error) {
            console.log(error);
        }
    }


    /*
        fetchSuppliersRequest - this api is responsible to fetch all the requests raised by warehouse manager. so based on the data in table , both warehouse manager
        and supplier can easily track and manage the requsts
    */
    async fetchSuppliesRequests(req, res){
        try {
            if(req.query.wname){
            const response = await fetchAllCondition(req.app.get('models')['supplier_requests'],{wname:req.query.wname});
            res.status(200).send({status:true,msg:"store requests fetched",data:response});
            }else if(req.query.supname){
                const response = await fetchAllCondition(req.app.get('models')['supplier_requests'],{supname:req.query.supname});
                res.status(200).send({status:true,msg:"store requests fetched",data:response});
            }
            else{
                const response = await fetchAllCondition(req.app.get('models')['supplier_requests']);
                res.status(200).send({status:true,msg:"store requests fetched",data:response});
            }
        } catch (error) {
            console.log(error);
        }
    }

     /*
        Accept Warehouse Request- After reviewing request raised by Warehouse manager , Supplier should eiter accept or decline the request . here- this endpoint 
        is responsible to accept a Warehouse request
        
        If request is accepted then it will update the quantity of the product in product table based on trade quantity.
    */
    async acceptSuppliesRequest(req, res){
        try {
            if(!req.body){
                res.status(200).send({status:false,msg:"invalid request"});
            }else{
                let supid = parseInt(req.body.supid);
                req.body.qty = parseInt(req.body.qty);
                const product = await get(req.app.get('models')['products'],{pname:req.body.pname});
                const resp = await update(req.app.get('models')['products'],product.id,{qty: req.body.qty+product.qty});
                const res1 = await update(req.app.get('models')['supplier_requests'],supid,{req_status:'accepted',sp_comments:req.body.commets})
                res.status(200).send({status:true,msg:'done'});
            }
        } catch (error) {
            console.log(error);
        }
    }
    
     /*
        rejectStoreRequest -- This endpoint is responsible to decline/reject a request raised by warehouse manager. If rejected then it will just update the request status
        in DB and no other data modifications will take place. User can also provide comments while rejecting a request
    */
    async rejectSuppliesRequest(req, res){
        try {
            if(!req.body){
                res.status(200).send({status:false,msg:"invalid request"});
            }else{
                let supid = parseInt(req.body.supid);
                // const response = await update(req.app.get('models')['products'],pid,{qty:qty});
                const res1 = await update(req.app.get('models')['supplier_requests'],supid,{req_status:'out of stock',sp_comments:req.body.comments})
                res.status(200).send({status:true,msg:'Rejected successfully'});
            }
        } catch (error) {
            
        }
    }

    /*
        This endpoint is used to create new warehouse manager . so that store manager can trade products with multiple warehouses
    */
    async addWarehouses(req,res){
        try {
            const response = await insert(req.app.get('models')['warehouses'], req.body);
            res.status(200).send({status:true,msg:'warehouse added'});
        } catch (error) {
            console.log(error);
            res.status(500).send({status:false,msg:'something went wrong'});
        }
    }
    async addStores(req,res){
        try {
            const response = await insert(req.app.get('models')['stores'], req.body);
            res.status(200).send({status:true,msg:'store added'});
        } catch (error) {
            res.status(500).send({status:false,msg:'something went wrong'});
        }
    }
    async addSuppliers(req,res){
        try {
            const response = await insert(req.app.get('models')['supplies'], req.body);
            res.status(200).send({status:true,msg:'suppliers added'});
        } catch (error) {
            res.status(500).send({status:false,msg:'something went wrong'});
        }
    }

    async fetchWarehouse(req, res){
        try {
            const response = await list(req.app.get('models')['warehouses'],"wname");
            res.status(200).send({status:true,data:response,msg:"successfully retrived warehouses"});
        } catch (error) {
            res.status(500).send({status:false,msg:'something went wrong'});

        }
    }
    async fetchstores(req, res){
        try {
            const response = await list(req.app.get('models')['stores'],"sname");
            res.status(200).send({status:true,data:response,msg:"successfully retrived stores"});
        } catch (error) {
            res.status(500).send({status:false,msg:'something went wrong'});

        }
    }
    async fetchSuppliers(req, res){
        try {
            const response = await list(req.app.get('models')['supplies'],"supname");
            res.status(200).send({status:true,data:response,msg:"successfully retrived suppliers"});
        } catch (error) {
            res.status(500).send({status:false,msg:'something went wrong'});

        }
    }

    
 }

module.exports = globalHandler; 
