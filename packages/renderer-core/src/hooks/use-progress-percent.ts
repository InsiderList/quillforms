/**
 * WordPress Dependencies
 */
import { useSelect } from '@wordpress/data';
import useFlattenedBlocks from './use-flattened-blocks';
import { FormBlocks } from '@quillforms/types/src';

const useProgressPerecent = () => {
    const { answers, walkPath, blockTypes } = useSelect((select) => {
        return {
            walkPath: select('quillForms/renderer-core').getWalkPath(),
            answers: select('quillForms/renderer-core').getAnswers(),
            blockTypes: select('quillForms/blocks').getBlockTypes(),
        };
    });
    const allBlocks: FormBlocks = useFlattenedBlocks(walkPath);
    let totalBlocksLength = 0;
    let answered = 0;
    allBlocks.forEach((field) => {
        totalBlocksLength++;
        // If the block is editable and answered, or if it's a statement block, count it as answered
        if ((blockTypes[field?.name]?.supports.editable && answers[field?.id]?.value) ||
            field?.name === 'statement') { // Assuming 'statement' is the name for statement blocks
            answered++;
        }
    });
    const getPercent = () => {
        const percent = Math.round((answered * 100) / totalBlocksLength);
        if (isNaN(percent)) return 0;
        return percent;
    };

    return getPercent();
};

export default useProgressPerecent;
