const express = require('express')
const router = express.Router()
const RealUser = require('./real-user.model')

//const verifyAdminToken = require('../middleware/verifyAdminToken')
//post a book

router.post("/create-real-user", async (req, res) => {
    try {
        const {email, uid, username} = req.body;
        const realUserFound = await RealUser.findOne({uid})

        if(realUserFound) {
            return res.status(422).json({error: "RealUser already exists"})
        } else {
            const newRealUser = new RealUser({
                uid, email, name: username
            })
            const registerUser = await newRealUser.save()
            res.status(201).json({message: "RealUser registered successfully", newRealUser: newRealUser})
            return 
        }

    } catch (error) {
        console.log(`Could not create real user`)
        console.error(error)
        res.status(500).send({message: "Failed to post new RealUser"})
        return
    }

})

router.get("/", async (req, res) => { 
    try {
        const realUsers = await RealUser.find({}).sort({createdAt: -1});
        res.status(200).json(realUsers)
        return
       
    } catch (error) {
        console.log("Could not fetch all RealUsers")
        console.error(error)
        res.status(500).send({message: "Failed to fetch RealUsers"})
    }
});


router.get("/:uid", async (req, res) => {
    try {
        const {uid} = req.params;
        const realUserFound = await RealUser.findOne({uid})
        if (!realUserFound) {
            res.status(404).send({message: "RealUser Not Found"})
            return
        }

        res.status(200).send(realUserFound)
        return
    } catch (error) {
        console.error("Error fetching RealUser", error);
        res.status(500).send({message: "Failed to fetch RealUser"})
        return
    }
})

router.put("/edit/:uid", async (req, res) => {
    try {
        const {uid} = req.params;

        const updatedRealUser = await RealUser.findOneAndUpdate(
            { uid: uid }, 
            req.body,    
            { new: true } 
        );

        if(!updatedRealUser){
            res.status(404).send({message: "RealUser is not Found!"})
            return
        }

        res.status(200).send({
            message: "RealUser updated successfully",
            realUser: updatedRealUser
        })
        return 
    } catch (error) {
        console.error("Error updating a RealUser", error)
        res.status(500).send({message: "Failed to update the RealUser"})
        return
    }
})

router.delete("/:uid", async (req, res) => {
    try {
        const {uid} = req.params;
        const deletedRealUser = await RealUser.findOneAndDelete({ uid: uid });
        if (!deletedRealUser) {
            res.status(404).send({message: "RealUser is not found"})
            return
        }

        res.status(200).send({
            message: "RealUser deleted successfully",
            realUser: deletedRealUser
        })
        return
    } catch(error){
        console.error("Error deleting the RealUser", error);
        res.status(500).send({message: "Failed to delete the RealUser"})
        return
    }
})

module.exports = router