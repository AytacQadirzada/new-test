import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { createUseStyles } from 'react-jss'
import { useNavigate } from 'react-router-dom'

const useStyles = createUseStyles({
  '@import': "url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=Roboto+Flex:opsz,wght@8..144,100..1000&family=Roboto:ital,wght@0,100..900;1,100..900&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap')",
    
    '@global': {
        
        '*': {
      boxSizing: 'border-box',
      margin: 0,
      padding: 0,
      color: '#5A20B3',
      fontFamily: '"Roboto", sans-serif'

    }},
  container: {
    padding: '40px',
    display: 'flex',
    justifyContent: 'center',
  },
  mainImage: {
    width: '400px',
    height: '400px',
    objectFit: 'cover',
    marginBottom: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
  },
  scrollContainer: {
    display: 'flex',
    overflowX: 'auto',
    gap: '16px',
    padding: '10px 0',
    maxWidth: '100%',
    width: '400px',
  },
  thumbnail: {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    borderRadius: '8px',
    border: '2px solid transparent',
    transition: 'border 0.3s',
    '&:hover': {
      border: '2px solid #5A20B3',
      cursor: 'pointer',
    },
  },
  detailsContainer: {
    width: '420px',
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
    padding: '24px',
  },
  title: {
    fontSize: '24px',
    marginBottom: '4px',
  },
  price: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#5A20B3',
  },
  labelGroup: {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '14px',
    flex: 1,
  },
  input: {
    padding: '8px',
    fontSize: '14px',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '12px',
    fontSize: '16px',
    backgroundColor: '#5A20B3',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    marginTop: '12px',
    transition: 'background 0.3s',
    '&:hover': {
      backgroundColor: '#3e147a',
    },
  },
  backButton: {
    padding: '12px',
    fontSize: '16px',
    backgroundColor: '#fff',
    color: '#5A20B3',
    border: '1px solid "#5A20B3" ',
    cursor: 'pointer',
    transition: 'background 0.3s',
  },
})

const Product = () => {
  const classes = useStyles()
  const [stickers, setStickers] = useState<any[]>([])
  const [mainImage, setMainImage] = useState<string | null>(null)
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null)
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null)

  const navigate = useNavigate()
  const selectTitle = localStorage.getItem('title')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://doggystickers.vercel.app/_next/data/xyaZmLIU1DsdFtyNNRye4/index.json')
        setStickers(response.data.pageProps.products)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  const matchedSticker = stickers.find(sticker => sticker.node.title === selectTitle)

  useEffect(() => {
    if (matchedSticker && matchedSticker.node.images.edges.length > 0) {
      setMainImage(matchedSticker.node.images.edges[0].node.originalSrc)
    }

    if (matchedSticker && matchedSticker.node.variants.edges.length > 0) {
      const firstVariant = matchedSticker.node.variants.edges[0].node
      setSelectedVariantId(firstVariant.id)
      setSelectedPrice(firstVariant.price)
    }
  }, [matchedSticker])

  useEffect(() => {
    if (matchedSticker && selectedVariantId) {
      const foundVariant = matchedSticker.node.variants.edges.find(
        (variant: any) => variant.node.id === selectedVariantId
      )
      if (foundVariant) {
        setSelectedPrice(foundVariant.node.price)
      }
    }
  }, [selectedVariantId, matchedSticker])
  
  const addToCart = () => {
    const quantityInput = document.querySelector<HTMLInputElement>('input[type="number"]');
    const selectedSize = matchedSticker?.node.variants.edges.find((v: { node: { id: string | null } }) => v.node.id === selectedVariantId);
  
    const newItem = {
      title: matchedSticker?.node.title,
      size: selectedSize?.node.title || '',
      image: mainImage || '',
      price: parseFloat(selectedPrice || '0'),
      quantity: quantityInput ? parseInt(quantityInput.value, 10) : 1,
    };
  
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
  
    const foundIndex = existingCart.findIndex((item: any) =>
      item.title === newItem.title && item.size === newItem.size
    );
  
    if (foundIndex !== -1) {
      existingCart[foundIndex].quantity += newItem.quantity;
    } else {
      existingCart.push(newItem);
    }
  
    localStorage.setItem('cart', JSON.stringify(existingCart));
    alert('Məhsul səbətə əlavə olundu ✅');
  };
  
  
  

  return (
    <div className={classes.container}>
      <div>
      {mainImage && (
        <img
          className={classes.mainImage}
          src={mainImage}
          alt="Main Sticker"
        />
      )}

      <div className={classes.scrollContainer}>
        {matchedSticker?.node.images.edges.map((imageEdge: any, index: number) => (
          <img
            key={index}
            src={imageEdge.node.originalSrc}
            alt="Sticker thumbnail"
            className={classes.thumbnail}
            onClick={() => setMainImage(imageEdge.node.originalSrc)}
          />
        ))}
      </div>
      </div>

      <div className={classes.detailsContainer}>
        <button className={classes.backButton} onClick={() => navigate('/')} >🠔 Back To All Products</button>
        <h2 className={classes.title}>{matchedSticker?.node.title}</h2>
        <p>{matchedSticker?.node.description}</p>

        {selectedPrice && <p className={classes.price}>Price: ${selectedPrice}</p>}

        <div className={classes.labelGroup}>
          <label className={classes.label}>
            Qty.
            <input className={classes.input} type="number" min="1" defaultValue="1" />
          </label>

          <label className={classes.label}>
            Size
            <select
              className={classes.input}
              value={selectedVariantId || ''}
              onChange={(e) => setSelectedVariantId(e.target.value)}
            >
              {matchedSticker?.node.variants.edges.map((variant: any) => (
                <option key={variant.node.id} value={variant.node.id}>
                  {variant.node.title}
                </option>
              ))}
            </select>
          </label>
        </div>

        <button className={classes.button} onClick={() => addToCart()}>Add to Cart</button>
        </div>
    </div>
  )
}

export default Product
