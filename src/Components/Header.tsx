import React, {useState, useEffect} from 'react'
import logo from '../assets/logo.png'
import shop from '../assets/shop.png'
import { createUseStyles } from 'react-jss'
import { useNavigate } from 'react-router-dom'


// Stil hook-u
const useStyles = createUseStyles({
  '@import': "url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=Roboto+Flex:opsz,wght@8..144,100..1000&family=Roboto:ital,wght@0,100..900;1,100..900&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap')",
    
    '@global': {
        
        '*': {
      boxSizing: 'border-box',
      margin: 0,
      padding: 0,
      fontFamily: '"Roboto", sans-serif'

    }},
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 80px 25px',
    borderBottom: '1px solid #ccc',
    color: 'black',
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  title: {
    fontSize: 30,
    paddingTop: 7,
  },
})

const Header = () => {
  const classes = useStyles();
  const navigate = useNavigate()
  const cart = JSON.parse(localStorage.getItem('cart') || '[]');
const cartLength = cart.length;


  return (
    <header className={classes.header}>
      <div  onClick={() => navigate('/')} className={classes.leftSection}>
        <img src={logo} alt="Logo" />
        <h2 className={classes.title}>Doggy Stickers!</h2>
      </div>
      <div style={{display: 'flex'}}>
        <img src={shop} alt="sebet" onClick={() => navigate('/basket')}  />
       {cartLength>0 && (
        <div style={{border: '1px solid yellow', width: '30px',height: '30px',display: 'flex',alignItems: 'center',justifyContent: 'center', borderRadius: '50%', backgroundColor: 'yellow',marginLeft:'-15px'}}>{cartLength}</div>
       ) 

       } 
      </div>
    </header>
  )

}

export default Header
