import * as db from '../db/queries.mjs';

async function getUserList(req, res, next) {
  try {
    const app_users = await db.getUsers();
    res.render('admin/user-list', {
      title: 'User List',
      user: req.user,
      app_users,
    });
  } catch (error) {
    next(error);
  }
}

async function removeMember(req, res, next) {
  try {
    await db.setMember(req.body.id, false);
    res.status(303).redirect('/admin');
  } catch (error) {
    next(error);
  }
}

async function removeAdmin(req, res, next) {
  try {
    await db.setAdmin(req.body.id, false);
    // If this user is no longer an admin, do not redirect to admin page as they will no longer have access.
    if (req.user.id == req.body.id) {
      res.status(303).redirect('/');
    } else {
      res.status(303).redirect('/admin');
    }
  } catch (error) {
    next(error);
  }
}

async function deleteUser(req, res, next) {
  try {
    await db.deleteUser(req.body.id);
    // If user has deleted themselves, log out and do not redirect to admin page as they will no longer have access.
    if (req.user.id == req.body.id) {
      req.logOut((error) => {
        if (error) throw error;
        res.status(303).redirect('/');
      });
    } else {
      res.status(303).redirect('/admin');
    }
  } catch (error) {
    next(error);
  }
}

export { getUserList, removeMember, removeAdmin, deleteUser };
