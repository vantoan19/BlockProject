function cloneBlock(block) {

    const newBlock = new Block(block.content)
    block.subBlocks.forEach(subBlock => {
        newBlock.subBlocks.push(cloneBlock(subBlock));
    });

    return newBlock;
}

function delink(block, parent) {

    if (parent instanceof Block)
        parent.subBlocks = parent.subBlocks.filter(ref => ref !== block)
    else {
        const index = parent.findIndex(ref => ref === block)
        parent.splice(index, 1)
    }

    block.subBlocks.forEach(subBlock => {
        delink(subBlock, block)
    })

}


class Block {

    /** 
    * Constructs a block
    * @summary Constructs a block by the given content
    * @param {String} content - content of the block
    */
    constructor (content) {
        this.content = content
        this.subBlocks = []
    }

    /** 
    * Insert a sub-block
    * @summary Insert a sub-block to the end of the block
    * @param {String} content - content of the sub-block
    */
    insert(content) {
        const subBlock = new Block(content)
        this.subBlocks.push(subBlock)
    }

    /** 
    * Delete 
    * @summary Delete the block
    * @param {Block/Array} - parent of the block, either page (Array) or a block
    */
    delete(parent) {
        delink(this, parent)
    }

    /** 
    * Duplicate
    * @summary Duplicate the block and its sub-block
    * @param {Block/Array} - parent of the block, either page (Array) or a block
    */
    duplicate(parent) {
        const newBlock = cloneBlock(this)
        if (parent instanceof Block) {
            const insertPosition = parent.subBlocks.findIndex(ref => ref === this) + 1
            parent.subBlocks.splice(insertPosition, 0, newBlock)
        }
        else {
            const insertPosition = parent.findIndex(ref => ref === this) + 1
            parent.splice(insertPosition, 0, newBlock)
        }
    }

    /** 
    * Move the block
    * @summary Move the block to the target block at a specific position
    * @param {Block/Array} - parent of the block, either page (Array) or a block
    * @param {Block} targetBlock - Target block
    * @param {Number} position - Position at the target block (the order)
    */
    move(parent, targetBlock, position) {
        if (parent instanceof Block)
            parent.subBlocks = parent.subBlocks.filter(ref => ref !== this)
        else {
            const index = parent.findIndex(ref => ref === this)
            parent.splice(index, 1)
        }

        if (targetBlock instanceof Block)
            targetBlock.subBlocks.splice(position, 0, this)
        else
            targetBlock.splice(position, 0, this)
    }

    /** 
    * Export the block and its sub-blocks to a string
    * @summary Export the block and its sub-blocks to a string
    */
    export() {
        JSON.stringify(this)
    }

}

module.exports = {
    Block,
    cloneBlock
}