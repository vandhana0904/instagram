const express = require("express");

// const {create,update} = require('../model/user');

const router = express.Router();

const Insta = require(`../model/Insta`);

router.post('/' , async(req,res)=>{

    console.log('users route');

    const newInsta = new Insta(req.body);

    try {
         await newInsta.save();
         res.status(201).send(newInsta);
     } catch (err) {
         res.status(500).send();
     }
});
router.get('/:id', async (req, res) => {
    const _id = req.params.id;
	try {
        const Insta = await Insta.findById(_id);
        if (!Insta) {
			return res.status(404).send({ error: 'User not found' });
		}
		res.send(Insta);
	} catch (error) {
		res.status(500).send({ error: 'Internal server error' });
	}
});

router.patch('/:id', async (req, res) => {
	const updates = Object.keys(req.body);
	console.log(updates);
	const allowedUpdates = ['likes', 'username'];
	const isValidOperation = updates.every((update) => {
		return allowedUpdates.includes(update);
	});

	if (!isValidOperation) {
		return res.status(400).send({ error: 'Invalid Operation' });
	}

	try {
		const Insta = await Insta.findById(req.params.id);
		if (!Insta) {
			return res.status(404).send({ error: 'User not found' });
		}
		updates.forEach((update) => {
			Insta[update] = req.body[update];
		});
		await Insta.save();
		res.send(Insta);
	} catch (error) {
		res.status(500).send({ error: 'Internal server error' });
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const Insta = await Insta.findByIdAndDelete(req.params.id);
		if (!Insta) {
			return res.status(404).send({ error: 'User not found' });
		}

		res.send(Insta);
	} catch (error) {
		res.status(500).send({ error: 'Internal server error' });
	}
});

module.exports = router;