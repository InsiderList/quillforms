/**
 * WordPress dependencies
 */
import { useState, useEffect, memo } from '@wordpress/element';
import { useSelect, useDispatch } from '@wordpress/data';
/**
 * Internal dependencies
 */
import { FieldRenderContextProvider, useFieldRenderContext } from './context';
import FieldWrapper from '../field-wrapper';

export { useFieldRenderContext };

interface Props {
	id: string;
	isActive: boolean;
	shouldBeRendered: boolean;
	isLastField: boolean;
}

const FieldRender: React.FC< Props > = memo(
	( { id, isActive, isLastField, shouldBeRendered } ) => {
		const [ isSubmitBtnVisible, showSubmitBtn ] = useState< boolean >(
			false
		);
		const [ isErrMsgVisible, showErrMsg ] = useState< boolean >( false );

		const { isReviewing, isValid, block } = useSelect( ( select ) => {
			return {
				isReviewing: select( 'quillForms/renderer-core' ).isReviewing(),
				isValid: select( 'quillForms/renderer-core' ).isValidField(
					id
				),
				block: select( 'quillForms/renderer-core' ).getBlockById( id ),
			};
		} );

		useEffect( () => {
			if ( isReviewing && ! isValid ) {
				showErrMsg( true );
			}
		}, [ isReviewing ] );

		const { goNext } = useDispatch( 'quillForms/renderer-core' );
		if ( ! block ) return null;
		const { name, attributes } = block;

		const context = {
			id,
			blockName: name,
			attributes,
			isActive,
			shouldBeRendered,
			isErrMsgVisible,
			showErrMsg,
			isSubmitBtnVisible,
			showSubmitBtn,
			next: goNext,
			isLastField,
		};
		return (
			<FieldRenderContextProvider value={ context }>
				<FieldWrapper />
			</FieldRenderContextProvider>
		);
	}
);

export default FieldRender;
