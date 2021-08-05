import { render } from '@wordpress/element';
import '@wordpress/core-data';
import '@wordpress/notices';
import '@quillforms/blocks';
import '@quillforms/form-integrations';
import PageLayout from './layout';
import './style.scss';

const appRoot = document.getElementById( 'qf-admin-root' );
setTimeout( () => {
	render( <PageLayout />, appRoot );
}, 400 );
