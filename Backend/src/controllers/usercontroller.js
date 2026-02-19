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
// check if followee wants to accept or reject the follow request


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

async function unfollowUserController(req, res) {
     const followerUser = req.user.username
     const followeeUser = req.params.username

     const isUserfollowing = await followModel.findOne({
        follower: followerUser,
        followee: followeeUser  
})


        if (!isUserfollowing) {
            return res.status(400).json({
                message: `You are not following ${followeeUser}`
            })
        }
        await followModel.findByIdAndDelete(
            isUserfollowing._id
        )
        res.status(200).json({
            message: `You have unfollowed ${followeeUser}`
        })
}
module.exports = {
    followUserController,
    unfollowUserController
}