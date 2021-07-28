import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import formatDateString from '../../../../utils/formatDateString';

const RevisionsView = (props) => {
    return (
        <ListGroup className='small mx-1 my-1'>
            {props.revisions.map((rev) => (
                <ListGroup.Item
                    key={rev._id}
                    className='d-flex align-items-center'
                >
                    <span className='mr-3'>
                        Date Approved:{' '}
                        <span className='font-weight-bold'>
                            {formatDateString(rev.date)}
                        </span>
                    </span>
                    <span>
                        User:{' '}
                        <span className='font-weight-bold'>
                            <a href='#'>{rev.author.username}</a>
                        </span>
                    </span>

                    <Button
                        variant='light'
                        size='sm'
                        className='border ml-auto'
                    >
                        View
                    </Button>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};

export default RevisionsView;
