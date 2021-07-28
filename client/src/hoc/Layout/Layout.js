import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';

import classes from './Layout.module.css';

const Layout = (props) => (
    <>
        <Header />
        <div className={classes['content']}>{props.children}</div>
        <Footer />
    </>
);

export default Layout;
