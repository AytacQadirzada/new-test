import React, { useEffect, useState } from 'react'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
  container: {
    padding: '40px',
    fontFamily: '"Roboto", sans-serif',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: '32px',
    fontWeight: '800',
    color: '#5A20B3',
    textAlign: 'center',
    marginBottom: '40px',
  },
  table: {
    width: '50%',
    borderCollapse: 'collapse',
    marginBottom: '40px',
  },
  thead: {
    backgroundColor: '#f5f5f5',
    textAlign: 'left',
  },
  th: {
    padding: '12px',
    fontSize: '16px',
    color: '#5A20B3',
    fontWeight: '600',
  },
  td: {
    padding: '16px',
    verticalAlign: 'middle',
    fontSize: '15px',
  },
  image: {
    width: '60px',
    height: '60px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  quantityInput: {
    width: '60px',
    padding: '6px',
    fontSize: '14px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  removeBtn: {
    background: 'none',
    border: 'none',
    color: 'blue',
    fontSize: '20px',
    cursor: 'pointer',
  },
  total: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#5A20B3',
    textAlign: 'center',
    marginBottom: '24px',
  },
  payBtn: {
    display: 'block',
    margin: '0 auto',
    padding: '12px 30px',
    fontSize: '16px',
    backgroundColor: '#fff',
    color: '#5A20B3',
    border: '2px solid #5A20B3',
    borderRadius: '6px',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#5A20B3',
      color: '#fff',
    },
  },
})

const Basket = () => {
  const classes = useStyles()
  const [cartItems, setCartItems] = useState<any[]>([])
  useEffect(() => {
    const data = localStorage.getItem('cart')
    if (data) {
      setCartItems(JSON.parse(data))
    }
  }, [])

  const handleRemove = (index: number) => {
    const updated = [...cartItems]
    updated.splice(index, 1)
    setCartItems(updated)
    localStorage.setItem('cart', JSON.stringify(updated))
  }

  const handleQuantityChange = (index: number, value: number) => {
    const updated = [...cartItems]
    updated[index].quantity = value
    setCartItems(updated)
    localStorage.setItem('cart', JSON.stringify(updated))
  }

  const totalPrice = cartItems.reduce((acc, item) => acc + item.quantity * parseFloat(item.price), 0)

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Your Cart</h1>
      <table className={classes.table}>
        <thead className={classes.thead}>
          <tr>
            <th className={classes.th}>PRODUCT</th>
            <th className={classes.th}>QUANTITY</th>
            <th className={classes.th}>PRICE</th>
            <th className={classes.th}>REMOVE</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item, i) => (
            <tr key={i}>
              <td className={classes.td} style={{ display: 'flex', alignItems: 'center' }}>
                <img src={item.image} className={classes.image} alt="product" /> 
                <div style={{ display: 'flex', gap: '10px' }}>
                  <div>
                  {item.title}
                  </div>
                  <div>
                  {item.size}
                  </div>
                  </div>
              </td>
              <td className={classes.td}>
                {item.quantity}
              </td>
              <td className={classes.td}>${(item.price * item.quantity).toFixed(2)}</td>
              <td className={classes.td}>
                <button className={classes.removeBtn} onClick={() => handleRemove(i)}>🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={classes.total}>Total price: ${totalPrice.toFixed(2)}</div>

      <a href="https://mpay.az/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
        <button className={classes.payBtn}>Pay</button>
        </a>
    </div>
  )
}

export default Basket
