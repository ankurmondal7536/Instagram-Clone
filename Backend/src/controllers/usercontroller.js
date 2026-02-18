const followModel = require("../models/follow.model")
const userModel = require("../models/user.model")

async function followUserController(req, res) {


     const followerUserName = req.user.username
     const followeeUserName = req.params.username
     // check if the user is trying to follow themselves
        if (followerUserName === followeeUserName) {
            return res.status(400).json({
                message: "You cannot follow yourself"
            })
        }

     // check if the followee user exists
     const followeeUser = await userModel.findOne({
        username: followeeUserName
     })
     if (!followeeUser) {
        return res.status(404).json({
            message: `User with username ${followeeUserName} does not exist`
        })
     }

     // check if user is already following the followee
     const alreadyFollowing = await followModel.findOne({
        follower: followerUserName,
        followee: followeeUserName
     })
     if (alreadyFollowing) {
        return res.status(400).json({
            message: `You are already following ${followeeUserName}`,
            follow: alreadyFollowing
        })
     }   
// create a follow record in the database
     const followRecord = await followModel.create({
        follower: followerUserName,
        followee: followeeUserName
     })
        res.status(200).json({
            message: `You are now following ${followeeUserName}`,
            followRecord
        })

}


module.exports = {
    followUserController
}