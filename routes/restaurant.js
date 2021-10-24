import express from "express";
import {
    getAllRestaurants,
    getAllRestaurantsBySearch,
    getNearByRestaurants,
    getAllRestaurantsByOpenHours,
    getRestaurantById,
    saveRestaurant
} from "../controllers/restaurantController.js";

// express router
const router = express.Router();

// Route get All Restaurants
router.get('/', getAllRestaurants);
// Route get All Restaurants that are open at a certain Datetime
router.post('/', getAllRestaurantsBySearch);
// Route get All Restaurants that are open at a certain Datetime
router.get('/open', getAllRestaurantsByOpenHours);
// Route get single Restaurant
router.get('/:id', getRestaurantById);
// Route CREATE Restaurant
router.post('/', saveRestaurant);

// export router
export default router;