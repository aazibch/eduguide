import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';

import classes from './Nav.module.css';

const WikiNav = (props) => {
    const navItems = props.titles.map((title, index) => {
        return (
            <LinkContainer
                key={title.id}
                to={
                    props.revisions
                        ? `/wiki/${title.slug}/revisions`
                        : `/wiki/${title.slug}`
                }
                onClick={(event) => {
                    props.navClickHandler(event, title.id);
                }}
            >
                <Nav.Link>{title.title}</Nav.Link>
            </LinkContainer>
        );
    });

    return (
        <Nav
            variant='pills'
            // defaultActiveKey='/'
            className={[
                'flex-column',
                'mx-1',
                'my-2',
                classes['articles-nav']
            ].join(' ')}
        >
            {navItems}
        </Nav>
    );
};

export default WikiNav;
