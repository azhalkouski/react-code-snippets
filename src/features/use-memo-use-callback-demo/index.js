import { useState } from 'react';
import ProductPage from './ProductPage.js';

export default function UseMemoUseCallbackDemo() {
  const [isDarkThemeEnabled, setIsDarkThemeEnabled] = useState()
  const [productId, setProductId] = useState()

  function handleProductIdChange(e) {
    setProductId(e.target.value);
  }

  return (
    <>
      <div style={{marginBottom: '30px'}}>
        <label htmlFor='product-id-input' style={{paddingRight: '20px'}}>Enter product id:</label>
        <input id="product-id-input" type='text' name='product-id-input' onChange={handleProductIdChange}/>
      </div>
      <DarkThemeSwitcher onChange={setIsDarkThemeEnabled}/>
      <ProductPage productId={productId} referrer="Tim Burton" theme={isDarkThemeEnabled ? 'dark-theme' : 'bright-theme'} />
    </>
  );
}


function DarkThemeSwitcher({ onChange }) {
  function handleChange(e) {
    onChange(e.target.checked)
  }
  return (
    <>
      <label htmlFor='theme-checkbox'>Dark theme</label>
      <input id='theme-checkbox' type='checkbox' name='theme-toggler' onChange={handleChange}/>
    </>
  );
}