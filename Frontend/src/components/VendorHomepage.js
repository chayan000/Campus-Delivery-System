import React, { useState, useEffect } from 'react';
import VendorNavbar from './VendorNavbar';

const VendorHomePage = (props) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newCategory, setNewCategory] = useState('');
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [vendor, setVendor] = useState([]);
  const [vendorname, setVendorName] = useState('');
  const [shopname, setShopName] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShopData = async () => {
      const utoken = localStorage.getItem("token");
      try {
        const response = await fetch('http://localhost:27017/api/v1/allProductperCategoryShop', {
          method: 'GET',
          headers: { Authorization: `Bearer ${utoken}` }
        });
        const data = await response.json();
        setVendor(data.vendor);
        setVendorName(data.vendor.name);
        setShopName(data.vendor.shop.name);
        setCategories(data.vendor.shop.categories);
        //console.log(name);
      } catch (error) {
        console.error('Error fetching shops:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchShopData();
  }, []);

  const handleAddCategory = async () => {
    //console.log('Adding new category:', newCategory);
    // Implement logic to add a new category to the vendor's shop
    // Make an API call to add the category to the backend
    const utoken = localStorage.getItem("token");
    try {
      const response = await fetch('http://localhost:27017/api/v1//vendor/addcategoryproduct', {
        method: 'POST',
        headers: { Authorization: `Bearer ${utoken}` },
        body: {newCategory}
      });
      const data = await response.json();
      console.log(data)
    } catch (error) {
      console.error('Error fetching shops:', error);
    } 
  };

  const handleAddProduct = () => {
    console.log('Adding new product:', newProductName, 'in category:', selectedCategory, 'with price:', newProductPrice);
    // Implement logic to add a new product to the selected category
    // Make an API call to add the product to the backend
  };

  const handleUpdateProduct = (productId) => {
    console.log('Updating product:', productId, 'with new details:');
    // Implement logic to update product details
    // Make an API call to update the product details in the backend
  };

  return (
    <div>
      <VendorNavbar name={vendorname} shop={shopname} />
      <h1>Manage Your Shop</h1>
      <h3>Categories:</h3> 
      <select value={selectedCategory} onChange={(e) => { if (e.target.value !== "Select a Category") { setSelectedCategory(e.target.value) } }}>
        <option value={null}>Select a Category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>  
        ))}
      </select>

      {selectedCategory && (
        <>
          <div>
            <h4>{vendor.shop.categories.find((c) => c.id === selectedCategory)?.name}</h4>
            <div className="product-list">
              {vendor.shop.categories.find((c) => c.id === selectedCategory)?.products.map((product) => (
                <div key={product.id} className="product-card">
                  <h5>{product.name}</h5>
                  <p>${product.price}</p>
                  <button type="button" onClick={() => handleUpdateProduct(product.id)}>
                    Update
                  </button>
                </div>
              ))}
            </div>
          </div>
          <br />
          <form className='container'>
            <label>
              New Product Name:
              <input type="text" value={newProductName} onChange={(e) => setNewProductName(e.target.value)} />
            </label>
            <label>
              New Product Price:
              <input type="text" value={newProductPrice} onChange={(e) => setNewProductPrice(e.target.value)} />
            </label>
            <button type="button" onClick={handleAddProduct}>
              Add Product
            </button>
          </form>
        </>
      )}
      <br />

      <form className='container'>
        <label>
          New Category Name:
          <input type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
        </label>
        <button type="button" onClick={handleAddCategory}>
          Add Category
        </button>
      </form>
    </div>
  );
};

export default VendorHomePage;
