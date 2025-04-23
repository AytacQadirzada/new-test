import '../Styles/HeaderAndFooter.css'
import { createUseStyles } from 'react-jss';
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
footer: {
    borderTop: '1px solid #ccc',
    padding: '40px 40% 30px',
    width: '100%',
    marginTop: '30px',
}
});
const Footer = () => {
    const classes = useStyles();
  return (
    <>
    <footer className={classes.footer}>
        <p>© 2023 Doggy Stickers. All rights reserved.</p>
    </footer>
    </>
  )
}

export default Footer