
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
    async viewProducts(req, res){
        try {
            const response = await list(req.app.get('models')['products'],"pname");
            res.status(200).send({status:true,msg:"products fetched",data:response});
        } catch (error) {
            console.log(error);
        }
    }


    //supplies

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


    async addSuppliesRequest(req, res){
        try {
            if(!req.body){
                res.status(400).send({status:false,msg:"request body does not exists"});
            }else{
                req.body.req_status = 'in progress';
                req.body.qty_req = parseInt(req.body.qty_req);
                const response = await insert(req.app.get('models')['supplier_requests'],req.body);
                res.status(200).send({status:false,msg:"request initiated"});
            }
        } catch (error) {
            console.log(error);
        }
    }


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

    async acceptSuppliesRequest(req, res){
        try {
            if(!req.body){
                res.status(200).send({status:false,msg:"invalid request"});
            }else{
                let supid = parseInt(req.body.supid);
                const res1 = await update(req.app.get('models')['supplier_requests'],supid,{req_status:'accepted',sp_comments:req.body.commets})
                res.status(200).send({status:true,msg:'done'});
            }
        } catch (error) {
            console.log(error);
        }
    }
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