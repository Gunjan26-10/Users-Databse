const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
mongoose.connect("mongodb+srv://Admin-Me:gunjan2610@cluster0.7lo9d.mongodb.net/userDB" , {useNewUrlParser: true});
const usersSchema = {
  name: String,
  image: String,
  email: String,
  password: String,
  orders: Number,
  created: String
}
const User = mongoose.model("User" , usersSchema);

app.get('/',function(req , res){
  User.find({}, function(err , foundUsers){
    res.render("list", {newFoundUsers: foundUsers});
 });
});


app.get('/details',function(req , res){
   res.render("details", {});
});


app.get('/insert',function(req , res){
    res.render("insert", {});
});


app.get('/update',function(req , res){
    res.render("update", {});
});


app.get('/delete',function(req , res){
    res.render("delete", {});
});


app.get('/image',function(req , res){
    res.render("image", {});
});

app.post('/insertUser',function(req , res){
   const userName = req.body.newName;
   const userEmail = req.body.newEmail;
   const userPassword = req.body.newPassword;
   const userImage = req.body.newImage;
   const createdAt = req.body.submit;
   const order = req.body.newOrder;
   var insertU = new User ({
     name:  userName,
     image: userImage,
     email: userEmail,
     password: userPassword,
     orders: order,
     created: createdAt,
   })
   User.insertMany(insertU,function(err){
     if(err){
       console.log(err);
     }else{
        res.render("updateSuccess");
     }
   })
})


app.post('/updateUser',function(req , res){
   const userID = req.body.toFindID;
   const userName = req.body.newName;
   const userEmail = req.body.newEmail;
   const userPassword = req.body.newPassword;
   const userImage = req.body.newImage;
   const order = req.body.newOrder;
   User.findOne({_id: mongoose.Types.ObjectId(userID)},function(err, foundUser){
     if(!err){
    if(!foundUser){
      res.redirect("/updateUser");
    }else{
      console.log(userName);
         foundUser.name = userName;
          foundUser.email = userEmail;
           foundUser.image = userImage;
            foundUser.password = userPassword;
             foundUser.orders = order;
             foundUser.save();
      res.render("updateSuccess")
       }
     }
   })
})


app.post('/deleteUser',function(req , res){
   const userID = req.body.userID;
   User.deleteOne({_id: mongoose.Types.ObjectId(userID)}, function(err){
  if(err){
    console.log(err);
  }else{
      res.render("deleteSuccess");
  }
 })
})


app.post('/userDetails', function(req , res){
    const userToFindID = req.body.toFindID;
    console.log(userToFindID);
    User.findOne({_id: mongoose.Types.ObjectId(userToFindID)},function(err, foundUser){
       if(err){
         console.log(err);
       }else{
          res.redirect("/userDetails/"  + foundUser._id );
         }
       })
    })

app.post('/userImage', function(req , res){
  const imageToFindID = req.body.findImageID;
  console.log(req.body.findImageID);
  User.findOne({_id: mongoose.Types.ObjectId(imageToFindID)},function(err, foundImage){
     if(err){
       console.log(err);
     }else{
        res.redirect("/userImage/"  + foundImage._id );
       }
     })
})


app.get('/userImage/:X', function(req , res){
  const imageToFindID = req.params.X;
  User.findOne({_id: mongoose.Types.ObjectId(imageToFindID)},function(err, foundUser){
    if(!err){
   if(!foundUser){
     res.redirect("/userImage");
   }else{
     console.log(foundUser.image);
     res.render("foundImage" , {found: foundUser})
      }
    }
  })
})


app.get('/userDetails/:X', function(req , res){
  const userToFindID = req.params.X;
  User.findOne({_id:  mongoose.Types.ObjectId(userToFindID)},function(err, foundUser){
    if(!err){
   if(!foundUser){
     res.redirect("/userDetails");
   }else{
     console.log(typeof(foundUser._id));
     res.render("foundDetails" , {found: foundUser})
   }
 }





     })
})
let port = process.env.PORT;
if (port === null || port ===""){
  port = 3000;
}
app.listen( port , function() {
  console.log("Server has started");
});
