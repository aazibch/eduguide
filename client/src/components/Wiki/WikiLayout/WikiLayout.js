import WikiNav from './Nav/Nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import classes from './WikiLayout.module.css';

const WikiLayout = (props) => {
    return (
        <>
            <Row className={classes['wiki-layout--row']} noGutters>
                <Col xs='3' className='border-right'>
                    <WikiNav
                        revisions={props.revisions}
                        navClickHandler={props.navClickHandler}
                        titles={props.articleTitles}
                    />
                </Col>
                <Col>{props.children}</Col>
            </Row>
        </>
    );
};

export default WikiLayout;
