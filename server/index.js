const express = require("express")
const app = express()
const mongoose = require("mongoose")
const UserModel = require("./models/Users")

const cors = require("cors")

app.use(express.json())
app.use(cors())

mongoose.connect()

// Check UserModel
console.log("UserModel:", UserModel)

app.get("/getUsers", (req, res) => {
	// Corrected route path
	UserModel.find({}, (err, result) => {
		if (err) {
			console.error("Error fetching users:", err)
			res.json(err)
		} else {
			console.log("Users fetched successfully:", result)
			res.json(result)
		}
	})
})

app.post("/createUser", async (req, res) => {
	const user = req.body
	const newUser = new UserModel(user)
	await newUser.save()

	res.json(user)
})

app.listen(3002, () => {
	console.log(`Server running`)
})
