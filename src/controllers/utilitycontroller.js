'use-strict';
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const listPaginate = async (model, page, limit, attributes) => {
    const offset = (page-1)*limit;
    let response;
    if(attributes){
      response = await model.findAndCountAll(
        {
          limit: limit,
          offset: offset,
          attributes: attributes
        }
    );
    }
    else{
      response = await model.findAndCountAll(
        {
          limit: limit,
          offset: offset,
        }
    );
    }
    
    return response;
  };

  const listSearchPaginate = async (model, page, limit, search) => {
    const offset = (page-1)*limit;
    const response = await model.findAndCountAll(
        {
          where: {
            name: {[Op.like]: `%${search}%`},
          },
          limit: limit,
          offset: offset,
        }
    );
    return response;
  };
  const list = async (model,sortByColumn) =>{
    result = model.findAll({order: [sortByColumn]});
    return result;
}

const insert = async (model, values)=>{
  const result = await model.create(values);
  return result;
}
const remove = async (model, values)=>{
  await model.destroy({where:values})
}
const fetchWithCondition = async (model, values, attributes) => {
  return model.findOne({where: values});
}
const fetchAllCondition = async (model, values) => {
  return model.findAll({where: values});
}
const update = async (model, id, values)=>{
    console.log(model,id,values);
  const [, result] = await model.update(values, {where: {id}, returning: ['*']});
//   const oldValue = result[0]._previousDataValues;
//   const newValue = result[0].dataValues;
  return 1;
}
const get = async (model,values) => {
   
  return model.findOne({where:values});
}
module.exports = {
    listPaginate,
    listSearchPaginate,
    list,
    insert,
    fetchWithCondition,
    remove,
    update,
    get,
    fetchAllCondition
};
