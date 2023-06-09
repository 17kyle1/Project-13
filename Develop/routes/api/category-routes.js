const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/',  (req, res) => {
  // find all categories
  Category.findAll({
    // be sure to include its associated Products
    attributes: [
      'id',
      'category_name'
    ],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock'],
      }
    ]
   
  })
  .then(Data => {
    res.json(Data);
  })
  .catch((err)=> {
    console.log(err);
    res.json(err);
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
   Category.findByPk(req.params.id, {
       // be sure to include its associated Products
       include: [{model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }],
    })
    .then(Data => {
res.json(Data)
    
    if (Data){
      res.status(404).json({ message: 'No such category exists'});
      return;
    }
  })
  .catch((err) => {
console.log(err);
res.json(err);
  })
   
  } 
);

router.post('/', (req, res) => {
  // create a new category
  Category.create({
      category_name: req.body.category_name, })
      .then((Data) => res.json(Data))
    .catch((err) => {
  console.log(err);
  res.status(500).json(err)
    })
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(Data => {
    if (!Data) {
      res.status(404).json({ message: 'No such category exists'})
      return;
    }
    res.json(Data)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(Data => {
    if (!Data) {
      res.status(404).json({ message: 'No such category exists'})
      return;
    }
    res.json(Data);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

module.exports = router;
