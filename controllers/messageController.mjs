import * as db from '../db/queries.mjs';

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
  res.render('message/new-message', { title: 'New Message', user: req.user });
}

async function postNewMessage(req, res, next) {
  try {
    const user_id = req.user.id;
    const { title, text } = req.body;
    await db.addMessage(user_id, title, text);
    res.status(303).redirect('/message');
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
