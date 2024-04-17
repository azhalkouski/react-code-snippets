import { memo } from 'react';

const ShippingForm = memo(function ShippingForm ({ onSubmit }) {
  console.log('render ShippingForm')

  return (
    <div>Shipping Form</div>
  );
});

export default ShippingForm;
