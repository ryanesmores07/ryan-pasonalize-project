import Event from "../model/EventModel.js";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";

export const getAllEvents = async (req, res) => {
  const { search, eventStatus, sort } = req.query;

  console.log(req.user);

  const queryObject = {};

  try {
    if (search) {
      queryObject.$or = [{ event: { $regex: search, $options: "i" } }];
    }

    if (eventStatus && eventStatus !== "all") {
      queryObject.eventStatus = eventStatus;
    } else if (!eventStatus) {
      queryObject.eventStatus = "future events";
    }

    const sortOptions = {
      newest: "-dateTime",
      oldest: "dateTime",
    };

    const sortKey = sortOptions[sort] || sortOptions.newest;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 9;
    const skip = (page - 1) * limit;

    const events = await Event.find(queryObject)
      .populate({
        path: "createdBy",
        select: "avatar firstName lastName",
      })
      .sort(sortKey)
      .skip(skip)
      .limit(limit);

    const totalEvents = await Event.countDocuments(queryObject);
    const numOfPages = Math.ceil(totalEvents / limit);

    res.status(StatusCodes.OK).json({
      totalEvents,
      numOfPages,
      currentPage: page,
      events,
    });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      status: "error",
      message: "Could not retrieve events",
    });
  }
};

export const createEvent = async (req, res) => {
  try {
    req.body.createdBy = req.user.userId;
    const event = await Event.create(req.body);

    res.status(StatusCodes.CREATED).json({
      status: "success",
      event,
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      status: "error",
      message: "Could not create event",
    });
  }
};

export const deleteEvent = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: "error",
      message: "Invalid event ID",
    });
  }

  try {
    const event = await Event.findById(id);

    if (!event) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: "error",
        message: "Event not found",
      });
    }

    if (event.createdBy.toString() !== userId) {
      return res.status(StatusCodes.FORBIDDEN).json({
        status: "error",
        message: "You do not have permission to delete this event",
      });
    }

    await Event.findByIdAndDelete(id);

    res.status(StatusCodes.OK).json({
      status: "success",
      message: "Event deleted successfully",
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "Could not delete event",
    });
  }
};

export const updateEvent = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      status: "error",
      message: "Invalid event ID",
    });
  }

  try {
    const event = await Event.findById(id);

    if (!event) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: "error",
        message: "Event not found",
      });
    }

    if (event.createdBy.toString() !== userId) {
      return res.status(StatusCodes.FORBIDDEN).json({
        status: "error",
        message: "You do not have permission to update this event",
      });
    }

    const updatedEvent = await Event.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(StatusCodes.OK).json({
      status: "success",
      event: updatedEvent,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "Could not update event",
    });
  }
};

export const getSingleEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findById(id);
    if (!event) {
      return res.status(StatusCodes.NOT_FOUND).json({
        status: "error",
        message: "Event not found",
      });
    }
    res.status(StatusCodes.OK).json(event);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: "error",
      message: "Could not get event",
    });
  }
};
