import Button from 'react-bootstrap/Button';
import { LinkContainer } from 'react-router-bootstrap';

import formatDateString from '../../../utils/formatDateString';

import {
    AiOutlineHistory,
    AiOutlineEdit,
    AiOutlineArrowLeft
} from 'react-icons/ai';

const NavBar = (props) => {
    let content;
    if (!props.revisions) {
        const lastEditDate = formatDateString(props.lastEditDate);

        content = (
            <>
                <p className='small m-0'>
                    Last Edited:{' '}
                    <span className='font-weight-bold'>{lastEditDate}</span>
                </p>
                <div className='ml-auto'>
                    <LinkContainer to={`/wiki/${props.articleSlug}/revisions`}>
                        <Button
                            variant='light'
                            size='sm'
                            className='border mr-1'
                        >
                            <AiOutlineHistory /> Revisions
                        </Button>
                    </LinkContainer>
                    <Button variant='light' size='sm' className='border'>
                        <AiOutlineEdit /> Edit
                    </Button>
                </div>
            </>
        );
    } else {
        content = (
            <LinkContainer exact to={`/wiki/${props.articleSlug}/`}>
                <Button variant='light' size='sm' className='border'>
                    <AiOutlineArrowLeft /> Back
                </Button>
            </LinkContainer>
        );
    }

    return (
        <div className='d-flex align-items-center border-bottom p-2'>
            {content}
        </div>
    );
};

export default NavBar;
