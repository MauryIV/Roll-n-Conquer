const { inAppNotification } = require("../utils/novu.js");
const Notif = require("../models/notif.js");

exports.moudule = createNotif = async (req, res) => {
    const { description } = req.body
    const newNotif = new Notif({
        description
    });
    try {
        await newNotif.save();
        await inAppNotification(description, "Sumit");
        res.status(201).json(newNotif);
    } catch (error) {
        res.status(409).json({ message: error });
    }
};
