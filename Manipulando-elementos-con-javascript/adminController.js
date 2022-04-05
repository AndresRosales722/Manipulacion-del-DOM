const fs = require('fs');
const path = require('path');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
let {validationResult} = require('express-validator')
const db = require('../database/models');
const { Op } = require("sequelize");

const Products = db.Product;
const Categories = db.Category;
const Subcategories = db.Subcategory;
const ProductImages = db.ProductImage;

let controller = {
    
	list:(req,res)=>{
		db.Product.findAll()
		.then(products => {
			res.render('products/products',{
				products,
				toThousand,
				session: req.session,	
			})
		}) 
		.catch((error)=>console.log(error))
    },

    add:(req,res)=>{
		let allCategories = Categories.findAll()
		let allSubcategories = Subcategories.findAll()
		Promise.all([allCategories,allSubcategories])
		.then(([categories,subcategories]) => {
			res.render('admin/products/productCreate',{
				categories,
				subcategories,
				session: req.session
			})
		})
    },

    create:(req,res)=>{
		let errors = validationResult(req)
        
        if (errors.isEmpty()) {
            const {name, price, category, subcategory, description, discount} = req.body;

            Products.create({
                name,
                price,
                description,
                discount,
                subcategory_id: subcategory,
            })
            .then((product) => {
                ProductImages.create({
                    image: req.file ? req.file.filename : 'default-image.jpg',
                    product_id: product.id
                })
                .then(() => {res.redirect('/admin')})
                .catch(error => console.log(error))
            })
            .catch(error => console.log(error))
        } else {
            let allCategories = Categories.findAll();
            let allSubcategories = Subcategories.findAll();
            Promise.all([allCategories, allSubcategories])
            .then(([categories, subcategories]) => {
            res.render('admin/products/productCreate', {
                categories,
                subcategories,
                errors: errors.mapped(),
                old: req.body,
                session: req.session
                })
            })
            .catch(error => console.log(error))
        }
    },

    edit:(req,res)=>{
		let productId = Number(req.params.id);
        const productPromise = Products.findByPk(productId);
        const categoriesPromise = Categories.findAll();
        const subcategoriesPromise = Subcategories.findAll();
        Promise.all([productPromise, categoriesPromise, subcategoriesPromise])
        .then(([product, categories, subcategories])=>{
            res.render('admin/products/ProductEdit', {
                product,
                categories, 
                subcategories,
                session: req.session
            })
        })
        .catch(error => console.log(error)) 		
    },

    update: (req, res) => {
        let errors = validationResult(req)
       
        if(errors.isEmpty()){
            const {name, price, category, subcategory, description, discount} = req.body
            Products.update({
                name, 
                price, 
                description,
                discount, 
                subcategory_id: subcategory,
            }, {
                where: {
                    id: req.params.id
                }
            })
            .then((result) => {
                ProductImages.findOne({
                    where: {
                        product_id: req.params.id
                    }
                })
                .then((image) => {
                    fs.existsSync('./public/img/products/', image.image)
                    ? image.image !== 'default-image.jpg' ?
                    fs.unlinkSync(`./public/img/products/${image.image}`) : ""
                    : console.log('No se encontro el archivo')
                    ProductImages.destroy({
                        where: {
                            product_id: req.params.id
                        }
                    })
                    .then(() => {
                        ProductImages.create({
                            image: req.file ? req.file.filename : 'default-image.jpg',
                            product_id: req.params.id
                        })
                        .then(() => {
                           res.redirect('/admin')
                        })
                    })
                })
                .catch(error => console.log(error))
            })
           
        }else{
            let productId = Number(req.params.id);
            const productPromise = Products.findByPk(productId);
            const categoriesPromise = Categories.findAll();
            const subcategoriesPromise = Subcategories.findAll();
            Promise.all([productPromise, categoriesPromise, subcategoriesPromise])
            .then(([product, categories, subcategories])=>{
                res.render('admin/products/ProductEdit', {
                    product,
                    categories, 
                    subcategories,
                    errors: errors.mapped(),
                    old: req.body,
                    session: req.session
                })
            })
            .catch(error => console.log(error)) 
        }
                
    },

    destroy : (req, res) => {
		ProductImages.findAll({
			where: {
				product_id : req.params.id
			}
		})
		.then((images) => {
			images.forEach((image) => {
				fs.existsSync('../public/img/products/', image.image)
				? fs.unlinkSync(`${'../public/img/products/'}${image.image}`)
				: console.log('No se encontro el archivo')
			})
			ProductImages.destroy({
				where: {
					product_id: req.params.id
				}
			})
			.then((result) => {
				Products.destroy({
					where: {
						id: req.params.id
					}
				})
                .then(res.redirect('/admin'))
				.catch(error => console.log(error))		
			})
			.catch(error => console.log(error))		
		})
		.catch(error => console.log(error))		
    }
}

module.exports = controller