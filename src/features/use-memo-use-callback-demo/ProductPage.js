import { useCallback, useMemo } from 'react';
import ShippingForm from './ShippingForm.js';
import "./styles.css";

function post(route, options) {
  // just a dummy function for a function
}

function calculateHeavyResult(arg) {
  console.log('heavy work is being done');
  const start = performance.now();

  while (performance.now() - start < 500) {
    // imitates heavy work
  }

  console.log('heavy work has been done')
  return arg;
}

export default function ProductPage({ productId, referrer, theme }) {
  // the doHeavyWork will be invoked only when the theme value changes
  // when other props such as productid and referrer will update, useMemo will
  // prevent doHeavyWork from ivokation and save time and imporove rendering performance
  const justForUseMemoDemo = useMemo(() => {
    return calculateHeavyResult(theme)
  }, [theme]);


  // when the theme prop changes, a new function will not be assigned to handleSubmit
  // thanks to useCallaback. Thus ShippingForm will not get new props and its inner
  // memo optimisation will keep the ShippingForm component from unnecessary re-renders
  const handleSubmit = useCallback((orderDetails) => {
    post('/product/' + productId + '/buy', {
      referrer,
      orderDetails
    });
  }, [productId, referrer]);

  return (
    <div className={theme}>
      <div>ProductPage</div>
      <ShippingForm onSubmit={handleSubmit} />
    </div>
  );
}