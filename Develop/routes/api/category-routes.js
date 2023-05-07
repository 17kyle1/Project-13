const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/',  (req, res) => {
  // find all categories
  Category.findAll({
    // be sure to include its associated Products
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  })
  .then(categoryData => {
    res.json(categoryData);
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
    .then(categoryData => {
res.json(categoryData)
    
    if (!categoryData){
      res.status(404).json({ message: 'No category with matching id'});
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
      .then((categoryData) => res.json(categoryData))
    .catch((err) => {
  console.log(err);
  res.status(500).json(err)
    })
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const categoryData = awaitCategory.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
