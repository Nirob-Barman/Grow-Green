const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const stripe = require('stripe')(process.env.PAYMENT_SECRET_KEY)
const port = process.env.PORT || 5000;

// middleware
const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
};
app.use(cors());
app.use(express.json());


const verifyJWT = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(401).send({ error: true, message: 'unauthorized access' });
    }
    // bearer token
    const token = authorization.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ error: true, message: 'unauthorized access' })
        }
        req.decoded = decoded;
        next();
    })
}



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xceqs5c.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});


async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();


        const usersCollection = client.db("growGreen").collection("users");
        const productsCollection = client.db("growGreen").collection("products");
        const reviewCollection = client.db("growGreen").collection("reviews");
        const bookingProductsCollection = client.db("growGreen").collection("bookings");
        const paymentCollection = client.db("growGreen").collection("payments");







        app.post('/jwt', (req, res) => {
            const user = req.body;
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })

            res.send({ token })
        })







        // user collection
        app.get('/users', async (req, res) => {
            const result = await usersCollection.find().toArray();
            res.send(result);
        })

        // Get user
        app.get("/users/:email", async (req, res) => {
            const email = req.params.email;
            const query = { email: email };
            const result = await usersCollection.findOne(query);
            // console.log(result);
            res.send(result);
        });


        app.patch('/users/:userId', async (req, res) => {
            const userId = req.params.userId;
            const updatedUserData = req.body;

            try {
                // Ensure the ObjectId is created using the 'new' keyword
                const userObjectId = new ObjectId(userId);

                // Exclude the '_id' field from the update data
                delete updatedUserData._id;

                // Update the user's data in the MongoDB collection
                const result = await usersCollection.updateOne(
                    { _id: userObjectId }, // Filter by userObjectId
                    { $set: updatedUserData } // Update with the new data (excluding '_id')
                );

                if (result.modifiedCount === 1) {
                    res.json({ message: 'User data updated successfully' });
                } else {
                    res.status(404).json({ error: 'User not found or no changes were made' });
                }
            } catch (error) {
                console.error('Error updating user:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });


        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;

            try {
                const result = await usersCollection.deleteOne({ _id: new ObjectId(id) });
                if (result.deletedCount === 1) {
                    res.status(200).json({ message: 'User deleted successfully' });
                } else {
                    res.status(404).json({ message: 'User not found' });
                }
            } catch (error) {
                console.error('Error deleting user:', error);
                res.status(500).json({ message: 'Internal server error' });
            }
        });


        app.get('/users/admin/:email', async (req, res) => {
            const email = req.params.email;

            // // token checking
            // if (req.decoded.email !== email) {
            //     res.send({ admin: false })
            // }

            // email in route 
            const query = { email: email }
            const user = await usersCollection.findOne(query);
            const result = { admin: user?.role === 'admin' }
            res.send(result);
        })

        app.get('/users/salesman/:email', async (req, res) => {
            const email = req.params.email;

            // // token checking
            // if (req.decoded.email !== email) {
            //     res.send({ salesman: false })
            // }

            // email in route 
            const query = { email: email }
            const user = await usersCollection.findOne(query);
            const result = { salesman: user?.role === 'salesman' }
            res.send(result);
        });


        app.get('/users/user/:email', async (req, res) => {
            const email = req.params.email;

            // // token checking
            // if (req.decoded.email !== email) {
            //     res.send({ user: false })
            // }

            // email in route 
            const query = { email: email }
            const user = await usersCollection.findOne(query);
            const result = { user: !!user } // Return true if the user exists, false otherwise
            res.send(result);
        });


        // Define the route to handle role updates for users
        app.patch('/users/:id', async (req, res) => {
            try {

                const { id } = req.params;
                const { role } = req.body;

                // Validate the role to prevent unauthorized role changes (optional)
                const validRoles = ['user', 'salesman', 'admin'];
                if (!validRoles.includes(role)) {
                    return res.status(400).json({ error: 'Invalid role' });
                }

                // Assuming usersCollection is a valid MongoDB collection reference
                const updatedUser = await usersCollection.findOneAndUpdate(
                    { _id: new ObjectId(id) },
                    { $set: { role } },
                    { returnOriginal: false } // Return the updated document
                );

                if (!updatedUser.value) {
                    return res.status(404).json({ error: 'User not found' });
                }

                res.json(updatedUser.value);
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });

        app.post('/users', async (req, res) => {
            const user = req.body;
            // console.log('User: ', user);

            const query = { email: user.email }
            const existingUser = await usersCollection.findOne(query);
            console.log('Existing user: ', existingUser);
            // google login
            if (existingUser) {
                return res.send({ message: 'user already exists' })
            }

            const result = await usersCollection.insertOne(user);
            res.send(result);
        })








        // Product collection

        // GET endpoint for retrieving products
        app.get('/products', async (req, res) => {
            try {
                const products = await productsCollection.find().toArray();
                res.send(products);
            }
            catch (error) {
                console.error('Error retrieving products:', error)
                res.status(500).json({ error: 'Internal server error' });
            }
        })

        // GET endpoint for retrieving user products by email
        app.get('/products/salesman', async (req, res) => {
            try {
                // console.log(req.body);
                // console.log(req.query);
                const { email } = req.query;
                // const email = req.query.email;

                // console.log("Server Email: ", email);
                const products = await productsCollection.find({ email: email }).toArray();
                res.json(products);
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal server error' });
            }
        })


        // API endpoint to save product data to MongoDB
        app.post('/products', async (req, res) => {
            try {
                const productData = req.body;

                // Use the provided productsCollection to access the "products" collection
                // const productsCollection = client.db('growGreen').collection('products');

                // Insert the product into the products collection
                await productsCollection.insertOne(productData);

                // Send a success response
                res.status(201).json({ message: 'Product created successfully' });
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Server error' });
            }
        });

        // app.post('/products', async (req, res) => {
        //     try {
        //         const addedProducts = req.body;
        //         const result = await productsCollection.insertOne(addedProducts);
        //         res.send(result);
        //     } catch (error) {
        //         console.error(error);
        //         res.status(500).json({ error: 'Internal server error' });
        //     }
        // })

        // Implement the endpoint to update the products status
        // PATCH endpoint to update the products status
        app.patch('/products/:id', async (req, res) => {
            try {
                const { id } = req.params;
                const { status } = req.body;

                if (!ObjectId.isValid(id)) {
                    return res.status(400).json({ error: 'Invalid products ID' });
                }

                const updatedProducts = await productsCollection.findOneAndUpdate(
                    { _id: new ObjectId(id) },
                    { $set: { status } },
                    { returnOriginal: false }
                );

                if (!updatedProducts.value) {
                    return res.status(404).json({ error: 'products not found' });
                }

                res.json(updatedProducts.value);
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });


        // GET endpoint for retrieving feedback for a specific products
        app.get('/products/:id/feedback', async (req, res) => {
            try {
                const { id } = req.params;

                if (!ObjectId.isValid(id)) {
                    return res.status(400).json({ error: 'Invalid products ID' });
                }

                const productsData = await productsCollection.findOne({ _id: new ObjectId(id) });

                if (!productsData) {
                    return res.status(404).json({ error: 'products not found' });
                }

                const feedback = productsData.feedback || 'No feedback available';
                res.json({ feedback });
            } catch (error) {
                console.error('Error retrieving products feedback:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });


        // POST endpoint to update the products feedback
        app.post('/products/:id/feedback', async (req, res) => {
            try {
                const { id } = req.params;
                const { feedback } = req.body;
                // console.log(feedback);

                if (!ObjectId.isValid(id)) {
                    return res.status(400).json({ error: 'Invalid products ID' });
                }

                const updatedProducts = await productsCollection.findOneAndUpdate(
                    { _id: new ObjectId(id) },
                    { $set: { feedback } },
                    { returnOriginal: false }
                );

                if (!updatedProducts.value) {
                    return res.status(404).json({ error: 'products not found' });
                }

                res.json(updatedProducts.value);
            } catch (error) {
                console.error('Error handling feedback:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });


        // review related apis
        // GET all reviews
        app.get("/reviews", async (req, res) => {
            try {
                const reviews = await reviewCollection.find().toArray();
                res.json(reviews);
            } catch (error) {
                res.status(500).json({ error: "Error fetching reviews" });
            }
        });

        // // POST a new review
        app.post("/reviews", async (req, res) => {
            const { name, details, rating } = req.body;
            if (!name || !details || !rating) {
                return res.status(400).json({ error: "All fields are required" });
            }
            const newReview = { name, details, rating, };
            try {
                const result = await reviewCollection.insertOne(newReview);
                res.json(result.ops[0]);
            } catch (error) {
                res.status(500).json({ error: "Error adding review" });
            }
        });


        // Delete a review

        app.delete('/reviews/:id', async (req, res) => {
            try {
                const { id } = req.params;

                const query = { _id: new ObjectId(id) };

                const result = await reviewCollection.deleteOne(query);

                if (result.deletedCount === 1) {
                    res.json({ message: 'Review deleted successfully' });
                } else {
                    res.status(404).json({ message: 'Review not found' });
                }
            } catch (error) {
                res.status(500).json({ message: 'Error deleting review', error });
            }
        });







        // Booking Products
        // Create a new product
        app.post('/selectedProducts', async (req, res) => {
            try {
                const productData = req.body; // Class data received from the client
                // console.log('selected products' ,productData);
                // Omit the _id field to let MongoDB generate a unique identifier
                // delete productData._id;

                const result = await bookingProductsCollection.insertOne(productData);

                res.send(productData);

            } catch (error) {
                console.error('Error creating Product:', error);
                res.status(500).json({ error: 'Server error' });
            }
        });

        app.get('/selectedProducts/:email', async (req, res) => {
            try {
                const userEmail = req.query.email;

                const email = req.params.email;
                const query = { bookingEmail: email };

                // Fetch the products selected by the user based on their email
                // const selectedProducts = await bookingProductsCollection.find({ email: userEmail }).toArray();
                const selectedProducts = await bookingProductsCollection.find(query).toArray();


                res.status(200).json(selectedProducts);
            } catch (error) {
                console.error('Error fetching selected products:', error);
                res.status(500).json({ error: 'Server error' });
            }
        });

        app.delete('/selectedProducts/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            try {
                const result = await bookingProductsCollection.deleteOne(query);
                res.json({ message: 'Product deleted successfully', result });
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Server error' });
            }
        })







        // create payment intent
        app.post('/create-payment-intent', async (req, res) => {
            const { price } = req.body;
            const amount = parseInt(price * 100);
            const paymentIntent = await stripe.paymentIntents.create({
                amount: amount,
                currency: 'usd',
                payment_method_types: ['card']
            });

            res.send({
                clientSecret: paymentIntent.client_secret
            })
        })










        // payment related api


        app.get('/payments', async (req, res) => {
            try {
                const payments = await paymentCollection.find({}).toArray();
                res.send(payments);
            } catch (error) {
                console.error('Error fetching payments:', error);
                res.status(500).send('Error fetching payments');
            }
        });

        app.post('/payments', async (req, res) => {
            const payment = req.body;
            const insertResult = await paymentCollection.insertOne(payment);

            const query = { _id: { $in: payment.cartItems.map(id => new ObjectId(id)) } }
            const deleteResult = await bookingProductsCollection.deleteMany(query)

            res.send({ insertResult, deleteResult });
        })


        app.get('/admin-stats', async (req, res) => {
            const users = await usersCollection.estimatedDocumentCount();
            const products = await productsCollection.estimatedDocumentCount();
            const orders = await paymentCollection.estimatedDocumentCount();

            // best way to get sum of the price field is to use group and sum operator
            /*
              await paymentCollection.aggregate([
                {
                  $group: {
                    _id: null,
                    total: { $sum: '$price' }
                  }
                }
              ]).toArray()
            */

            const payments = await paymentCollection.find().toArray();
            const revenue = payments.reduce((sum, payment) => sum + payment.price, 0)

            res.send({
                revenue,
                users,
                products,
                orders
            })
        })

        app.get('/order-stats', async (req, res) => {
            try {
                const pipeline = [
                    {
                        $lookup: {
                            from: 'products',
                            localField: 'productItems',
                            foreignField: '_id',
                            as: 'productItemsData'
                        }
                    },
                    {
                        $unwind: '$productItemsData'
                    },
                    {
                        $group: {
                            _id: '$productItemsData.category',
                            count: { $sum: 1 },
                            total: { $sum: '$productItemsData.price' }
                        }
                    },
                    {
                        $project: {
                            category: '$_id',
                            count: 1,
                            total: { $round: ['$total', 2] },
                            _id: 0
                        }
                    }
                ];

                const result = await paymentCollection.aggregate(pipeline).toArray();
                res.send(result);
            }
            catch (error) {
                console.error("Error in /order-stats endpoint:", error);
                res.status(500).send("An error occurred while fetching order statistics.");
            }
        });









        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Grow Green is a rooftop gardening website');
})

app.listen(port, () => {
    console.log(`Grow Green is playing on port ${port}`);
})

