import * as db from '../db/queries.mjs';
import { validationResult } from 'express-validator';

async function getMessages(req, res, next) {
  try {
    const messages = await db.getMessages();
    res.render('message/message-list', {
      title: 'Messages',
      user: req.user,
      messages,
    });
  } catch (error) {
    next(error);
  }
}

function getNewMessage(req, res, next) {
  const { formData, errors } = req.session;
  res.render('message/new-message', {
    title: 'New Message',
    user: req.user,
    formData,
    errors,
  });
  next();
}

async function postNewMessage(req, res, next) {
  try {
    const result = validationResult(req);
    const user_id = req.user.id;
    const { title, text } = req.body;
    if (result.isEmpty()) {
      await db.addMessage(user_id, title, text);
      res.status(303).redirect('/message');
    } else {
      res.status(400).redirect('/message/new');
    }
  } catch (error) {
    next(error);
  }
}

async function deleteMessage(req, res, next) {
  try {
    await db.deleteMessage(req.body.message_id);
    res.status(303).redirect('/message');
  } catch (error) {
    next(error);
  }
}

export { getMessages, getNewMessage, postNewMessage, deleteMessage };
