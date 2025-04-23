import { useEffect, useState } from 'react'
import axios from 'axios'
import '../Styles/Home.css'
import { createUseStyles } from 'react-jss'
import { useNavigate } from 'react-router-dom'

const useStyles = createUseStyles({
  '@import':
    "url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=Roboto+Flex:opsz,wght@8..144,100..1000&family=Roboto:ital,wght@0,100..900;1,100..900&family=Rubik:ital,wght@0,300..900;1,300..900&display=swap')",

  '@global': {
    '*': {
      boxSizing: 'border-box',
      margin: 0,
      padding: 0,
      color: '#5A20B3',
      fontFamily: '"Roboto", sans-serif',
    },
  },
  product: {
    width: '350px',
    height: '480px',
    boxShadow: '0px 0px 4px 4px rgba(0, 0, 0, 0.1)',
  },
  productImg: {
    width: '90%',
    height: '80%',
    marginLeft: '18.5px',
    objectFit: 'cover',
    '&:hover': {
      transform: 'scale(1.11)',
      transition: 'transform 0.3s ease-in-out',
    },
  },

  products: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '80px',
    marginBottom: '90px',
  },
  productText: {
    borderTop: '1px solid #ccc',
    fontSize: '20px',
    fontWeight: 'bold',
    paddingLeft: '30px',
    paddingTop: '20px',
  },
  h1: {
    textAlign: 'center',
    marginTop: '50px',
    marginBottom: '20px',
  },
  p: {
    textAlign: 'center',
    fontSize: '20px',
    marginBottom: '50px',
  },
  productP: {
    marginLeft: '220px',
    marginTop: '30px',
    border: '1px solid #F3F1FD',
    backgroundColor: '#F3F1FD',
    padding: '5px 12px',
    fontSize: '23px',
  },
  productImgContainer: {
    height: '60%',
    paddingTop: '30px',
  },
  productDescription: {
    fontSize: '15px',
    fontWeight: 'normal',
    marginTop: '10px',
    color: '#A0A0A0',
  },
  productH2: {
    '&:hover': {
      cursor: 'pointer',
    },
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '70vh', // Minimum height for the page
  },
  loadingText: {
    fontSize: '24px',
    color: '#5A20B3',
  },
})

const Home = () => {
  const classes = useStyles()
  interface Product {
    node: any
    id: string
    name: string
    price: number
    image: string
  }

  const navigate = useNavigate()

  const [stickers, setStickers] = useState<Product[]>([])
  const [loading, setLoading] = useState(true) // Loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://doggystickers.vercel.app/_next/data/xyaZmLIU1DsdFtyNNRye4/index.json'
        )
        console.log(response.data.pageProps.products)
        setStickers(response.data.pageProps.products)
        setLoading(false) // Data loaded, stop loading
      } catch (error) {
        console.error('Error fetching data:', error)
        setLoading(false) // If there's an error, stop loading
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className={classes.loadingContainer}>
        <p className={classes.loadingText}>Loading...</p>
      </div>
    )
  }

  return (
    <>
      <h1 className={classes.h1}>Get Doggy Stickers!</h1>
      <p className={classes.p}>Times are tough. Liven up your home with some cute Doggy Stickers. 🐶</p>
      <div className={classes.products}>
        {stickers.map((sticker) => (
          <div key={sticker.id} className={classes.product}>
            <div className={classes.productImgContainer}>
              <img
                className={classes.productImg}
                src={sticker.node.images.edges[0].node.originalSrc}
                alt={sticker.name}
              />
            </div>
            <div className={classes.productText}>
              <h2
                onClick={() => {
                  localStorage.setItem('title', sticker.node.title)
                  navigate('/product')
                }}
                className={classes.productH2}
              >
                {sticker.node.title}
              </h2>
              <h6 className={classes.productDescription}>{sticker.node.description}</h6>
              <p className={classes.productP}>${sticker.node.variants.edges[0].node.price}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Home
