const express = require("express");
const { Block } = require("../utils/block");
const { getBlockByPath, getParentBlockByPath } = require("../utils/helper");

const router = express.Router();
const page = [];


router.post("/api/insert", (req, res) => {
  try {
    const insertedBlock = []
    req.body.forEach((block) => {
      if (!block.path || !block.content)
        return

      const targetBlock = getBlockByPath(page, block.path);

      if (!targetBlock)
        return

      if (targetBlock === page) page.push(new Block(block.content));
      else targetBlock.insert(block.content);
      insertedBlock.push(block)
    });

    res.send(insertedBlock);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/api/delete", (req, res) => {
  try {
    const deletedBlocks = []
    req.body.forEach((block) => {
      if (!block.path)
        return

      const targetBlock = getBlockByPath(page, block.path);
      const parentBlock = getParentBlockByPath(page, block.path);

      if (!parentBlock || !targetBlock)
        return

      targetBlock.delete(parentBlock);
      deletedBlocks.push(block)
    });

    res.send(deletedBlocks);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/api/duplicate/:path", (req, res) => {
  const path = req.params.path;

  try {
    if (!path) {
        res.status(400).send('Missing path parameter')
        return
    }

    const targetBlock = getBlockByPath(page, path);
    const parentBlock = getParentBlockByPath(page, path);

    if (!targetBlock) 
        res.status(404).send('Target block does not exist')
    else if (!parentBlock)
        res.status(400).send('Cannot duplicate the page')
    else {
        targetBlock.duplicate(parentBlock);
        res.send("Duplicated the block successfully");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put("/api/move", (req, res) => {
  try {
    if (!req.body.sourcePath || !req.body.targetPath) {
        res.status(400).send('Missing source path or target path')
        return
    }

    const position = req.body.position ? req.body.position : 0;

    const sourceBlock = getBlockByPath(page, req.body.sourcePath);
    const parentBlock = getParentBlockByPath(page, req.body.sourcePath);
    const targetBlock = getBlockByPath(page, req.body.targetPath);

    if (!sourceBlock || !targetBlock)
        res.status(404).send('Source block or target block does not exist')
    else if (!parentBlock)
        res.status(400).send('Cannot move the page')
    else {
        sourceBlock.move(parentBlock, targetBlock, position);
        res.send("Moved successfully");
    }
  } catch {
    res.status(400).send(error);
  }
});

router.get("/api/export", (req, res) => {
  try {
    res.send(page);
  } catch {
    res.status(400).send(error);
  }
});

module.exports = router;
