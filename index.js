import mysql from "mysql2";
import bodyParser from "body-parser"
import express, { query, response } from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

app.use(express.static("public"));//static files
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


const connection = mysql.createConnection({
    host:"localhost",
    user: "root",
    password:"s@#!B1005",
    database:"hotel_management"
});

connection.connect((err)=>{
    if(err){
        console.error("Error Connecting to Server:" + err.stack);
    }
    else{
        console.log('Connected to the Server as Id:' + connection.threadId);
    }
});

app.get("/", (req,res)=>{
    try{
        res.render("hotel.ejs");
    }
    catch(error){
        res.send(error);
    }
});

app.get("/hotel",(req,res)=>{
    try{
        res.render("hotel.ejs");
    }
    catch(error){
        res.send(error);
    }
});

app.get("/book", (req,res)=>{
    try{
        res.render("book.ejs");
    }
    catch(error){
        res.send(error);
    }
});

app.get("/restaurant", (req,res)=>{
    try{
        res.render("restaurant.ejs");
    }
    catch(error){
        res.send(error);
    }
});

app.get("/menu1", (req,res)=>{
    try{
        res.render("menu1.ejs");
    }
    catch(error){
        res.send(error);
    }
});

app.get("/menu", (req,res)=>{
    try{
        res.render("menu.ejs");
    }
    catch(error){
        res.send(error);
    }
});

app.get("/signup", (req,res)=>{
    try{
        res.render("signup.ejs");
    }
    catch(error){
        res.send(error);
    }
});

function generateGuestID() {
    // Generate a random number between 1000 and 9999
    const randomNum = Math.floor(Math.random() * 1000000);

    // Combine timestamp and random number to create a unique ID
    const guestID = `G${randomNum}`;

    return guestID;
}

function generateRoomID() {
    // Generate a random number between 1000 and 9999
    const randomNum = Math.floor(Math.random() * 1000000);

    // Combine timestamp and random number to create a unique ID
    const roomID = `R${randomNum}`;

    return roomID;
}

function generatePaymentID() {
    // Generate a random number between 1000 and 9999
    const randomNum = Math.floor(Math.random() * 1000000);

    // Combine timestamp and random number to create a unique ID
    const paymentID = `P${randomNum}`;

    return paymentID;
}

// Function to insert guest data into the 'guest' table
const inserted = (Guest_id, FirstName, MiddleName, LastName, Email, PhoneNo, Aadhar_no) => {
    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO guest (Guest_id, FirstName, MiddleName, LastName, Email, PhoneNo, Aadhar_no) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [Guest_id, FirstName, MiddleName, LastName, Email, PhoneNo, Aadhar_no],
            (err, results) => {
                if (err) {
                    console.error("Error inserting data into guest table:", err);
                    reject(err);
                } else {
                    console.log("Data inserted into guest table successfully!!");
                    resolve(true);
                }
            });
    });
};

// Function to insert reservation data into the 'reservation' table
const inserted1 = (Room_id, Guest_id, Payment_id, Check_in_date, Check_out_date, room_type) => {
    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO reservation (Room_id, Guest_id, Payment_id, Check_in_date, Check_out_date, room_type) VALUES (?, ?, ?, ?, ?, ?)",
            [Room_id, Guest_id, Payment_id, Check_in_date, Check_out_date, room_type],
            (err, results) => {
                if (err) {
                    console.error("Error inserting data into reservation table:", err);
                    reject(err);
                } else {
                    console.log("Data inserted into reservation table successfully!!");
                    resolve(true);
                }
            });
    });
};

// Function to insert payment data into the 'transaction' table
const inserted2 = (Payment_id, amount, Room_id, Guest_id) => {
    return new Promise((resolve, reject) => {
        connection.query("INSERT INTO transaction (Payment_id, amount, Room_id, Guest_id) VALUES (?, ?, ?, ?)",
            [Payment_id, amount, Room_id, Guest_id],
            (err, results) => {
                if (err) {
                    console.error("Error inserting data into transaction table:", err);
                    reject(err);
                } else {
                    console.log("Data inserted into transaction table successfully!!");
                    resolve(true);
                }
            });
    });
};

// Assuming you already have your required imports and setup

app.post("/submit_booking", (req, res) => {
    try {
        // Extract form data from request body
        const { FirstName, MiddleName, LastName, Aadhar_no, Email, PhoneNo, Check_In_Date, Check_Out_Date, Room_type } = req.body;

        // Calculate the number of days the guest will stay
        const checkInDate = new Date(Check_In_Date);
        const checkOutDate = new Date(Check_Out_Date);
        const numberOfDays = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));

        // Determine the room price based on the room type
        let roomPrice = 0;
        if (Room_type === "3000") {
            roomPrice = 3000;
        } else if (Room_type === "5000") {
            roomPrice = 5000;
        }

        // Calculate the total amount
        const amount = roomPrice * numberOfDays;

        // Generate unique IDs for guest, room, and payment
        const Guest_id = generateGuestID();
        const Room_id = generateRoomID();
        const Payment_id = generatePaymentID();

        // Insert data into 'guest' table
        const guestInsertionResult = inserted(Guest_id, FirstName, MiddleName, LastName, Email, PhoneNo, Aadhar_no);

        // Insert data into 'reservation' table
        const roomInsertionResult = inserted1(Room_id, Guest_id, Payment_id, Check_In_Date, Check_Out_Date, Room_type);

        // Insert data into 'transaction' table
        const paymentInsertionResult = inserted2(Payment_id, amount, Room_id, Guest_id);

        // Check if all insertions were successful
        if (guestInsertionResult && roomInsertionResult && paymentInsertionResult) {
            console.log("Data inserted successfully!!");
            res.redirect("/");
        } else {
            console.log("Data not inserted");
            res.redirect("/book");
        }
    } catch (error) {
        console.error("Error handling form submission:", error);
        res.status(500).send("Internal Server Error");
    }
});


app.listen(port,()=>{
    try{
        console.log(`Listening to port ${port}`);
    }
    catch(error){
        console.log(error);
    }
    
})